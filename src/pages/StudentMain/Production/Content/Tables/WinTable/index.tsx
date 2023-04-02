import { Button, Descriptions, message, Modal, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { cancelWin } from '../../../../../../api/studentApi/production'
import { awardGradeOption, awardLevelOption } from '../../../../../../libs/data'
import { IProductionState, IWin } from '../../../../../../libs/model'
import RenderState from '../../../../../../components/RenderState'

interface Props {
  getWinInfo: () => void
  winData: IWin[] | undefined
}
export default function WinTable ({ getWinInfo, winData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<IWin>()

  const showModal = (record: IWin) => {
    setInfoItem(record)
    setIsModalOpen(true)
  }

  const cancel = async (id: string) => {
    const res = await cancelWin(id)
    if (res?.success) {
      message.success('取消成功!')
      getWinInfo()
    }
  }

  const renderAwardGradeOption = () => {
    if (infoItem) {
      const index = awardGradeOption.findIndex(item => item.value === infoItem?.awardGrade)
      return awardGradeOption[index].label
    }
  }

  const renderAwardLevelOption = () => {
    if (infoItem) {
      const index = awardLevelOption.findIndex(item => item.value === infoItem?.awardLevel)
      return awardLevelOption[index].label
    }
  }

  return (
    <>
    <Table
      dataSource={winData}
    >
      <Column title="获奖名称" dataIndex="name" key="name" />
      <Column
        title='详情'
        render={(_: any, record: IWin) => <a onClick={() => showModal(record)}>点击查看</a>}
      ></Column>
      <Column
        title='状态'
        dataIndex="winState"
        key="winState"
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
        render={(_: any, record: IWin) =>
          <Button
            danger
            size='small'
            disabled={record.winState === 0}
            onClick={() => cancel(record.id)}
          >取消申请</Button>}
      ></Column>
    </Table>
    <Modal width={900} footer={null} title='获奖信息' open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
      <Descriptions title={infoItem?.name}>
        <Descriptions.Item label='获奖名称'>{infoItem?.name}</Descriptions.Item>
        <Descriptions.Item label="获奖等级" span={2}>{renderAwardGradeOption()}</Descriptions.Item>
        <Descriptions.Item label="获奖级别">{renderAwardLevelOption()}</Descriptions.Item>
        <Descriptions.Item label="获奖时间">{dayjs(infoItem?.awardTime).format('YYYY-MM-DD')}</Descriptions.Item>
        <Descriptions.Item label="大赛组委会">{infoItem?.organizingCommittee}</Descriptions.Item>
      </Descriptions>
    </Modal>
  </>
  )
}
