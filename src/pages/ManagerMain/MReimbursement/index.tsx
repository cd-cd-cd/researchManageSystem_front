import { Button, message, Popconfirm, Table, Tag } from 'antd'
import style from './index.module.scss'
import React, { useEffect, useState } from 'react'
import Column from 'antd/lib/table/Column'
import useFile from '../../../hooks/useFile'
import { IReimbersementState, IRole } from '../../../libs/model'
import { consent, getInfos, refuse } from '../../../api/managerApi/reimbursement'
import dayjs from 'dayjs'

interface ITabel {
  key: string
  name: string
  username: string
  role: IRole
  affair: string
  sum: number
  receipt: string
  material: string
  status: IReimbersementState
  time: string
}

export default function MReimbursement () {
  const [isReview, setIsReview] = useState(false)
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const [infoList, setInfoList] = useState<ITabel[]>([])
  const [actionId, setActionId] = useState('')
  const { decode } = useFile()

  const paginationProps = {
    pageSize: 8,
    current,
    total,
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
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
              >{decode(url, 'http://seach-chendian.oss-cn-hangzhou.aliyuncs.com/reimbursement/')}
              </a>
            )
        }
      </div>
    } else {
      return ''
    }
  }

  const renderRole = (role: IRole) => {
    switch (role) {
      case 0:
        return <Tag color='grey'>学生</Tag>
      case 1:
        return <Tag color='grey'>老师</Tag>
    }
  }

  // 状态
  const renderState = (state: IReimbersementState) => {
    switch (state) {
      case -1:
        return <Tag color='green'>审核中</Tag>
      case 0:
        return <Tag color='blue'>通过</Tag>
      case 1:
        return <Tag color='red'>拒绝</Tag>
    }
  }

  // 得到消息&&刷新
  const getInfo = async () => {
    setLoading(true)
    const res = await getInfos(current, 8, isReview)
    if (res?.success) {
      setTotal(res.data.total)
      const temp: ITabel[] = res.data.requests.reduce((pre: ITabel[], cur) => {
        pre.push({
          key: cur.id,
          name: cur.applyUser.name,
          username: cur.applyUser.username,
          role: cur.applyUser.role,
          affair: cur.affairReason,
          sum: cur.amount,
          receipt: cur.invoice,
          material: cur.credential,
          status: cur.reimbursementState,
          time: dayjs(cur.createdTime).format('YYYY-MM-DD')
        })
        return pre
      }, [])
      setInfoList(temp)
      setLoading(false)
    }
  }

  useEffect(() => {
    getInfo()
  }, [current, isReview])

  const confirm = async () => {
    const res = await consent(actionId)
    if (res?.success) {
      getInfo()
      message.success(res.msg)
    }
  }

  const confirmRefuse = async () => {
    const res = await refuse(actionId)
    if (res?.success) {
      getInfo()
      message.success(res.msg)
    }
  }
  return (
    <div>
      <Button
        className={style.btn_top}
        onClick={() => { setIsReview(!isReview); setCurrent(1) }}
        type={isReview ? 'primary' : 'default'}
      >
        {
          isReview ? '全部' : '未审核'
        }
      </Button>
      <Table
        loading={loading}
        dataSource={infoList}
        pagination={paginationProps}
      >
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="学号" dataIndex="username" key="username" />
        <Column
          title="角色"
          dataIndex="role"
          key="role"
          render={(role: IRole, _: any) => renderRole(role)}
        />
        <Column title="具体事务" dataIndex="affair" key="affair" />
        <Column title="报销金额" dataIndex="sum" key="sum" />
        <Column
          title="发票"
          dataIndex="receipt"
          key="receipt"
          render={
            (url: string, _: any) => url
              ? <a href={url}
              >{decode(url, 'http://seach-chendian.oss-cn-hangzhou.aliyuncs.com/reimbursement/')}
              </a>
              : ''
          }
        />
        <Column
          title="相关证明材料"
          dataIndex="material"
          key="material"
          render={(url: string, _: any) => handleMaterial(url)}
        />
        <Column
          title="状态"
          dataIndex="status"
          key="status"
          render={(status: IReimbersementState, _: any) => renderState(status)}
        />
        <Column title="申请时间" dataIndex="time" key="time" />
        <Column
          title='操作'
          dataIndex="action"
          key="action"
          render={
            (_: any, record: ITabel) => <div onClick={() => setActionId(record.key)} className={style.action_box}>
              {
                record.status === -1
                  ? <><Popconfirm
                    title='确定通过此报销申请吗？'
                    onConfirm={() => confirm()}
                  >
                    <a className={style.a}>通过</a>
                  </Popconfirm>
                    <Popconfirm
                      title='确定驳回此报销申请吗？'
                      onConfirm={() => confirmRefuse()}
                    ><a className={style.a}>驳回</a>
                    </Popconfirm></>
                  : ''
              }
            </div>
          }
        />
      </Table>
    </div>
  )
}
