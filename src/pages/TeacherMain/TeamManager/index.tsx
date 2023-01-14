import { Input, Modal, Pagination } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import addIcon from '../../../assets/imgs/add.svg'

interface IData {
  name: string
  id: number
  userId: string
  email: string
  tel: number
  resume: string
}

const data: IData = {
  name: '陈典',
  id: 1,
  userId: '0121903490226',
  email: '1262877491qq.com',
  tel: 13419592292,
  resume: 'ssssdfsfrfsfsf'
}
export default function TeamManager () {
  const navigator = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div className={style.back}>
      <div className={style.main}>
        <div className={style.personItem} onClick={() => setIsModalOpen(true)}>
          <div className={style.box}>
            <img src={addIcon} className={style.addIcon}></img>
          </div>
        </div>
        <div className={style.personItem} onClick={() => navigator('/teacher/teammateInfo', {
          replace: false,
          state: data
        })}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
        <div className={style.personItem}>
          <div className={style.avatar}></div>
          <span className={style.name}>陈典</span>
          <span className={style.id}>0121903490226</span>
        </div>
      </div>
      <div className={style.pagination}>
        <Pagination defaultCurrent={1} total={50} className={style.pagination} />
      </div>
      <Modal
        title="添加成员"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确定添加'
        cancelText='取消'
      >
        <p>请输入该成员学号</p>
        <Input placeholder='请输入学号' style={{ width: '90%' }}></Input>
        <p className={style.remind_text}>提醒成员初始密码为学号后六位</p>
      </Modal>
    </div>
  )
}
