import { Button, Form, Input, message, Select } from 'antd'
import DatePicker, { RangePickerProps } from 'antd/lib/date-picker'
import style from '../index.module.scss'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { disciplineOneOption, publicationNameOption } from '../../../../../libs/data'
import ProductionMask from '../../ProductionMask'
import { createThesis } from '../../../../../api/studentApi/production'

export default function Thesis () {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  // 创建专利
  const postThesis = async (values: any) => {
    setLoading(true)
    const res = await createThesis(
      values.title,
      values.firstAuthor,
      values.publishDate.toDate(),
      values.publicationName,
      values.signature,
      values.discipline_one
    )
    if (res?.success) {
      setLoading(false)
      message.success(res.msg)
      form.resetFields()
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
        onFinish={postThesis}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='论文题目'
          name='title'
          rules={[
            { max: 30, message: '论文题目不超过30字' },
            { required: true, message: '论文题目不为空' }
          ]}
        >
          <Input placeholder='论文题目'></Input>
        </Form.Item>
        <Form.Item
          label='第一作者'
          name='firstAuthor'
          rules={[
            { max: 20, message: '名字不超过20字' },
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
          <Select
            options={publicationNameOption}
            placeholder='发表刊物'
          ></Select>
        </Form.Item>
        <Form.Item
          label='学校署名'
          name='signature'
          rules={[
            { max: 20, message: '不超过20位' },
            { required: true, message: '学校署名不为空' }
          ]}
        >
          <Input placeholder='学校署名'></Input>
        </Form.Item>
        <Form.Item
          label='一级学科'
          name='discipline_one'
          rules={[
            { required: true, message: '一级学科不为空' }
          ]}
        >
          <Select
            options={disciplineOneOption}
            placeholder='一级学科'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            showSearch
          ></Select>
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
