import { Button, Popconfirm, Table, Tag, message } from 'antd'
import Column from 'antd/lib/table/Column'
import React, { useEffect, useState } from 'react'
import { IGeTInfo, getInfo, pass, fail, over } from '../../../api/teacherApi/project'
import { IProgress, IProjectState, IUser } from '../../../libs/model'
import dayjs from 'dayjs'
import style from './index.module.scss'
import ProjectShow from '../../../components/ProjectSHow'
import { IResGeTInfo, getHistoryInfo } from '../../../api/studentApi/project'

export default function TProject () {
  const [isProgress, setIsProgress] = useState(false)
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [infoList, setInfoList] = useState<IGeTInfo[]>([])
  const [total, setTotal] = useState<number>(0)
  const [singleInfo, setSingleInfo] = useState<IResGeTInfo>()
  const [progressInfo, setProgressInfo] = useState<IProgress[]>()
  const [isAll, setIsAll] = useState(true)

  const getHistoryInfoClick = async (id: string) => {
    const res = await getHistoryInfo(id)
    if (res?.success) {
      setProgressInfo(res.data)
    }
  }

  const getInfoClick = async () => {
    setLoading(true)
    const res = await getInfo(current, 8, isAll)
    if (res?.success) {
      setInfoList(res.data.res)
      setTotal(res.data.total)
      setLoading(false)
    }
  }

  const paginationProps = {
    pageSize: 8,
    current,
    total,
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
    }
  }

  useEffect(() => {
    getInfoClick()
  }, [isAll])

  const renderState = (state: IProjectState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>未审核</Tag>
      case 1:
        return <Tag color='red'>已驳回</Tag>
      case 0:
        return <Tag color='blue'>通过</Tag>
      case 2:
        return <Tag color='yellow'>已结项</Tag>
    }
  }

  const passClick = async (id: string) => {
    const res = await pass(id)
    if (res?.success) {
      getInfoClick()
      message.success(res.msg)
    }
  }

  const failClick = async (id: string) => {
    const res = await fail(id)
    if (res?.success) {
      getInfoClick()
      message.success(res.msg)
    }
  }

  const confirm = async (id: string) => {
    const res = await over(id)
    if (res?.success) {
      getInfoClick()
      message.success(res.msg)
    }
  }
  return (
    <div>
      {
        isAll
          ? <Button className={style.btn} onClick={() => setIsAll(false)}>未审核</Button>
          : <Button className={style.btn} onClick={() => setIsAll(true)}>全部</Button>
      }
      <Table
        loading={loading}
        pagination={paginationProps}
        dataSource={infoList}
      >
        <Column title="项目名称" dataIndex="title" key="title" />
        <Column title="项目负责人" dataIndex='manager' key='manager' render={(value: IUser, _: any) => <span>{value.name}</span>} />
        <Column title="指导老师" dataIndex='teacherManager' key='teacherManager' render={(value: IUser, _: any) => <span>{value.name}</span>} />
        <Column title='项目成员' dataIndex='teammate' key='teammate' render={(value: IUser[], _: any) => value.map(item => <div key={item.id}>{item.name}</div>)}></Column>
        <Column title="项目状态" dataIndex='projectState' key='projectState' render={(value: IProjectState, _: any) => renderState(value)} />
        <Column title="开始时间" dataIndex='startTime' key='startTime' render={(value: Date, _: any) => dayjs(value).format('YYYY-MM-DD')} />
        <Column title="截止时间" dataIndex='endTime' key='endTime' render={(value: Date, _: any) => dayjs(value).format('YYYY-MM-DD')} />
        <Column
          title='操作'
          render={(_: any, record: IGeTInfo) =>
            record.projectState === -1
              ? <div className={style.btn_box}>
                <Button size='small' onClick={() => passClick(record.id)}>通过</Button>
                <Button size='small' onClick={() => failClick(record.id)}>驳回</Button>
              </div>
              : (record.projectState === 0
                  ? <div className={style.a_box}>
                  <a onClick={() => { getHistoryInfoClick(record.id); setSingleInfo(record); setIsProgress(true) }}>查看进度</a>
                  <Popconfirm
                    title="确定截止该项目？"
                    onConfirm={() => confirm(record.id)}
                  ><a>结项</a>
                  </Popconfirm>
                </div>
                  : '')
          }></Column >
      </Table >
      {
        isProgress
          ? <ProjectShow setIsProgress={setIsProgress} singleInfo={singleInfo} progressInfo={progressInfo}></ProjectShow>
          : ''
      }
    </div >
  )
}
