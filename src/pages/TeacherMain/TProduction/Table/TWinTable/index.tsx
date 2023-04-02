import React, { useState } from 'react'
import { IProductionState, ITWin } from '../../../../../libs/model'
import { Button, Descriptions, Modal, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { awardGradeOption, awardLevelOption } from '../../../../../libs/data'
import dayjs from 'dayjs'
import style from '../index.module.scss'
import TRenderState from '../../../../../components/TRenderState'
import useProduction from '../../../../../hooks/useProduction'

interface Props {
  source: ITWin[] | undefined
  loading: boolean
  getTableInfo: () => {}
}
export default function TWinTable ({ source, loading, getTableInfo }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<ITWin>()
  const { passClick, returnClick } = useProduction()

  const showModal = (record: ITWin) => {
    setInfoItem(record)
    setIsModalOpen(true)
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
        pagination={false}
        loading={loading}
        dataSource={source}
      >
        <Column title="获奖名称" dataIndex="name" key="name" />
        <Column
          title='提交人'
          render={(_: any, record: ITWin) => <div>{record.applyWinUser ? record.applyWinUser.name : ''}</div>}
        ></Column>
        <Column
          title='详情'
          render={(_: any, record: ITWin) => <a onClick={() => showModal(record)}>点击查看</a>}
        ></Column>
        <Column
          title='状态'
          dataIndex="winState"
          key="winState"
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
          render={(_: any, record: ITWin) =>
            record.winState === -1
              ? <div className={style.btns}>
                <Button size='small' onClick={() => passClick('winning', record.id, getTableInfo)}>通过</Button>
                <Button size='small' onClick={() => returnClick('winning', record.id, getTableInfo)}>驳回</Button>
              </div>
              : ''}
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
