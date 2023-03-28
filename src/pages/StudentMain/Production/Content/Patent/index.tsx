import { Button, DatePicker, Form, Input, Select } from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import style from './index.module.scss'
import React from 'react'
import { principalClassificationNumberOption } from '../../../../../libs/data'

export default function Patent () {
  const [form] = Form.useForm()
  // 创建专利
  const createPatent = (values: any) => {
    console.log(values)
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf('day')
  }
  return (
    <div>
      <Form
        className={style.form}
        onFinish={createPatent}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='专利名称'
          name='name'
          rules={[
            { max: 25, message: '专利名称不超过25位' },
            { required: true, message: '专利名称不为空' }
          ]}
        >
          <Input placeholder='专利名称'></Input>
        </Form.Item>
        <Form.Item
          label='申请（专利）号'
          name='applicationNumber'
          rules={[
            { pattern: /^\d{12}$/, message: '申请专利号格式有误' },
            { required: true, message: '申请号不为空' }
          ]}
        >
          <Input placeholder='申请（专利）号'></Input>
        </Form.Item>
        <Form.Item
          label='申请日'
          name='applicationDate'
          rules={[
            { required: true, message: '申请日不为空' }
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label='公开（公告）号'
          name='publicationNumber'
          rules={[
            { len: 10, message: '公开号格式有误' },
            { required: true, message: '公开号不为空' }
          ]}
        >
          <Input placeholder='公开（公告）号'></Input>
        </Form.Item>
        <Form.Item
          label='公开（公告）日'
          name='openDay'
          rules={[
            { required: true, message: '公开日不为空' }
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label='主分类号'
          name='principalClassificationNumber'
          rules={[
            { required: true, message: '主分类号不为空' }
          ]}
        >
          <Select
            options={principalClassificationNumberOption}
            placeholder='主分类号'></Select>
        </Form.Item>
        <Form.Item
          label='申请（专利权）人'
          name='patentRight'
          rules={[
            { required: true, message: '申请人不为空' }
          ]}
        >
          <Input placeholder='申请（专利权）人'></Input>
        </Form.Item>
        <Form.Item
          label='发明（设计）人'
          name='inventor'
          rules={[
            { required: true, message: '发明人不为空' }
          ]}
        >
          <Input placeholder='发明（设计）人'></Input>
        </Form.Item>
        <Form.Item
          label='摘要'
          name='digest'
          rules={[
            { max: 300, message: '摘要不超过30字' },
            { required: true, message: '摘要不为空' }
          ]}
        >
          <Input.TextArea placeholder='摘要'></Input.TextArea>
        </Form.Item>
        <Form.Item>
          <div className={style.btn_box}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              取消
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
