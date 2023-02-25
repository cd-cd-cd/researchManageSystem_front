import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import leftIcon from '../../../assets/imgs/arrow-double-left.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, message, Modal } from 'antd'
import { deleteStu, getStu } from '../../../api/teacherApi/teacher'
import { IStu } from '../../../libs/model'
import dayjs from 'dayjs'

export default function TeammateInfo () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const params = useParams()
  const [user, setUser] = useState<IStu>()
  const navigator = useNavigate()

  // 删除学生
  const deleteStudent = async () => {
    if (user?.id) {
      const res = await deleteStu(user?.id)
      message.success(res?.msg)
    }
  }
  const handleOk = () => {
    deleteStudent()
    setIsModalOpen(false)
  }

  const getStuDetail = async () => {
    const id = params.id
    if (id) {
      const res = await getStu(id)
      if (res?.status === 10011) {
        setUser(res.data)
      } else if (res?.status === 10012) {
        message.info(res.msg)
      }
    }
  }
  useEffect(() => {
    getStuDetail()
  }, [])
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
            <img src={user?.avatar ? user.avatar : ''} className={style.avatar_style}></img>
          </div>
          <div className={style.info}>
            <span>姓名:</span><span>{user?.name}</span>
            <span>学号：</span><span>{user?.username}</span>
            <span>联系电话：</span>
            {
              user?.phoneNumber
                ? <div className={style.changeInfo}> {user?.phoneNumber}</div>
                : <div className={style.null_text}>暂时无联系电话</div>
            }
            <span>邮箱：</span>
            {
              user?.email
                ? <div className={style.changeInfo}>{user?.email}</div>
                : <div className={style.null_text}>暂时无邮箱信息</div>
            }
            <span>个人简介：</span>
            {
              user?.resume
                ? <div className={style.resume_text}>{user?.resume}</div>
                : <div className={style.null_text}>暂时无个人信息</div>
            }
          </div>
        </div>
        <div className={style.time_text}>创建时间：{dayjs(user?.createdTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
      <Modal title="确定删除成员"
        open={isModalOpen}
        onOk={handleOk}
        okText='确定'
        cancelText='取消'
        onCancel={() => setIsModalOpen(false)}>
        您确定要删除{user?.name}同学吗
      </Modal>
    </div>
  )
}
