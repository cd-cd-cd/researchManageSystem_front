import { Button, Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getReportInfo, reviewReport } from '../../../api/teacherApi/report'
import useFile from '../../../hooks/useFile'
import { INewInfo, IReportState } from '../../../libs/model'
import Mask from '../../StudentMain/WeekReport/Mask'
import style from './index.module.scss'

export default function TWeekReport () {
  const { decode } = useFile()
  const [reportInfos, setReportInfos] = useState<INewInfo[]>()
  const [report, setReport] = useState<INewInfo>()
  const [isMask, setIsMask] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [isReview, setIsReview] = useState(false)
  const [loading, setLoading] = useState(true)
  // 得到周报信息 // 刷新
  const getReportInfos = async () => {
    setLoading(true)
    const res = await getReportInfo(current, 9, isReview)
    if (res?.success) {
      setTotal(res.data.total)
      const newInfos: INewInfo[] = res.data.reports.reduce((pre: INewInfo[], cur) => {
        const temp: INewInfo = {
          key: cur.id,
          name: cur.report_submitter.name,
          userId: cur.report_submitter.trueId,
          username: cur.report_submitter.username,
          timeRange: cur.time,
          createTime: dayjs(cur.createdTime).format('YYYY-MM-DD'),
          status: cur.reportState,
          text: cur.text,
          pdf: cur.pdf
        }
        pre.push(temp)
        return pre
      }, [])
      setLoading(false)
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

  // 查看周报
  const viewReportAction = async (id: string, record: INewInfo) => {
    setReport(record)
    setIsMask(true)
    if (record.status === -1) {
      const res = await reviewReport(id)
      if (res?.success) {
        getReportInfos()
      }
    }
  }

  useEffect(() => {
    getReportInfos()
  }, [current, isReview])
  return (
    <div>
      <Button
        className={style.btn_top}
        onClick={() => { setIsReview(!isReview); setCurrent(1) }}
        type={isReview ? 'primary' : 'default'}
      >
        {
          isReview ? '全部' : '未查看'
        }
      </Button>
      <Table
        loading={loading}
        className={style.height}
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
            <a className={style.review} onClick={() => viewReportAction(record.key, record)}>查看周报</a>
          </>}
        />
        <Column
          title="导出pdf"
          dataIndex="pdf"
          key="pdf"
          render={(value: string) => <a href={value}>
            {value ? decode(value, 'http://seach-chendian.oss-cn-hangzhou.aliyuncs.com/report/') : ''}
          </a>}
        ></Column>
      </Table>
      {
        isMask && report
          ? <Mask
            isCommentComponent={true}
            close={() => setIsMask(false)}
            time={report.timeRange}
            reportId={report.key}
            reportUserId={report.userId}
            report={report.text}
            getReportInfos={getReportInfos}
          ></Mask>
          : ''
      }
    </div>
  )
}
