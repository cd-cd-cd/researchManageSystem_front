import { Button, Drawer } from 'antd'
import React, { useState } from 'react'
import { getPatent } from '../../../api/studentApi/production'
import { NavItem } from '../../../libs/data'
import { IPatent } from '../../../libs/model'
import Copyright from './Content/Copyright'
import Patent from './Content/Patent'
import PatentTable from './Content/Tables/PatentTable'
import Thesis from './Content/Thesis'
import Winning from './Content/Winning'
import style from './index.module.scss'
import Nav from './Nav'

export default function Production () {
  const [clickNav, setClickNav] = useState(NavItem[0])
  const [patentData, setPatentData] = useState<IPatent[]>()
  const [open, setOpen] = useState(false)

  const ContentMain = () => {
    switch (clickNav.value) {
      case 'patent':
        return <Patent />
      case 'thesis':
        return <Thesis />
      case 'copyright':
        return <Copyright />
      case 'winning':
        return <Winning />
      default:
        return null
    }
  }

  const renderTitle = () => {
    switch (clickNav.value) {
      case 'patent':
        return '专利'
      case 'thesis':
        return '论文'
      case 'copyright':
        return '著作权'
      case 'winning':
        return '获奖'
      default:
        return null
    }
  }

  // 得到专利历史记录
  const getPatentInfo = async () => {
    const res = await getPatent()
    if (res?.success) {
      setPatentData(res.data)
    }
  }

  // 展开抽屉
  const showDrawer = () => {
    setOpen(true)
    if (clickNav.value === 'patent') {
      getPatentInfo()
    }
  }

  // 渲染历史记录里的table
  const renderTable = () => {
    switch (clickNav.value) {
      case 'patent':
        return <PatentTable getPatentInfo={getPatentInfo} patentData={patentData}></PatentTable>
    }
  }
  return (
    <div className={style.back}>
      <Nav NavItem={NavItem} setClickNav={setClickNav} clickNav={clickNav}></Nav>
      {
        ContentMain()
      }
      <Button className={style.btn} onClick={showDrawer}>申请历史</Button>
      <Drawer title={`申请记录 - ${renderTitle()}`} placement="right" width={1000} onClose={() => setOpen(false)} open={open}>
        {renderTable()}
      </Drawer>
    </div>
  )
}
