import { Button, DatePicker, Form, Input, message, Modal, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import deleteIcon from '../../assets/imgs/delete.png'
import style from './index.module.scss'
import { RcFile } from 'antd/lib/upload'
import Meet from './Meet'
import { getParticipants, postMaterial } from '../../api/studentApi/meet'
interface IOption {
  value: string
  label: string
}
export default function GroupPart () {
  const [isModal, setIsModal] = useState<boolean>(false)
  const [list, setList] = useState<RcFile[]>([])
  const [options, setOptions] = useState<IOption[]>([])
  const [form] = Form.useForm()
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
          return { value: JSON.stringify([item.id, 0]), label: item.name + ' - 学生' }
        } else if (item.role === 1) {
          return { value: JSON.stringify([item.id, 1]), label: item.name + ' - 老师' }
        }
        return { value: JSON.stringify([item.id, item.role]), label: item.name }
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
  const postMaterialClick = async () => {
    const formData = new FormData()
    list.forEach(item => formData.append('file', item))
    const res = await postMaterial(formData, list.length)
    console.log(res)
  }

  const createMeeting = (values: any) => {
    console.log(values)
    postMaterialClick()
  }
  return (
    <div className={style.back}>
      <Button onClick={() => openModal()}>创建会议</Button>
      <div className={style.meet_box}>
        <Meet></Meet>
        <Meet></Meet>
        <Meet></Meet>
      </div>
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
              { max: 20, message: '会议地点长度不超过20' }
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
