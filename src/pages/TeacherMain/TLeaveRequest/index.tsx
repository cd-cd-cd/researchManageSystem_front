import { Button, DatePicker, message, Modal, Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { consent, getLeaveRequest, refuse } from '../../../api/teacherApi/leave'
import useFile from '../../../hooks/useFile'
import { IRequestState } from '../../../libs/model'
import style from './index.module.scss'

interface ITable {
  key: string
  name: string
  reason: string
  material: string
  status: IRequestState
  startTime: Date
  endTime: Date
  endStartTime: Date
  endEndTime: Date
}

type RangeValue = [Moment | null, Moment | null] | null

export default function TLeaveRequest () {
  const [loading, setLoading] = useState(true)
  const [chooseUnchecked, setChooseUnchecked] = useState(false)
  const [infoList, setInfoList] = useState<ITable[]>()
  const { decode } = useFile()
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState<RangeValue>()
  const [id, setId] = useState<string>('')
  const [originTime, setOriginTime] = useState<RangeValue>()

  const paginationProps = {
    pageSize: 8,
    current,
    total,
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
    }
  }

  const onChange = (
    values: RangeValue,
    _: any
  ) => {
    setTime(values)
  }

  const clickState = (record: ITable) => {
    setOpen(true)
    setTime([moment(record.endStartTime), moment(record.endEndTime)])
    setOriginTime([moment(record.endStartTime), moment(record.endEndTime)])
    setId(record.key)
  }

  // 状态
  const renderState = (state: IRequestState, record: ITable) => {
    switch (state) {
      case -1:
        return <Tag color='green' className={style.action} onClick={() => clickState(record)}>审核中</Tag>
      case 0:
        return <Tag color='blue'>同意</Tag>
      case 1:
        return <Tag color='red'>拒绝</Tag>
    }
  }

  // 处理材料
  const handleMaterial = (info: string) => {
    if (info) {
      return <div className={style.a_box}>
        {
          info.split(';')
            .map((url, index) =>
              <a href={url} key={index}
              >{decode(url, 'http://seach-chendian.oss-cn-hangzhou.aliyuncs.com/leaveRequest/')}
              </a>
            )
        }
      </div>
    } else {
      return ''
    }
  }

  // 处理时间
  const handleTime = (star: Date, end: Date, endStar: Date, endEnd: Date) => {
    if (endStar && endEnd) {
      return `${dayjs(endStar).format('YYYY-MM-DD HH:mm')} --- ${dayjs(endEnd).format('YYYY-MM-DD HH:mm')}`
    } else {
      return `${dayjs(star).format('YYYY-MM-DD HH:mm')} --- ${dayjs(end).format('YYYY-MM-DD HH:mm')}`
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  // 刷新
  const refresh = (msg: string) => {
    message.success(msg)
    setOpen(false)
    getInfo()
  }

  const handleOk = async () => {
    if (time && time[0] && time[1]) {
      const res = await consent(id, time[0].toDate(), time[1].toDate())
      if (res?.success) {
        refresh(res.msg)
      }
    } else {
      message.error('请输入时间')
    }
  }

  const handleRefuse = async () => {
    const res = await refuse(id)
    if (res?.success) {
      refresh(res.msg)
    }
  }

  // 得到信息
  const getInfo = async () => {
    setLoading(true)
    const res = await getLeaveRequest(current, 8, chooseUnchecked)
    if (res?.success) {
      setTotal(res.data.total)
      const temp: ITable[] = res.data.requests.reduce((pre: ITable[], cur) => {
        pre.push({
          key: cur.id,
          name: cur.askForLeavePerson.name,
          reason: cur.reason,
          startTime: cur.startTime,
          endTime: cur.endTime,
          endStartTime: cur.endStartTime,
          endEndTime: cur.endEndTime,
          material: cur.materials,
          status: cur.requestState
        })
        return pre
      }, [])
      setInfoList(temp)
      setLoading(false)
    }
  }

  useEffect(() => {
    getInfo()
  }, [current, chooseUnchecked])
  return (
    <div>
      <Button
        className={style.btn_top}
        onClick={() => { setChooseUnchecked(!chooseUnchecked); setCurrent(1) }}
        type={chooseUnchecked ? 'primary' : 'default'}
      >
        {
          chooseUnchecked ? '全部' : ''
        }
      </Button>
      <Table
        loading={loading}
        dataSource={infoList}
        pagination={paginationProps}
      >
        <Column
          title='姓名'
          dataIndex="name"
          key="name"
        />
        <Column
          title="请假时间"
          dataIndex="time"
          key="time"
          render={(_: any, record: ITable) => handleTime(record.startTime, record.endTime, record.endStartTime, record.endEndTime)}
        />
        <Column title="请假理由" dataIndex="reason" key="reason" />
        <Column
          title="材料"
          dataIndex="material"
          key="material"
          render={(value: string) => handleMaterial(value)}
        />
        <Column
          title="状态"
          dataIndex="status"
          key="status"
          render={(value: IRequestState, record: ITable) => renderState(value, record)}
        />
      </Table>
      <Modal
        open={open}
        onCancel={handleCancel}
        title='审核'
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            同意
          </Button>,
          <Button key="refuse" type="primary" onClick={handleRefuse}>
            拒绝
          </Button>
        ]}
      >
        <div className={style.time_box}>
          <span className={style.label}>请假时间：
          </span>
          <DatePicker.RangePicker onChange={onChange} value={time}></DatePicker.RangePicker>
          <Button size='small' onClick={() => setTime(originTime)} className={style.reset_btn}>重置</Button>
        </div>
      </Modal>
    </div>
  )
}
