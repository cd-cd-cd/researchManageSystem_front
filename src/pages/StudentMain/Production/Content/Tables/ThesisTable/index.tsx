import { Button, Descriptions, message, Modal, Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { cancelThesis } from '../../../../../../api/studentApi/production'
import { disciplineOneOption, publicationNameOption } from '../../../../../../libs/data'
import { IThesis, IThesisState } from '../../../../../../libs/model'

interface Props {
  getThesisInfo: () => void
  thesisData: IThesis[] | undefined
}
export default function ThesisTable ({ getThesisInfo, thesisData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<IThesis>()

  const showModal = (record: IThesis) => {
    setInfoItem(record)
    setIsModalOpen(true)
  }

  const renderPatentState = (state: IThesisState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>审核中</Tag>
      case 1:
        return <Tag color='red'>被驳回</Tag>
      case 0:
        return <Tag color='blue'>通过</Tag>
    }
  }

  const renderPublicationName = () => {
    if (infoItem) {
      const index = publicationNameOption.findIndex(item => item.value === infoItem?.publicationName)
      return publicationNameOption[index].label
    }
  }

  const renderDisciplineOne = () => {
    if (infoItem) {
      const index = disciplineOneOption.findIndex(item => item.value === infoItem?.discipline_one)
      return disciplineOneOption[index].label
    }
  }

  const cancel = async (id: string) => {
    const res = await cancelThesis(id)
    if (res?.success) {
      message.success('取消成功!')
      getThesisInfo()
    }
  }
  return (
    <>
    <Table
      dataSource={thesisData}
    >
      <Column title="论文题目" dataIndex="title" key="title" />
      <Column
        title='详情'
        key='more'
        render={(_: any, record: IThesis) => <a onClick={() => showModal(record)}>点击查看</a>}
      ></Column>
      <Column
        title='状态'
        dataIndex="thesisState"
        key="thesisState"
        render={(value: IThesisState) => renderPatentState(value)}
      ></Column>
      <Column
        title='提交时间'
        dataIndex='createdTime'
        key='createdTime'
        render={(value: Date) => dayjs(value).format('YYYY-MM-DD')}
      ></Column>
      <Column
        title='操作'
        key="action"
        render={(_: any, record: IThesis) =>
          <Button
            danger
            size='small'
            disabled={record.thesisState === 0}
            onClick={() => cancel(record.id)}
          >取消申请</Button>}
      ></Column>
    </Table>
    <Modal width={900} footer={null} title='论文信息' open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
      <Descriptions title={infoItem?.title}>
        <Descriptions.Item label='论文题目'>{infoItem?.title}</Descriptions.Item>
        <Descriptions.Item label="第一作者" span={2}>{infoItem?.firstAuthor}</Descriptions.Item>
        <Descriptions.Item label="发表时间">{dayjs(infoItem?.publishDate).format('YYYY-MM-DD')}</Descriptions.Item>
        <Descriptions.Item label="发表刊物" span={2}>{renderPublicationName()}</Descriptions.Item>
        <Descriptions.Item label="学校署名">{infoItem?.signature}</Descriptions.Item>
        <Descriptions.Item label="一级学科" span={2}>{renderDisciplineOne()}</Descriptions.Item>
      </Descriptions>
    </Modal>
  </>
  )
}
