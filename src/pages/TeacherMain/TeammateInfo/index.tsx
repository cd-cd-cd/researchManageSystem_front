import React, { useState } from 'react'
import style from './index.module.scss'
import leftIcon from '../../../assets/imgs/arrow-double-left.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'

interface IData {
  name: string
  id: number
  userId: string
  email: string
  tel: number
  resume: string
}

export default function TeammateInfo () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigator = useNavigate()
  const data = useLocation().state as IData

  const handleOk = () => {
    setIsModalOpen(false)
  }
  return (
    <div>
      <img src={leftIcon} className={style.left} onClick={() => navigator(-1)}></img>
      <div className={style.info_box}>
        <div className={style.title}>
          <span>个人信息</span>
          <Button type='primary' danger onClick={() => setIsModalOpen(true)}>删除成员</Button>
        </div>
        <div className={style.person_bpx}>
          <div className={style.avatar}>
          </div>
          <div className={style.info}>
            <span>姓名:</span><span>{data.name}</span>
            <span>学号：</span><span>{data.userId}</span>
            <span>联系电话：</span>
            <div className={style.changeInfo}>
              {data.tel}
            </div>
            <span>邮箱：</span>
            <div className={style.changeInfo}>{data.email}</div>
            <span>个人简介：</span>
            <div className={style.resume_text}>{data.resume}
            </div>
          </div>
        </div></div>
      <Modal title="确定删除成员"
      open={isModalOpen}
      onOk={handleOk}
      okText='确定'
      cancelText='取消'
      onCancel={() => setIsModalOpen(false)}>
        您确定要删除{data.name}同学吗
      </Modal>
    </div>
  )
}
