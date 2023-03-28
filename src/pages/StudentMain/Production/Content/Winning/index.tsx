import { Button, DatePicker, Form, Input, Select } from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import React from 'react'
import { awardGradeOption, awardLevelOption } from '../../../../../libs/data'
import style from './index.module.scss'

export default function Winning () {
  const [form] = Form.useForm()
  // 创建获奖
  const createWinning = (values: any) => {
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
        onFinish={createWinning}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='获奖名称'
          name='name'
          rules={[
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
