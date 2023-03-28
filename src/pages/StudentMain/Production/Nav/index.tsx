import React, { useEffect, useState } from 'react'
import { IOption } from '../../../../libs/model'
import style from './index.module.scss'

interface Props {
  NavItem: IOption[]
  setClickNav: (item: IOption) => void
  clickNav: IOption
}
export default function Nav ({ NavItem, setClickNav, clickNav }: Props) {
  // 切换tab
  const changeTab = (item: IOption) => {
    setClickNav(item)
  }
  return (
    <div>
      {
        NavItem.map(item => <div
          className={clickNav.value === item.value ? style.blockItemClick : style.blockItem}
          key={item.value}
          onClick={() => changeTab(item)}
        >{item.label}</div>)
      }
    </div>
  )
}
