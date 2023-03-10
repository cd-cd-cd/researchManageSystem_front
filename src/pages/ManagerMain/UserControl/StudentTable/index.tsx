import { Button, Input, message, Modal, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getStuInfo, initStu, searchStudent } from '../../../../api/managerApi/info'
import style from './index.module.scss'

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
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearch, setIsSearch] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [info, setInfo] = useState<ITabel>()
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

  const initPassword = async () => {
    if (info?.key && info.username) {
      const res = await initStu(info.key, info.username)
      if (res?.success) {
        setIsModal(false)
        message.success(res.msg)
      }
    }
  }

  const search = async (info: string) => {
    if (info) {
      const res = await searchStudent(info, current, 8)
      if (res?.success) {
        setTotal(res.data.total)
        setCurrent(1)
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
      }
    }
  }

  const clickSearch = (value: string) => {
    setIsSearch(true)
    if (!value) {
      message.info('???????????????')
    } else {
      search(value)
    }
  }

  useEffect(() => {
    if (isSearch) {
      search(searchValue)
    } else {
      getInfo()
    }
  }, [current, isStu])
  return (
    <div>
      <div className={style.search_box}>
        <Input.Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={(value) => clickSearch(value)}
          placeholder='???????????????????????????????????????'
          className={style.searchBtn}
        ></Input.Search>
        <Button onClick={() => { getInfo(); setSearchValue(''); setIsSearch(false) }}>??????</Button>
      </div>
      <Table
        loading={loading}
        dataSource={infoList}
        pagination={paginationProps}
      >
        <Column title='??????' dataIndex="name" key="name"></Column>
        <Column title='??????' dataIndex="username" key="username"></Column>
        <Column title='??????' dataIndex="teacher" key="teacher"></Column>
        <Column title='????????????' dataIndex="createdTime" key="createdTime"></Column>
        <Column title='?????????' dataIndex="phoneNumber" key="phoneNumber"></Column>
        <Column title='??????' dataIndex="email" key="email"></Column>
        <Column title='??????' dataIndex="resume" key="resume"></Column>
        <Column
          title='??????'
          dataIndex="action"
          key="action"
          render={(_: any, record: ITabel) => <a onClick={() => { setIsModal(true); setInfo(record) }}>???????????????</a>}
        ></Column>
      </Table>
      <Modal
        open={isModal}
        title="??????"
        onOk={() => initPassword()}
        onCancel={() => setIsModal(false)}
      >
        <div>?????????????????????????????????????</div>
      </Modal>
    </div>
  )
}
