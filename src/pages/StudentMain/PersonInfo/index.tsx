import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Button, Form, Input, message, Modal, Upload, UploadProps } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { personInfo } from '../../../api/auth'
import { changePassword, updateAvatar, updateEmail, updatePhone, updateResume } from '../../../api/teacherApi/teacher'
import useVarify from '../../../hooks/useVarify'
import { IInfo } from '../../../libs/model'
import basicAvatar from '../../../assets/imgs/avatar.svg'

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
  const [imageUrl, setImageUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [form] = useForm()
  // 控制修改头像
  const [avatarVisible, setAvatarVisible] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const resetItem = () => {
    setItem({ label: '', value: '' })
    setWarn('')
  }

  const checkBasicInfo = async () => {
    const role = +localStorage.getItem('role')!
    if (item?.label === 'phoneNumber') {
      if (checkPhone(item.value)) {
        if (role === 1) {
          const res = await updatePhone(item.value)
          if (res?.status === 10102) {
            getInfo()
            resetItem()
            message.success(res.msg)
          } else if (res?.status === 10103) {
            message.info(res.msg)
          }
        }
        setWarn('')
      } else {
        setWarn('联系电话格式有误')
      }
    } else if (item?.label === 'email') {
      if (checkEmail(item.value)) {
        if (role === 1) {
          const res = await updateEmail(item.value)
          if (res?.status === 10104) {
            getInfo()
            resetItem()
            message.success(res.msg)
          } else if (res?.status === 10105) {
            message.info(res.msg)
          }
        }
        setWarn('')
      } else {
        setWarn('邮箱格式有误')
      }
    } else if (item?.label === 'resume') {
      if (checkResume(item.value)) {
        if (role === 1) {
          const res = await updateResume(item.value)
          if (res?.status === 10106) {
            getInfo()
            resetItem()
            message.success(res.msg)
          } else if (res?.status === 10107) {
            message.info(res.msg)
          }
        }
        setWarn('')
      } else {
        setWarn('个人简介不得超过200字')
      }
    }
  }

  const onFinish = async (values: any) => {
    const { oldPassword, password, confirmPassword } = values
    if (password !== confirmPassword) {
      message.info('两次密码不一致')
    } else {
      const res = await changePassword(oldPassword, password)
      if (res?.status === 10108) {
        message.success(res.msg)
        handleCancel()
      }
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // 修改头像
  const clickChangeAvatar = async () => {
    if (!imageUrl) {
      message.info('请上传图片')
    } else {
      const res = await updateAvatar(imageUrl)
      console.log(res)
      if (res) {
        message.success('头像设置成功')
        setImageUrl('')
        getInfo()
        setAvatarVisible(false)
      } else {
        message.info('头像设置失败')
      }
    }
  }

  // 检查图片格式和大小
  const beforeUpload = (file: RcFile) => {
    const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/webp'
    if (!isPNG) {
      message.error(`${file.name} 图片只能位png、jpeg、jpg或webp格式`)
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片要小于2MB!')
    }
    return isPNG && isLt2M
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const getInfo = async () => {
    const id = localStorage.getItem('id')
    const role = localStorage.getItem('role')
    if (id && role) {
      const res = await personInfo()
      if (res?.status === 10010) {
        setInfo(res.data)
      }
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <div className={style.back}>
      <div className={style.info_box}>
        <span className={style.title}>个人信息</span>
        <div className={style.person_bpx}>
          <div className={style.avatar} onClick={() => setAvatarVisible(true)}>
            <img src={info?.avatar ? info.avatar : basicAvatar} className={style.avatarIcon}></img>
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
        open={isModalOpen}
        onCancel={() => { form.resetFields(); setIsModalOpen(false) }}
        footer={null}
      >
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
              { pattern: /^[a-zA-Z0-9]{6,16}$/, message: '6-16位，字母或数字组合' }
            ]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[
              { required: true, message: '请输入新密码' },
              { pattern: /^[a-zA-Z0-9]{6,16}$/, message: '6-16位，字母或数字组合' }
            ]}
          >
            <Input type="password" placeholder='6-16位，字母或数字组合' />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true, message: '请再次输入密码' },
              { pattern: /^[a-zA-Z0-9]{6,16}$/, message: '6-16位，字母或数字组合' }
            ]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit" >
                确认修改
              </Button>
              <Button htmlType="button" onClick={() => handleCancel()}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="上传新头像"
        open={avatarVisible}
        onOk={clickChangeAvatar}
        cancelText='取消'
        okText='确定'
        onCancel={() => { setAvatarVisible(false); setImageUrl('') }}
        destroyOnClose
      ><div className={style.bigBox}>
          <div className={style.init_box}>
            <img src={info?.avatar ? info.avatar : basicAvatar} className={style.init_img}></img>
          </div>
          <div className={style.upload_box}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
              customRequest={(option) => {
                const before = beforeUpload(option.file as RcFile)
                if (before) {
                  const reader = new FileReader()
                  reader.readAsDataURL(option.file as RcFile)
                  reader.onloadend = function (e) {
                    setImageUrl(e.target!.result as string)
                    setLoading(false)
                  }
                } else {
                  setLoading(false)
                }
              }}
            >
              <div>{imageUrl ? <img src={imageUrl} style={{ width: '100%' }} /> : uploadButton}</div>
            </Upload>
          </div>
        </div>
      </Modal>
    </div>
  )
}
