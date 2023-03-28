import { Button, DatePicker, Form, Input, Select } from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import React from 'react'
import { copyRightType } from '../../../../../libs/data'
import style from './index.module.scss'

export default function Copyright () {
  const [form] = Form.useForm()
  // 创建专利
  const createCopyRight = (values: any) => {
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
        onFinish={createCopyRight}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='登记号'
          name='registerNumber'
          rules={[
            { required: true, message: '登记号不为空' }
          ]}
        >
          <Input placeholder='登记号'></Input>
        </Form.Item>
        <Form.Item
          label='作品名称'
          name='name'
          rules={[
            { required: true, message: '作品名称不为空' }
          ]}
        >
          <Input placeholder='作品名称'></Input>
        </Form.Item>
        <Form.Item
          label='作品类别'
          name='category'
          rules={[
            { required: true, message: '作品类别不为空' }
          ]}
        >
          <Select
            options={copyRightType}
          />
        </Form.Item>
        <Form.Item
          label='著作权人'
          name='copyrightOwner'
          rules={[
            { required: true, message: '著作权人不为空' }
          ]}
        >
          <Input placeholder='著作权人'></Input>
        </Form.Item>
        <Form.Item
          label='创作完成日期'
          name='creationCompletionDate'
          rules={[
            { required: true, message: '创作完成日期不为空' }
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label='首次发表日期'
          name='firstPublicationDate'
          rules={[
            { required: true, message: '首次发表日期不为空' }
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label='登记日期'
          name='recordDate'
          rules={[
            { required: true, message: '登记日期不为空' }
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
          />
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
