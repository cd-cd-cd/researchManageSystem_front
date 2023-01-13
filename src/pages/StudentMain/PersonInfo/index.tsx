import { Button, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useState } from 'react'
import useVarify from '../../../hooks/useVarify'
import style from './index.module.scss'

interface IItem {
  label: 'phoneNumber' | 'email' | 'resume' | ''
  value: string
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

export default function PersonInfo () {
  const [item, setItem] = useState<IItem>()
  const [warn, setWarn] = useState<string>()
  const { checkPhone, checkEmail, checkResume } = useVarify()
  const phoneNumber = '13419592292'
  const email = '1262877491@qq.com'
  const resume = '你好你好你好你好我是一坨大便你好你好你好你好你好你好我是一坨大便你好你好好我是一坨大便你好你好你好你好我是一坨大便你好你好你好你好我是一坨大便你好你好你好你好我是一坨大便'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const resetItem = () => {
    setItem({ label: '', value: '' })
    setWarn('')
  }

  const checkBasicInfo = () => {
    if (item?.label === 'phoneNumber') {
      if (checkPhone(item.value)) {
        console.log(item.value, 'success')
      } else {
        setWarn('联系电话格式有误')
      }
    } else if (item?.label === 'email') {
      if (checkEmail(item.value)) {
        console.log(item.value, 'success')
      } else {
        setWarn('邮箱格式有误')
      }
    } else if (item?.label === 'resume') {
      if (checkResume(item.value)) {
        console.log(item.value, 'success')
      } else {
        setWarn('个人简介不得超过200字')
      }
    }
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={style.back}>
      <div className={style.info_box}>
        <span className={style.title}>个人信息</span>
        <div className={style.person_bpx}>
          <div className={style.avatar}>
          </div>
          <div className={style.info}>
            <span>姓名:</span><span>陈典</span>
            <span>学号：</span><span>0121903490226</span>
            <span>联系电话：</span>
            <div
              className={style.changeInfo}
            >{
                item?.label !== 'phoneNumber'
                  ? phoneNumber
                  : <div>
                    <Input
                      className={style.input}
                      value={item?.value}
                      onChange={(e) => { setItem({ label: 'phoneNumber', value: e.target.value }) }}
                    ></Input>
                    <div className={style.warn}>{warn}</div>
                  </div>
              }
              {
                item?.label === 'phoneNumber'
                  ? <div className={style.btns}>
                    <Button type='default' size='small' onClick={() => resetItem()}>取消</Button>
                    <Button type='primary' size='small' className={style.confirm} onClick={() => checkBasicInfo()}>确认</Button>
                  </div>
                  : <a
                    className={style.modify}
                    onClick={() => { setItem({ label: 'phoneNumber', value: phoneNumber }) }}
                  >修改</a>
              }
            </div>
            <span>邮箱：</span>
            <div
              className={style.changeInfo}
            >{
                item?.label !== 'email'
                  ? email
                  : <div>
                    <Input
                      className={style.input}
                      value={item?.value}
                      onChange={(e) => { setItem({ label: 'email', value: e.target.value }) }}
                    ></Input>
                    <div className={style.warn}>{warn}</div>
                  </div>
              }
              {
                item?.label === 'email'
                  ? <div className={style.btns}>
                    <Button type='default' size='small' onClick={() => resetItem()}>取消</Button>
                    <Button type='primary' size='small' className={style.confirm} onClick={() => checkBasicInfo()}>确认</Button>
                  </div>
                  : <a
                    className={style.modify}
                    onClick={() => { setItem({ label: 'email', value: email }) }}
                  >修改</a>
              }
            </div>
            <span>个人简介：</span>
            <div
              className={style.resume_text}
            >{
                item?.label !== 'resume'
                  ? resume
                  : <div className={style.resume_text}>
                    <Input.TextArea
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={item.value}
                      onChange={(e) => { setItem({ label: 'resume', value: e.target.value }) }}
                    ></Input.TextArea>
                    <div className={style.warn}>{warn}</div>
                  </div>
              }
              {
                item?.label === 'resume'
                  ? <div className={style.resume_btns}>
                    <Button type='default' size='small' onClick={() => resetItem()}>取消</Button>
                    <Button type='primary' size='small' className={style.confirm} onClick={() => checkBasicInfo()}>确认</Button>
                  </div>
                  : <a className={style.modify_resume} onClick={() => setItem({ label: 'resume', value: resume })}>修改</a>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={style.password_box}>
        <span className={style.title}>安全设置</span>
        <div className={style.secure_box}>
          <span>修改密码</span>
          <a className={style.modify} onClick={showModal}>修改</a>
        </div>
      </div>
      <Modal title="修改密码"
        okText='确定'
        cancelText='取消'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          {...layout}
          form={form}
          name='passwordChange'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="原密码"
            name="oldPassword"
            rules={[
              { required: true, message: '请输入原密码' },
              { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9!@#$%^&*_]{8,16}$/, message: '8-16位，字母、数字或符号组合' }
            ]}
          >
            <Input type='password'/>
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[
              { required: true, message: '请输入新密码' },
              { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9!@#$%^&*_]{8,16}$/, message: '8-16位，字母、数字或符号组合' }
            ]}
          >
            <Input type="password" placeholder='8-16位，字母、数字或符号组合'/>
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true, message: '请再次输入密码' },
              { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9!@#$%^&*_]{8,16}$/, message: '8-16位，字母、数字或符号组合' }
            ]}
          >
            <Input type='password'/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
