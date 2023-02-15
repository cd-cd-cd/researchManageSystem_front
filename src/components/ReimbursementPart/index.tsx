import { Button, Form, Input, InputNumber, Modal, Table, Upload } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import Column from 'antd/lib/table/Column'
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import style from './index.module.scss'
export default function ReimbursementPart () {
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
      <Button className={style.leave_btn} type='primary' onClick={() => setModal(true)}>报销申请</Button>
      <Table>
        <Column title="具体事务" dataIndex="affair" key="affair" />
        <Column title="报销金额" dataIndex="sum" key="sum" />
        <Column title="发票" dataIndex="receipt" key="receipt" />
        <Column title="相关证明材料" dataIndex="material" key="material" />
        <Column title="状态" dataIndex="status" key="status" />
        <Column title="申请时间" dataIndex="time" key="time" />
      </Table>
      <Modal
        open={isModal}
        title='报销申请'
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
            label='具体事务'
            name='affair'
            rules={[
              { required: true, message: '具体事务不为空' },
              { max: 255, message: '不超过255字' }
            ]}
          >
            <Input.TextArea placeholder='请填写报销具体事务'></Input.TextArea>
          </Form.Item>
          <Form.Item
            label='报销金额'
            name='sum'
            rules={[
              { required: true, message: '报销金额不为空' }
            ]}
          >
            <InputNumber min={0} defaultValue={1}/>
          </Form.Item>
          <Form.Item
            label='发票（pdf）'
            name='receipt'
            rules={[
              { required: true, message: '必须上传发票' }
            ]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label='相关证明材料'
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
