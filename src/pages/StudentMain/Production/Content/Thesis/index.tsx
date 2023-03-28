import { Button, Form, Input } from 'antd'
import DatePicker, { RangePickerProps } from 'antd/lib/date-picker'
import style from './index.module.scss'
import React from 'react'
import dayjs from 'dayjs'

export default function Thesis () {
  const [form] = Form.useForm()
  // 创建专利
  const createThesis = (values: any) => {
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
        onFinish={createThesis}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='论文题目'
          name='title'
          rules={[
            { required: true, message: '论文题目不为空' }
          ]}
        >
          <Input placeholder='论文题目'></Input>
        </Form.Item>
        <Form.Item
          label='论文类型'
          name='type'
          rules={[
            { required: true, message: '论文类型不为空' }
          ]}
        >
          <Input placeholder='论文类型'></Input>
        </Form.Item>
        <Form.Item
          label='第一作者'
          name='firstAuthor'
          rules={[
            { required: true, message: '第一作者不为空' }
          ]}
        >
          <Input placeholder='第一作者'></Input>
        </Form.Item>
        <Form.Item
          label='发表时间'
          name='publishDate'
          rules={[
            { required: true, message: '发表时间不为空' }
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label='发表刊物'
          name='publicationName'
          rules={[
            { required: true, message: '发表刊物不为空' }
          ]}
        >
          <Input placeholder='发表刊物'></Input>
        </Form.Item>
        <Form.Item
          label='学校署名'
          name='signature'
          rules={[
            { required: true, message: '学校署名不为空' }
          ]}
        >
          <Input placeholder='学校署名'></Input>
        </Form.Item>
        <Form.Item
          label='学科分类'
          name='subjectCategory'
          rules={[
            { required: true, message: '学科分类不为空' }
          ]}
        >
          <Input placeholder='学科分类'></Input>
        </Form.Item>
        <Form.Item
          label='一级学科'
          name='discipline_one'
          rules={[
            { required: true, message: '一级学科不为空' }
          ]}
        >
          <Input placeholder='一级学科'></Input>
        </Form.Item>
        <Form.Item
          label='发表范围'
          name='pub_scope'
          rules={[
            { required: true, message: '发表范围不为空' }
          ]}
        >
          <Input placeholder='发表范围'></Input>
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
