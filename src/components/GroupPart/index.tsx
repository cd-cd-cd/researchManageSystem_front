import { Button, DatePicker, Form, Input, message, Modal, Pagination, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import deleteIcon from '../../assets/imgs/delete.png'
import style from './index.module.scss'
import { RcFile } from 'antd/lib/upload'
import Meet from './Meet'
import { getParticipants, postMaterial, createMeet, getMeeting } from '../../api/studentApi/meet'
import { IMeetingInfo } from '../../libs/model'
interface IOption {
  value: string
  label: string
}
export default function GroupPart () {
  const [isModal, setIsModal] = useState<boolean>(false)
  const [list, setList] = useState<RcFile[]>([])
  const [options, setOptions] = useState<IOption[]>([])
  const [meetInfos, setMeetInfos] = useState<IMeetingInfo[]>()
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(4)
  // 关闭窗口
  const closeModal = () => {
    form.resetFields()
    setList([])
    setIsModal(false)
  }

  const beforeUpload = (file: RcFile) => {
    const isTypeTrue = file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword'
    const num = list.length
    if (num === 8) {
      message.info('最多上传八份文件')
    } else {
      if (!isTypeTrue) {
        message.error(`${file.name} 文件只能为pptx、ppt、pdf、docx、doc格式`)
      } else {
        setList([file, ...list])
      }
    }
    return isTypeTrue && (num !== 8)
  }

  // 得到候选人
  const getChoose = async () => {
    const res = await getParticipants()
    if (res?.success) {
      const arr = res.data.map(item => {
        if (item.role === 0) {
          return { value: item.id, label: item.name + ' - 学生' }
        } else if (item.role === 1) {
          return { value: item.id, label: item.name + ' - 老师' }
        }
        return { value: item.id, label: item.name }
      })
      setOptions(arr)
    }
  }

  // 打开modal
  const openModal = () => {
    setIsModal(true)
    getChoose()
  }

  // 删除文件
  const deleteFile = (item: RcFile) => {
    setList(list.filter(file => file.uid !== item.uid))
  }

  // 上传材料
  const postMaterialClick = async (id: string) => {
    const formData = new FormData()
    list.forEach(item => formData.append('file', item))
    const res = await postMaterial(formData, list.length, id)
    if (res?.success) {
      createSuccess()
    }
  }

  // 创建成功
  const createSuccess = () => {
    getMeetingInfo()
    message.success('创建成功')
    closeModal()
  }

  // 创建会议
  const createMeeting = async (values: any) => {
    const startTime = values.time[0].toDate()
    const endTime = values.time[1].toDate()
    const res = await createMeet(
      values.title,
      values.briefContent,
      startTime,
      endTime,
      values.address,
      values.participant
    )
    if (res?.success) {
      const id = res.data
      if (list.length !== 0) {
        postMaterialClick(id)
      } else {
        createSuccess()
      }
    }
  }

  // 得到会议信息
  const getMeetingInfo = async () => {
    const res = await getMeeting(current, 4)
    if (res?.success) {
      setTotal(res.data.total)
      setMeetInfos(res.data.meetings)
    }
  }

  useEffect(() => {
    getMeetingInfo()
  }, [current])
  return (
    <div className={style.back}>
      <Button onClick={() => openModal()}>创建会议</Button>
      <div className={style.meet_box}>
        {
          meetInfos?.map(meet => <Meet key={meet.id} info={meet}></Meet>)
        }
      </div>
      <Pagination
        defaultCurrent={current}
        total={total}
        onChange={(page) => setCurrent(page)}
        className={style.pagination_bottom}
      />
      <Modal
        footer={null}
        title='创建会议'
        open={isModal}
        onCancel={() => closeModal()}
      >
        <Form
          onFinish={createMeeting}
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label='会议名称'
            name='title'
            rules={[
              { required: true, message: '会议名称不为空' },
              { max: 20, message: '名称长度不超过20字' }
            ]}
          >
            <Input placeholder='会议名称'></Input>
          </Form.Item>
          <Form.Item
            label='会议简要内容'
            name='briefContent'
            rules={[
              { max: 100, message: '简要内容不超过100字' }
            ]}
          >
            <Input.TextArea placeholder='会议简要内容'></Input.TextArea>
          </Form.Item>
          <Form.Item
            name='time'
            label='会议时间'
            rules={[
              { required: true, message: '会议时间不为空' }
            ]}
          >
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            name='address'
            label='会议地点'
            rules={[
              { required: true, message: '会议地点不为空' },
              { max: 50, message: '会议地点长度不超过50' }
            ]}
          >
            <Input placeholder='会议地点'></Input>
          </Form.Item>
          <Form.Item
            name='participant'
            label='参会人'
            rules={[
              { required: true, message: '参会人不为空' }
            ]}
          >
            <Select
              mode="multiple"
              placeholder="选择参会人"
              style={{ width: '100%' }}
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="upload"
            label="参会文件"
            extra="仅支持.pptx、.ppt、.pdf格式文件"
          >
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept='.pdf, .docx, .doc, .pptx, .ppt'
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
