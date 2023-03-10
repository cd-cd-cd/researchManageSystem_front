import { Button, Form, Input, message, Modal, Pagination, PaginationProps } from 'antd'
import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import addIcon from '../../../assets/imgs/add.svg'
import { useForm } from 'antd/es/form/Form'
import { createStu, getStuList } from '../../../api/teacherApi/teacher'
import { IStu } from '../../../libs/model'
import { useNavigate } from 'react-router-dom'

export default function TeamManager () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(10)
  const [pageSize, setPageSize] = useState(9)
  const [lists, setLists] = useState<IStu[]>([])
  const [form] = useForm()

  const createStuFunc = async (username: string, name: string) => {
    const res = await createStu(username, name)
    if (res?.status === 10004) {
      message.success(res.msg)
      getList()
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
    const res = await getStuList(current, pageSize)
    if (res?.status === 10100) {
      setTotal(res.data.total)
      setLists(res.data.list)
    }
  }

  const onChange: PaginationProps['onChange'] = page => {
    if (page === 1) {
      setPageSize(9)
    } else {
      setPageSize(10)
    }
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
                <div className={style.avatar}>
                  <img src={item.avatar ? item.avatar : ''} className={style.avatar_img}></img>
                </div>
                <span className={style.name}>{item.name}</span>
                <span className={style.id}>{item.username}</span>
              </div>
            )
          }
        </>
      </div>
      <div className={style.pagination}>
        <Pagination
          defaultCurrent={current}
          total={total}
          onChange={onChange}
          className={style.pagination}
        />
      </div>
      <Modal
        title="????????????"
        open={isModalOpen}
        onCancel={() => handleCancel()}
        footer={null}
      >
        <Form
          form={form}
          name='createStu'
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            label='????????????'
            rules={[{ required: true, message: '???????????????' },
              { pattern: /^[0-9]+.?[0-9]*$/, message: '???????????????' },
              { max: 20, message: '????????????20??????' }
            ]}
          >
            <Input placeholder='???????????????'></Input>
          </Form.Item>
          <p className={style.remind_text}>??????????????????????????????????????????</p>
          <Form.Item
            name='name'
            label='????????????'
            rules={[
              { required: true, message: '???????????????' },
              { max: 20, message: '????????????20??????' },
              { pattern: /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/, message: '???????????????' }
            ]}
          >
            <Input placeholder='???????????????'></Input>
          </Form.Item>
          <Form.Item>
            <div className={style.btn_box}>
              <Button type="primary" htmlType="submit">
                ????????????
              </Button>
              <Button htmlType="button" onClick={() => handleCancel()}>
                ??????
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
