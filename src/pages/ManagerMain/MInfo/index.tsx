import React, { useEffect, useState } from 'react'
import { getSelf, ISelf } from '../../../api/managerApi/info'
import style from './index.module.scss'

export default function MInfo () {
  const [info, setInfo] = useState<ISelf>()
  const getInfo = async () => {
    const res = await getSelf()
    if (res?.success) {
      setInfo(res.data)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div className={style.back}>
      <h3>{`欢迎登录！${info?.name}`}</h3>
      <h3>{`您的用户编号(用户名)为${info?.username}`}</h3>
    </div>
  )
}
