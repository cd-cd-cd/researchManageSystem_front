import { Button, DatePicker, Form, Input, message, Select } from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import style from './index.module.scss'
import React, { useState } from 'react'
import { principalClassificationNumberOption } from '../../../../../libs/data'
import ProductionMask from '../../ProductionMask'
import { createPatent } from '../../../../../api/studentApi/production'

export default function Patent () {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  // 创建专利
  const postPatent = async (values: any) => {
    setLoading(true)
    const res = await createPatent(
      values.name,
      values.applicationNumber,
      (values.applicationDate).toDate(),
      values.publicationNumber,
      (values.openDay).toDate(),
      values.principalClassificationNumber,
      values.patentRight,
      values.inventor,
      values.digest
    )
    if (res?.success) {
      setLoading(false)
      message.success(res.msg)
      form.resetFields()
      console.log(res.data)
    } else {
      message.info(res?.msg)
    }
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf('day')
  }
  return (
    <div className={style.back}>
      {loading ? <ProductionMask loading={loading}></ProductionMask> : ''}
      <Form
        className={style.form}
        onFinish={postPatent}
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
            { pattern: /^\d{13}$/, message: '申请专利号格式有误' },
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
            { len: 12, message: '公开号格式有误' },
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
            { max: 100, message: '位数不超过100位' },
            { required: true, message: '申请人不为空' }
          ]}
        >
          <Input placeholder='申请（专利权）人'></Input>
        </Form.Item>
        <Form.Item
          label='发明（设计）人'
          name='inventor'
          rules={[
            { max: 100, message: '位数不超过100位' },
            { required: true, message: '发明人不为空' }
          ]}
        >
          <Input placeholder='发明（设计）人'></Input>
        </Form.Item>
        <Form.Item
          label='摘要'
          name='digest'
          rules={[
            { max: 300, message: '摘要不超过300字' },
            { required: true, message: '摘要不为空' }
          ]}
        >
          <Input.TextArea placeholder='摘要' autoSize></Input.TextArea>
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
