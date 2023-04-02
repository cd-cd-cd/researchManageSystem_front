import { Button, Descriptions, message, Modal, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { cancelCopyRight } from '../../../../../../api/studentApi/production'
import { copyRightType } from '../../../../../../libs/data'
import { ICopyRight, IProductionState } from '../../../../../../libs/model'
import RenderState from '../../../../../../components/RenderState'

interface Props {
  getCopyRightInfo: () => void
  copyRightData: ICopyRight[] | undefined
}
export default function CopyRight ({ getCopyRightInfo, copyRightData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<ICopyRight>()

  const showModal = (record: ICopyRight) => {
    setInfoItem(record)
    setIsModalOpen(true)
  }

  const cancel = async (id: string) => {
    const res = await cancelCopyRight(id)
    if (res?.success) {
      message.success('取消成功!')
      getCopyRightInfo()
    }
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
      dataSource={copyRightData}
    >
      <Column title="作品名称" dataIndex="name" key="name" />
      <Column
        title='详情'
        render={(_: any, record: ICopyRight) => <a onClick={() => showModal(record)}>点击查看</a>}
      ></Column>
      <Column
        title='状态'
        dataIndex="copyRightState"
        key="copyRightState"
        render={(value: IProductionState) => <RenderState state={value}></RenderState>}
      ></Column>
      <Column
        title='提交时间'
        dataIndex='createdTime'
        key='createdTime'
        render={(value: Date) => dayjs(value).format('YYYY-MM-DD')}
      ></Column>
      <Column
        title='操作'
        render={(_: any, record: ICopyRight) =>
          <Button
            danger
            size='small'
            disabled={record.copyRightState === 0}
            onClick={() => cancel(record.id)}
          >取消申请</Button>}
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
