import { Button, Form, Input, message, Modal, Radio, Select } from 'antd'
import style from './index.module.scss'
import React, { useState } from 'react'
import { IRole } from '../../../libs/model'
import StudentTable from './StudentTable'
import TeacherTable from './TeacherTable'
import { useForm } from 'antd/lib/form/Form'
import { createStudent, createTeacher, getTeacher } from '../../../api/managerApi/info'

interface IOption {
  label: string
  value: string
}
export default function UserControl () {
  const [isOpen, setIsOpen] = useState(false)
  const [form] = useForm()
  const [role, setRole] = useState<IRole>(1)
  const [modalRole, setModalRole] = useState<IRole | undefined>(1)
  const [teacherOption, setTeacherOption] = useState<IOption[]>()
  const [isStu, setIsStu] = useState(false)
  const [isTea, setIsTea] = useState(false)
  const handleChange = (value: IRole) => {
    setRole(value)
  }

  const closeModal = () => {
    setModalRole(undefined)
    form.resetFields()
    setIsOpen(false)
  }

  const openModal = async () => {
    setIsOpen(true)
    const res = await getTeacher()
    if (res?.success) {
      setTeacherOption(res.data.reduce((pre: IOption[], cur) => {
        pre.push({
          label: cur.name,
          value: cur.id
        })
        return pre
      }, []))
    }
  }

  const createUser = (values: any) => {
    if (values.role === 0) {
      postStu(values.username, values.name, values.teacher)
    } else {
      postTea(values.username, values.name)
    }
  }

  // 创建成功
  const successAction = (msg: string) => {
    message.success(msg)
    closeModal()
  }

  // 创建学生
  const postStu = async (username: string, name: string, teacherId: string) => {
    const res = await createStudent(username, name, teacherId)
    if (res?.success) {
      setIsStu(!isStu)
      successAction(res.msg)
    } else {
      message.info(res?.msg)
    }
  }

  // 创建老师
  const postTea = async (username: string, name: string) => {
    const res = await createTeacher(username, name)
    if (res?.success) {
      setIsTea(!isTea)
      successAction(res.msg)
    } else {
      message.info(res?.msg)
    }
  }

  const renderTable = () => {
    return role === 0
      ? <StudentTable isStu={isStu}></StudentTable>
      : <TeacherTable isTea={isTea}></TeacherTable>
  }

  return (
    <div className={style.back}>
      <div className={style.btn_box}>
        <Select
          defaultValue={1}
          className={style.select}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: 1,
              label: '老师'
            },
            {
              value: 0,
              label: '学生'
            }
          ]}
        />
        <Button className={style.btn_right} onClick={() => openModal()}>创建新用户</Button>
      </div>
      {
        renderTable()
      }
      <Modal
        title="创建新用户"
        open={isOpen}
        footer={null}
        onCancel={() => closeModal()}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          form={form}
          onFinish={createUser}
        >
          <Form.Item
            name='role'
            label='角色'
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Radio.Group onChange={(e) => setModalRole(e.target.value)}>
              <Radio value={0}>学生</Radio>
              <Radio value={1}>老师</Radio>
            </Radio.Group>
          </Form.Item>
          {
            modalRole === 0
              ? <Form.Item
                rules={[{ required: true, message: '请选择导师' }]}
                name='teacher'
                label="导师"
              >
                <Select
                  options={teacherOption}
                ></Select>
              </Form.Item>
              : ''
          }
          <Form.Item
            name='username'
            label='学号'
            rules={[{ required: true, message: '请输入学号' },
              { pattern: /^[0-9]+.?[0-9]*$/, message: '学号不合法' },
              { max: 20, message: '学号长度20以内' }
            ]}
          >
            <Input placeholder='请输入学号'></Input>
          </Form.Item>
          <p className={style.remind_text}>提醒用户初始密码为学号后六位</p>
          <Form.Item
            name='name'
            label='姓名'
            rules={[
              { required: true, message: '请输入姓名' },
              { max: 20, message: '姓名长度20以内' },
              { pattern: /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/, message: '姓名不合法' }
            ]}
          >
            <Input placeholder='请输入姓名'></Input>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_boxs}>
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
