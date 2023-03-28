import React, { useState } from 'react'
import { NavItem } from '../../../libs/data'
import Copyright from './Content/Copyright'
import Patent from './Content/Patent'
import Thesis from './Content/Thesis'
import Winning from './Content/Winning'
import style from './index.module.scss'
import Nav from './Nav'

export default function Production () {
  const [clickNav, setClickNav] = useState(NavItem[0])
  const ContentMain = () => {
    switch (clickNav.value) {
      case 'patent':
        return <Patent/>
      case 'thesis':
        return <Thesis/>
      case 'copyright':
        return <Copyright/>
      case 'winning':
        return <Winning/>
      default:
        return null
    }
  }
  return (
    <div className={style.back}>
      <Nav NavItem={NavItem} setClickNav={setClickNav} clickNav={clickNav}></Nav>
      {
        ContentMain()
      }
    </div>
  )
}
