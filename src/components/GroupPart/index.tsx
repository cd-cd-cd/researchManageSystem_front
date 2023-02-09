import { Button, DatePicker, Form, Input, message, Modal, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import style from './index.module.scss'
import { RcFile } from 'antd/lib/upload'
import Meet from './Meet'
const options = [
  {
    value: '0',
    label: '0'
  },
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  }
]
export default function GroupPart () {
  const [isModal, setIsModal] = useState<boolean>(false)
  const [form] = Form.useForm()
  const closeModal = () => {
    form.resetFields()
    setIsModal(false)
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  // 检查图片格式和大小
  const beforeUpload = (file: RcFile) => {
    const isTypeTrue = file.type === 'pptx' || file.type === 'ppt' || file.type === 'pdf'
    if (!isTypeTrue) {
      message.error(`${file.name} 文件只能为pptx、ppt、pdf格式`)
    }
    return isTypeTrue
  }

  const createMeeting = (values: any) => {
    console.log(values)
  }
  return (
    <div className={style.back}>
      <Button onClick={() => setIsModal(true)}>创建会议</Button>
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
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="仅支持.pptx、.ppt、.pdf格式文件"
          >
            <Upload beforeUpload={beforeUpload} name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
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
