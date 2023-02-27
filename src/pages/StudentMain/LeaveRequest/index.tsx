import { Button, DatePicker, Form, Input, message, Modal, Table, Tag, Upload } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import deleteIcon from '../../../assets/imgs/delete.png'
import rightArrowIcon from '../../../assets/imgs/rightArrow.png'
import style from './index.module.scss'
import Column from 'antd/lib/table/Column'
import { RcFile } from 'antd/lib/upload'
import { getRequestInfos, postLeaveMaterial, postLeaveRequest } from '../../../api/studentApi/leaveRequst'
import { IRequestList, IRequestState } from '../../../libs/model'
import dayjs from 'dayjs'
import useFile from '../../../hooks/useFile'

export default function LeaveRequest () {
  const [loading, setLoading] = useState(true)
  const [isModal, setModal] = useState(false)
  const [list, setList] = useState<RcFile[]>([])
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [infoList, setInfoList] = useState<IRequestList[]>([])
  const [form] = useForm()

  const { decode } = useFile()
  const closeModal = () => {
    form.resetFields()
    setList([])
    setModal(false)
  }

  // 成功
  const successAction = (msg: string) => {
    closeModal()
    getRequestInfo()
    message.success({ content: msg, key: 'post' })
  }

  // 发起请假
  const postLeave = async (values: any) => {
    message.loading({ content: '正在上传中', key: 'post' })
    const res = await postLeaveRequest(values.time[0].toDate(), values.time[0].toDate(), values.reason)
    if (res?.success) {
      const num = list.length
      if (num === 0) {
        successAction(res.msg)
      } else {
        const formData = new FormData()
        list.forEach(item => formData.append('file', item))
        const temp = await postLeaveMaterial(formData, num, res.data)
        if (temp?.success) {
          successAction(res.msg)
        }
      }
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isTypeTrue = file.type === 'application/pdf' || file.type === 'image/png'
    const num = list.length
    if (num === 4) {
      message.info('最多上传四份文件')
    } else {
      if (!isTypeTrue) {
        message.error(`${file.name} 文件只能为pdf或者png格式`)
      } else {
        setList([file, ...list])
      }
    }
    return isTypeTrue && (num !== 4)
  }

  const paginationProps = {
    pageSize: 8,
    current,
    total,
    onChange: (pageNum: number) => {
      setCurrent(pageNum)
    }
  }

  // 删除文件
  const deleteFile = (item: RcFile) => {
    setList(list.filter(file => file.uid !== item.uid))
  }

  // 处理时间
  const handleTime = (startTime: Date, endTime: Date) => {
    if (startTime && endTime) {
      return `${dayjs(startTime).format('YYYY-MM-DD HH:mm')} --- ${dayjs(endTime).format('YYYY-MM-DD HH:mm')}`
    } else {
      return undefined
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

  // 状态
  const renderState = (state: IRequestState) => {
    console.log(state)
    switch (state) {
      case -1:
        return <Tag color='green'>审核中</Tag>
      case 0:
        return <Tag color='blue'>同意</Tag>
      case 1:
        return <Tag color='red'>拒绝</Tag>
    }
  }

  // 得到请假信息
  const getRequestInfo = async () => {
    setLoading(true)
    const res = await getRequestInfos(current, 8)
    if (res?.success) {
      setTotal(res.data.total)
      const temp: IRequestList[] = res.data.requests.reduce((pre: IRequestList[], cur) => {
        const result: IRequestList = {
          isUpdate: cur.isUpdate,
          key: cur.id,
          startTime: cur.startTime,
          endTime: cur.endTime,
          endStartTime: cur.endStartTime,
          endEndTime: cur.endEndTime,
          reason: cur.reason,
          material: cur.materials,
          status: cur.requestState
        }
        pre.push(result)
        return pre
      }, [])
      setInfoList(temp)
      setLoading(false)
    }
  }

  // 处理时间
  const renderTime = (record: IRequestList) => {
    if (record.isUpdate) {
      return <div className={style.time_box}>
        <span>{handleTime(record.startTime, record.endTime)}</span>
        <img src={rightArrowIcon} className={style.rightArrowIcon}></img>
        <span>{handleTime(record.endStartTime, record.endEndTime)}</span>
      </div>
    } else {
      return handleTime(record.startTime, record.endTime)
    }
  }

  useEffect(() => {
    getRequestInfo()
  }, [current])
  return (
    <div>
      <Button className={style.leave_btn} type='primary' onClick={() => setModal(true)}>发起请假</Button>
      <Table
        loading={loading}
        dataSource={infoList}
        pagination={paginationProps}
      >
        <Column
          title="请假时间"
          dataIndex="time"
          key="time"
          render={(_: any, record: IRequestList) => renderTime(record)}
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
          render={(value: IRequestState) => renderState(value)}
        />
      </Table>
      <Modal
        open={isModal}
        title='发起请假'
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form
          onFinish={postLeave}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}
        >
          <Form.Item
            label='请假时长'
            name='time'
            rules={[
              { required: true, message: '请假时长不为空' }
            ]}
          >
            <DatePicker.RangePicker></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item
            label='请假理由'
            name='reason'
            rules={[
              { required: true, message: '请假理由不为空' },
              { max: 255, message: '理由不超过255字' }
            ]}
          >
            <Input.TextArea placeholder='字数不超过255字'></Input.TextArea>
          </Form.Item>
          <Form.Item
            label='请假材料'
            name='material'
            extra="仅支持.pdf、png格式文件"
          >
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept='.pdf, .png'
              customRequest={() => { }}
            >
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
            <div className={style.list_box}>
              {
                list?.map((item, index) => <div key={index} className={style.list_line}>
                  <div className={style.list}>{item.name}</div>
                  <img src={deleteIcon} onClick={() => deleteFile(item)} className={style.deleteIcon}></img>
                </div>)
              }
            </div>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
              <Button htmlType="button" onClick={() => closeModal()}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
