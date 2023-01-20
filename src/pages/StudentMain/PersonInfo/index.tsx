import { Button, Form, Input, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { personInfo } from '../../../api/auth'
import { updateEmail, updatePhone, updateResume } from '../../../api/teacher'
import useVarify from '../../../hooks/useVarify'
import { IInfo, IRole } from '../../../libs/model'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [info, setInfo] = useState<IInfo>()
  const [role, setRole] = useState<IRole>()
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

  const checkBasicInfo = async () => {
    const id = localStorage.getItem('id')
    if (item?.label === 'phoneNumber') {
      if (checkPhone(item.value)) {
        if (role === 1) {
          if (id) {
            const res = await updatePhone(id, item.value)
            if (res?.status === 200) {
              getInfo()
              resetItem()
              message.success(res.data)
            }
          }
        }
        setWarn('')
      } else {
        setWarn('联系电话格式有误')
      }
    } else if (item?.label === 'email') {
      if (checkEmail(item.value)) {
        if (role === 1) {
          if (id) {
            const res = await updateEmail(id, item.value)
            if (res?.status === 200) {
              getInfo()
              resetItem()
              message.success(res.data)
            }
          }
        }
        setWarn('')
      } else {
        setWarn('邮箱格式有误')
      }
    } else if (item?.label === 'resume') {
      if (checkResume(item.value)) {
        if (role === 1) {
          if (id) {
            const res = await updateResume(id, item.value)
            if (res?.status === 200) {
              getInfo()
              resetItem()
              message.success(res.data)
            }
          }
        }
        setWarn('')
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

  const getInfo = async () => {
    const roleTemp = location.pathname.split('/')[1]
    if (roleTemp === 'student') {
      setRole(0)
    } else if (roleTemp === 'teacher') {
      setRole(1)
    } else if (roleTemp === 'manager') {
      setRole(2)
    }
    const id = localStorage.getItem('id')
    if (id && role) {
      const res = await personInfo(id, role as IRole)
      if (res?.status === 200) {
        setInfo(res.data)
      }
    }
  }
  useEffect(() => {
    getInfo()
  }, [])

  return (
    <div className={style.back}>
      <div className={style.info_box}>
        <span className={style.title}>个人信息</span>
        <div className={style.person_bpx}>
          <div className={style.avatar}>
          </div>
          <div className={style.info}>
            <span>姓名:</span><span>{info?.name}</span>
            <span>学号：</span><span>{info?.username}</span>
            <span>联系电话：</span>
            <div
              className={style.changeInfo}
            >{
                item?.label !== 'phoneNumber'
                  ? (info?.phoneNumber ? info.phoneNumber : <div className={style.nullText}>还未设置手机号</div>)
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
                    onClick={() => { setItem({ label: 'phoneNumber', value: info?.phoneNumber as string }) }}
                  >修改</a>
              }
            </div>
            <span>邮箱：</span>
            <div
              className={style.changeInfo}
            >{
                item?.label !== 'email'
                  ? (info?.email ? info.email : <div className={style.nullText}>还未设置邮箱</div>)
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
                    onClick={() => { setItem({ label: 'email', value: info?.email as string }) }}
                  >修改</a>
              }
            </div>
            <span>个人简介：</span>
            <div
              className={style.resume_text}
            >{
                item?.label !== 'resume'
                  ? (info?.resume ? info?.resume : <div className={style.nullText}>还未设置简介</div>)
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
                  : <a className={style.modify_resume} onClick={() => setItem({ label: 'resume', value: info?.resume as string })}>修改</a>
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
