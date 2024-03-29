import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import leftIcon from '../../../assets/imgs/arrow-double-left.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { message, Image } from 'antd'
import { getStu } from '../../../api/teacherApi/teacher'
import { IStu } from '../../../libs/model'
import dayjs from 'dayjs'

export default function TeammateInfo () {
  const params = useParams()
  const [user, setUser] = useState<IStu>()
  const navigator = useNavigate()

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
        </div>
        <div className={style.person_bpx}>
          <div className={style.avatar}>
            <Image
            src={user?.avatar ? user.avatar : ''}
            width={150}
            ></Image>
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
    </div>
  )
}
