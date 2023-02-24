import { Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getReportInfo } from '../../../api/teacherApi/report'
import { INewInfo, IReportState } from '../../../libs/model'
import Mask from '../../StudentMain/WeekReport/Mask'
import style from './index.module.scss'

export default function TWeekReport () {
  const [reportInfos, setReportInfos] = useState<INewInfo[]>()
  const [report, setReport] = useState<INewInfo>()
  const [isMask, setIsMask] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  // 得到周报信息
  const getReportInfos = async () => {
    const res = await getReportInfo(current, 9)
    if (res?.success) {
      setTotal(res.data.total)
      const newInfos: INewInfo[] = res.data.reports.reduce((pre: INewInfo[], cur) => {
        const temp: INewInfo = {
          key: cur.id,
          name: cur.report_submitter.name,
          startTime: cur.startTime,
          endTime: cur.endTime,
          username: cur.report_submitter.username,
          timeRange: `${dayjs(cur.startTime).format('YYYY-MM-DD')} --- ${dayjs(cur.endTime).format('YYYY-MM-DD')}`,
          createTime: dayjs(cur.createdTime).format('YYYY-MM-DD'),
          status: cur.reportState,
          text: cur.text
        }
        pre.push(temp)
        return pre
      }, [])
      setReportInfos(newInfos)
    }
  }

  const returnState = (state: IReportState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>未查看</Tag>
      case 0:
        return <Tag color='blue'>未回复</Tag>
      case 1:
        return <Tag color='gray'>已回复</Tag>
    }
  }

  // 表格分页属性
  const paginationProps = {
    pageSize: 9,
    current,
    total,
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
    }
  }

  useEffect(() => {
    getReportInfos()
  }, [current])
  return (
    <div>
      <Table
        dataSource={reportInfos}
        pagination={paginationProps}
      >
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="学号" dataIndex="username" key="username" />
        <Column title="周报时间范围" dataIndex="timeRange" key="timeRange" />
        <Column title="提交时间" dataIndex="createTime" key="createTime" />
        <Column
          title="状态"
          dataIndex="status"
          key="status"
          render={(value: IReportState, _: any) => returnState(value)}
        />
        <Column
          title="操作"
          dataIndex="action"
          key="action"
          render={(_: any, record: INewInfo) => <>
          <a className={style.review} onClick={() => { setReport(record); setIsMask(true) }}>查看周报</a>
          <a>评论</a>
          </>}
        />
      </Table>
      {
        isMask && report
          ? <Mask
            close={() => setIsMask(false)}
            time={[report.startTime, report.endTime]}
            report={report.text}
          ></Mask>
          : ''
      }
    </div>
  )
}
