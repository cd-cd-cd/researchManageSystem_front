// import { Badge, Descriptions } from 'antd'
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { apply, getDevice } from '../../../api/studentApi/device'
import { IOption } from '../../../libs/model'
import style from './index.module.scss'

export default function DeviceManager () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [option, setOption] = useState<IOption[]>()
  const [form] = useForm()
  const closeModal = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const applyDevice = async (values: any) => {
    const { serialNumber, reason, time } = values
    const startTime = dayjs(time[0]).format('YYYY-MM-DD')
    const endTime = dayjs(time[1]).format('YYYY-MM-DD')
    const res = await apply(serialNumber, reason, startTime, endTime)
    if (res?.status === 20003) {
      closeModal()
      message.success(res.msg)
    }
  }

  const getIdleDevice = async () => {
    const res = await getDevice()
    if (res?.status === 20002) {
      const newRes: IOption[] = res.data.reduce((pre: IOption[], cur) => {
        const temp = { value: cur.id, label: cur.name + ' - ' + cur.serialNumber }
        return [...pre, temp]
      }, [])
      setOption(newRes)
    }
    setIsModalOpen(true)
  }
  return (
    <div className={style.back}>
      <Button type='primary' className={style.apply_btn} onClick={() => getIdleDevice()}>设备申请</Button>
      <div className={style.main}>
        <div className={style.show_box}>
          <div>
            <span className={style.label}>编号:</span>
            <span>1807053N</span>
          </div>
          <div>
            <span className={style.label}>名称:</span>
            <span>GPU并行运算服务器</span>
          </div>
          <div>
            <span className={style.label}>型号:</span>
            <span>IW4200-4G</span>
          </div>
          <div>
            <span className={style.label}>原值:</span>
            <span>73829</span>
          </div>
          <div>
            <span className={style.label}>存放地:</span>
            <span>九教北604A</span>
          </div>
          <div className={style.index_box}>
            <span className={style.label}>设备性能指标:</span>
            <span> Lenovo P318，Intel Core i7-6700，3900 MHz，Samsung 250GB SSD+2TB，16GB内存， NVIDIA GTX 1080</span>
          </div>
        </div>
        <div className={style.show_box}>
          <div>
            <span className={style.label}>编号:</span>
            <span>1807053N</span>
          </div>
          <div>
            <span className={style.label}>名称:</span>
            <span>GPU并行运算服务器</span>
          </div>
          <div>
            <span className={style.label}>型号:</span>
            <span>IW4200-4G</span>
          </div>
          <div>
            <span className={style.label}>原值:</span>
            <span>73829</span>
          </div>
          <div>
            <span className={style.label}>存放地:</span>
            <span>九教北604A</span>
          </div>
          <div className={style.index_box}>
            <span className={style.label}>设备性能指标:</span>
            <span> Lenovo P318，Intel Core i7-6700，3900 MHz，Samsung 250GB SSD+2TB，16GB内存， NVIDIA GTX 1080</span>
          </div>
        </div>
      </div>
      <Modal
        title="设备申请"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          onFinish={applyDevice}
        >
          <Form.Item
            label='设备'
            name='serialNumber'
            rules={[
              { required: true, message: '设备不为空' }
            ]}
          >
            <Select
              style={{ width: '300px' }}
              placeholder="选择设备"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={option}
            ></Select>
          </Form.Item>
          <Form.Item
            label='申请时间'
            name='time'
            rules={[
              { required: true, message: '申请时间不为空' }
            ]}
          >
            <DatePicker.RangePicker style={{ width: '300px' }} />
          </Form.Item>
          <Form.Item
            name='reason'
            label='申请理由'
            rules={[
              { max: 255, message: '申请理由不超过255' }
            ]}
          >
            <Input.TextArea
              placeholder='申请理由'
            >
            </Input.TextArea>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit">
                确认添加
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
