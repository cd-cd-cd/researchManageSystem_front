import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getStuInfo } from '../../../../api/managerApi/info'
interface ITabel {
  key: string
  name: string
  username: string
  phoneNumber: number
  resume: string
  email: string
  teacher: string
  createdTime: string
}
interface Props {
  isStu: boolean
}
export default function StudentTable ({ isStu }: Props) {
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState<number>(0)
  const [infoList, setInfoList] = useState<ITabel[]>([])
  const [current, setCurrent] = useState(1)

  const getInfo = async () => {
    const res = await getStuInfo(current, 8)
    if (res?.success) {
      setLoading(true)
      setTotal(res.data.total)
      setInfoList(res.data.infos.reduce((pre: ITabel[], cur) => {
        pre.push({
          key: cur.id,
          name: cur.name,
          username: cur.username,
          phoneNumber: cur.phoneNumber,
          resume: cur.resume,
          email: cur.email,
          createdTime: dayjs(cur.createdTime).format('YYYY-MM-DD'),
          teacher: cur.teacher.name
        })
        return pre
      }, []))
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
    getInfo()
  }, [current, isStu])
  return (
    <div>
      <Table
        loading={loading}
        dataSource={infoList}
        pagination={paginationProps}
      >
        <Column title='姓名' dataIndex="name" key="name"></Column>
        <Column title='学号' dataIndex="username" key="username"></Column>
        <Column title='导师' dataIndex="teacher" key="teacher"></Column>
        <Column title='创建时间' dataIndex="createdTime" key="createdTime"></Column>
        <Column title='手机号' dataIndex="phoneNumber" key="phoneNumber"></Column>
        <Column title='邮箱' dataIndex="email" key="email"></Column>
        <Column title='简介' dataIndex="resume" key="resume"></Column>
        <Column
          title='操作'
          dataIndex="action"
          key="action"
          render={(_: any, record: ITabel) => <a>初始化密码</a>}
        ></Column>
      </Table>
    </div>
  )
}
