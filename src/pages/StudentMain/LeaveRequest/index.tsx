import { Button, DatePicker, Form, Input, Modal, Table, Upload } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import style from './index.module.scss'
import Column from 'antd/lib/table/Column'
export default function LeaveRequest () {
  const [isModal, setModal] = useState(false)
  const [form] = useForm()
  const closeModal = () => {
    form.resetFields()
    setModal(false)
  }

  const postLeave = (values: any) => {
    console.log(values)
  }
  return (
    <div>
      <Button className={style.leave_btn} type='primary' onClick={() => setModal(true)}>发起请假</Button>
      <Table>
        <Column title="请假时间" dataIndex="time" key="time" />
        <Column title="请假理由" dataIndex="reason" key="reason" />
        <Column title="材料" dataIndex="material" key="material" />
        <Column title="状态" dataIndex="status" key="status" />
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
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
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
