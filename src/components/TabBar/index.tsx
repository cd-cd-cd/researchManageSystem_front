import React, { useContext } from 'react'
import { context } from '../../hooks/store'
import style from './index.module.scss'
import deleteIcon from '../../assets/imgs/deleteIcon.svg'

export default function TabBar () {
  const { tabBarList } = useContext(context)
  return (
    <div className={style.btnBack}>
      {
        tabBarList.map(item =>
          <div key={item.value} className={style.button_click}>
          {item.label}
          <img src={deleteIcon} className={style.deleteIcon}></img>
        </div>)
      }
    </div>
  )
}
