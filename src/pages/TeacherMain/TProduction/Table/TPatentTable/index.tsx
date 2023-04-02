import { Button, Descriptions, Modal, Table, message } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { principalClassificationNumberOption } from '../../../../../libs/data'
import { IProductionState, ITPatent } from '../../../../../libs/model'
import TRenderState from '../../../../../components/TRenderState'
import style from '../index.module.scss'
import useProduction from '../../../../../hooks/useProduction'
interface Props {
  source: ITPatent[] | undefined
  loading: boolean
  getTableInfo: () => {}
}
export default function TPatentTable ({ source, loading, getTableInfo }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<ITPatent>()
  const { passClick, returnClick } = useProduction()

  const showModal = (record: ITPatent) => {
    setInfoItem(record)
    setIsModalOpen(true)
  }

  const renderPrincipalClassificationNumberOption = () => {
    if (infoItem) {
      const index = principalClassificationNumberOption.findIndex(item => item.value === infoItem?.principalClassificationNumber)
      return principalClassificationNumberOption[index].label
    }
  }
  return (
    <>
      <Table
        dataSource={source}
        pagination={false}
        loading={loading}
      >
        <Column title="专利名称" dataIndex="name" key="name" />
        <Column
          title='提交人'
          render={(_: any, record: ITPatent) => <div>{record.applyPatentUser ? record.applyPatentUser.name : ''}</div>}
        ></Column>
        <Column
          title='详情'
          render={(_: any, record: ITPatent) => <a onClick={() => showModal(record)}>点击查看</a>}
        ></Column>
        <Column
          title='状态'
          dataIndex="patentState"
          key="patentState"
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
          render={(_: any, record: ITPatent) =>
            record.patentState === -1
              ? <div className={style.btns}>
                <Button size='small' onClick={() => passClick('patent', record.id, getTableInfo)}>通过</Button>
                <Button size='small' onClick={() => returnClick('patent', record.id, getTableInfo)}>驳回</Button>
              </div>
              : ''}
        ></Column>
      </Table>
      <Modal width={900} footer={null} title='专利信息' open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <Descriptions title={infoItem?.name}>
          <Descriptions.Item label='申请（专利）号'>{infoItem?.applicationNumber}</Descriptions.Item>
          <Descriptions.Item label="申请日" span={2}>{dayjs(infoItem?.applicationDate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="公开（公告）号">{infoItem?.publicationNumber}</Descriptions.Item>
          <Descriptions.Item label="公开（公告）日" span={2}>{dayjs(infoItem?.openDay).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="主分类号">{renderPrincipalClassificationNumberOption()}</Descriptions.Item>
          <Descriptions.Item label="申请（专利权）人" span={2}>{infoItem?.patentRight}</Descriptions.Item>
          <Descriptions.Item label="发明（设计）人" span={3}>{infoItem?.inventor}</Descriptions.Item>
          <Descriptions.Item label="摘要">{infoItem?.digest}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}
