import React, { useState } from 'react'
import { IProductionState, ITCopyright } from '../../../../../libs/model'
import { Button, Descriptions, Modal, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import { copyRightType } from '../../../../../libs/data'
import TRenderState from '../../../../../components/TRenderState'
import style from '../index.module.scss'
import useProduction from '../../../../../hooks/useProduction'

interface Props {
  source: ITCopyright[] | undefined
  loading: boolean
  getTableInfo: () => {}
}
export default function TCopyRightTable ({ source, loading, getTableInfo }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<ITCopyright>()
  const { passClick, returnClick } = useProduction()

  const showModal = (record: ITCopyright) => {
    setInfoItem(record)
    setIsModalOpen(true)
  }

  const renderCopyRightType = () => {
    if (infoItem) {
      const index = copyRightType.findIndex(item => item.value === infoItem?.category)
      return copyRightType[index].label
    }
  }
  return (
    <>
      <Table
        dataSource={source}
        pagination={false}
        loading={loading}
      >
        <Column title="作品名称" dataIndex="name" key="name" />
        <Column
          title='提交人'
          render={(_: any, record: ITCopyright) => <div>{record.applyCopyRightUser ? record.applyCopyRightUser.name : ''}</div>}
        ></Column>
        <Column
          title='详情'
          render={(_: any, record: ITCopyright) => <a onClick={() => showModal(record)}>点击查看</a>}
        ></Column>
        <Column
          title='状态'
          dataIndex="copyRightState"
          key="copyRightState"
          render={(value: IProductionState) => <TRenderState state={value}></TRenderState>}
        ></Column>
        <Column
          title='提交时间'
          dataIndex='createdTime'
          key='createdTime'
          render={(value: Date) => dayjs(value).format('YYYY-MM-DD')}
        ></Column>
        <Column
          width={140}
          title='操作'
          render={(_: any, record: ITCopyright) =>
            record.copyRightState === -1
              ? <div className={style.btns}>
                <Button size='small' onClick={() => passClick('copyright', record.id, getTableInfo)}>通过</Button>
                <Button size='small' onClick={() => returnClick('copyright', record.id, getTableInfo)}>驳回</Button>
              </div>
              : ''}
        ></Column>
      </Table>
      <Modal width={900} footer={null} title='著作权信息' open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <Descriptions title={infoItem?.name}>
          <Descriptions.Item label='登记号'>{infoItem?.registerNumber}</Descriptions.Item>
          <Descriptions.Item label="作品名称" span={2}>{infoItem?.name}</Descriptions.Item>
          <Descriptions.Item label="著作权人">{infoItem?.copyrightOwner}</Descriptions.Item>
          <Descriptions.Item label="作品类别" span={2}>{renderCopyRightType()}</Descriptions.Item>
          <Descriptions.Item label="创作完成日期">{dayjs(infoItem?.creationCompletionDate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="首次发表日期">{dayjs(infoItem?.firstPublicationDate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="登记日期">{dayjs(infoItem?.recordDate).format('YYYY-MM-DD')}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}
