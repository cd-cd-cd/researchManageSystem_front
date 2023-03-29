import { Button, Descriptions, message, Modal, Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { cancelPatent } from '../../../../../../api/studentApi/production'
import { principalClassificationNumberOption } from '../../../../../../libs/data'
import { IPatent, IPatentState } from '../../../../../../libs/model'
interface Props {
  patentData: IPatent[] | undefined
  getPatentInfo: () => {}
}
export default function PatentTable ({ patentData, getPatentInfo }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<IPatent>()
  const renderPatentState = (state: IPatentState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>审核中</Tag>
      case 1:
        return <Tag color='red'>被驳回</Tag>
      case 0:
        return <Tag color='blue'>通过</Tag>
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const showModal = (record: IPatent) => {
    setInfoItem(record)
    setIsModalOpen(true)
  }

  const renderPrincipalClassificationNumberOption = () => {
    if (infoItem) {
      const index = principalClassificationNumberOption.findIndex(item => item.value === infoItem?.principalClassificationNumber)
      return principalClassificationNumberOption[index].label
    }
  }

  const cancel = async (id: string) => {
    const res = await cancelPatent(id)
    if (res?.success) {
      message.success('取消成功!')
      getPatentInfo()
    }
  }

  return (
    <><Table
      dataSource={patentData}
    >
      <Column title="专利名称" dataIndex="name" key="name" />
      <Column
        title='详情'
        render={(_: any, record: IPatent) => <a onClick={() => showModal(record)}>点击查看</a>}
      ></Column>
      <Column
        title='状态'
        dataIndex="patentState"
        key="patentState"
        render={(value: IPatentState) => renderPatentState(value)}
      ></Column>
      <Column
        title='提交时间'
        dataIndex='createdTime'
        key='createdTime'
        render={(value: Date) => dayjs(value).format('YYYY-MM-DD')}
      ></Column>
      <Column
        title='操作'
        render={(_: any, record: IPatent) =>
          <Button
            danger
            size='small'
            disabled={record.patentState === 0}
            onClick={() => cancel(record.id)}
          >取消申请</Button>}
      ></Column>
    </Table>
      <Modal width={900} footer={null} title='专利信息' open={isModalOpen} onCancel={handleCancel}>
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
