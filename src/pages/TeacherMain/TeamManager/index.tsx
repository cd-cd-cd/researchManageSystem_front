import { Button, Form, Input, message, Modal, Pagination, PaginationProps } from 'antd'
import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import addIcon from '../../../assets/imgs/add.svg'
import { useForm } from 'antd/es/form/Form'
import { createStu, getStuList } from '../../../api/teacher'
import { IStu } from '../../../libs/model'
import { useNavigate } from 'react-router-dom'

// interface IData {
//   name: string
//   id: number
//   userId: string
//   email: string
//   tel: number
//   resume: string
// }

export default function TeamManager () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(10)
  const [lists, setLists] = useState<IStu[]>([])
  const [form] = useForm()

  const createStuFunc = async (username: string, name: string) => {
    const res = await createStu(username, name)
    if (res?.status === 10004) {
      message.success(res.msg)
      setIsModalOpen(false)
      form.resetFields()
    } else if (res?.status === 10005) {
      message.info(res.msg)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const onFinish = (values: any) => {
    createStuFunc(values.username, values.name)
  }

  const getList = async () => {
    const res = await getStuList(current, 10)
    if (res?.status === 10100) {
      setTotal(res.data.total)
      setLists(res.data.list)
    }
  }

  const onChange: PaginationProps['onChange'] = page => {
    setCurrent(page)
  }

  const navigator = useNavigate()
  useEffect(() => {
    getList()
  }, [current])
  return (
    <div className={style.back}>
      <div className={style.main}>
        <>
          <div className={style.personItem} onClick={() => setIsModalOpen(true)}>
            <div className={style.box}>
              <img src={addIcon} className={style.addIcon}></img>
            </div>
          </div>
          {
            lists.map((item) =>
              <div key={item.id} className={style.personItem} onClick={() => navigator(`/teacher/teammateInfo/${item.id}`)}>
                <div className={style.avatar}></div>
                <span className={style.name}>{item.name}</span>
                <span className={style.id}>{item.username}</span>
              </div>
            )
          }
        </>
      </div>
      <div className={style.pagination}>
        <Pagination defaultCurrent={current} total={total} onChange={onChange} className={style.pagination} />
      </div>
      <Modal
        title="添加成员"
        open={isModalOpen}
        footer={null}
      >
        <Form
          form={form}
          name='createStu'
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            label='成员学号'
            rules={[{ required: true, message: '请输入学号' },
              { pattern: /^[0-9]+.?[0-9]*$/, message: '学号不合法' },
              { max: 20, message: '学号长度20以内' }
            ]}
          >
            <Input placeholder='请输入学号'></Input>
          </Form.Item>
          <p className={style.remind_text}>提醒成员初始密码为学号后六位</p>
          <Form.Item
            name='name'
            label='成员姓名'
            rules={[
              { required: true, message: '请输入姓名' },
              { max: 20, message: '姓名长度20以内' },
              { pattern: /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/, message: '姓名不合法' }
            ]}
          >
            <Input placeholder='请输入姓名'></Input>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit">
                确认添加
              </Button>
              <Button htmlType="button" onClick={() => handleCancel()}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
