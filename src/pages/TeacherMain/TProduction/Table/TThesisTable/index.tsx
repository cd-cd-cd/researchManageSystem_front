import React, { useState } from 'react'
import { IProductionState, ITThesis } from '../../../../../libs/model'
import { Button, Descriptions, Modal, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import TRenderState from '../../../../../components/TRenderState'
import { disciplineOneOption, publicationNameOption } from '../../../../../libs/data'
import style from '../index.module.scss'
import useProduction from '../../../../../hooks/useProduction'

interface Props {
  source: ITThesis[] | undefined
  loading: boolean
  getTableInfo: () => {}
}
export default function THesisTable ({ source, loading, getTableInfo }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoItem, setInfoItem] = useState<ITThesis>()
  const { passClick, returnClick } = useProduction()

  const showModal = (record: ITThesis) => {
    setInfoItem(record)
    setIsModalOpen(true)
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
  return (
    <>
      <Table
        loading={loading}
        pagination={false}
        dataSource={source}
      >
        <Column title="论文题目" dataIndex="title" key="title" />
        <Column
          title='提交人'
          render={(_: any, record: ITThesis) => <div>{record.applyThesisUser ? record.applyThesisUser.name : ''}</div>}
        ></Column>
        <Column
          title='详情'
          key='more'
          render={(_: any, record: ITThesis) => <a onClick={() => showModal(record)}>点击查看</a>}
        ></Column>
        <Column
          title='状态'
          dataIndex="thesisState"
          key="thesisState"
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
          key="action"
          render={(_: any, record: ITThesis) =>
            record.thesisState === -1
              ? <div className={style.btns}>
                <Button size='small' onClick={() => passClick('thesis', record.id, getTableInfo)}>通过</Button>
                <Button size='small' onClick={() => returnClick('thesis', record.id, getTableInfo)}>驳回</Button>
              </div>
              : ''}
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
