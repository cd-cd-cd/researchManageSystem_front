import { Button, DatePicker, Form, Input, message, Select } from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { createWin } from '../../../../../api/studentApi/production'
import { awardGradeOption, awardLevelOption } from '../../../../../libs/data'
import ProductionMask from '../../ProductionMask'
import style from '../index.module.scss'

export default function Winning () {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  // 创建获奖
  const createWinning = async (values: any) => {
    setLoading(true)
    const res = await createWin(
      values.name,
      values.awardGrade,
      values.awardLevel,
      values.awardTime.toDate(),
      values.organizingCommittee
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
        onFinish={createWinning}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='获奖名称'
          name='name'
          rules={[
            { max: 30, message: '获奖名称不超过30字 ' },
            { required: true, message: '获奖名称不为空' }
          ]}
        >
          <Input placeholder='获奖名称'></Input>
        </Form.Item>
        <Form.Item
          label='获奖等级'
          name='awardGrade'
          rules={[
            { required: true, message: '获奖等级不为空' }
          ]}
        >
          <Select
            options={awardGradeOption}
          ></Select>
        </Form.Item>
        <Form.Item
          label='获奖级别'
          name='awardLevel'
          rules={[
            { required: true, message: '获奖级别不为空' }
          ]}
        >
          <Select
            options={awardLevelOption}
          ></Select>
        </Form.Item>
        <Form.Item
          label='获奖时间'
          name='awardTime'
          rules={[
            { required: true, message: '获奖时间不为空' }
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label='大赛组委会'
          name='organizingCommittee'
          rules={[
            { max: 30, message: '长度不超过30字' },
            { required: true, message: '大赛组委会不为空' }
          ]}
        >
          <Input placeholder='大赛组委会'></Input>
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
