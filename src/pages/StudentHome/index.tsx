import { Menu, MenuProps, Modal, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import existIcon from '../../assets/imgs/exist.svg'
import headerIcon from '../../assets/imgs/science_icon.svg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TabBar from '../../components/TabBar'
import useTabBar from '../../hooks/useTabBar'

type MenuItem = Required<MenuProps>['items'][number]

function getItem (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  theme?: 'light' | 'dark'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    theme
  } as MenuItem
}

export default function StudentHome () {
  const location = useLocation()
  const navigator = useNavigate()
  const { addTabBar } = useTabBar()
  // 退出modal提醒
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 根据路由显示header
  const headerText = () => {
    switch (location.pathname) {
      case 'student':
        return '-学生端'
      case 'teacher':
        return '-老师端'
      case 'manager':
        return '-管理员端'
      default:
        return null
    }
  }

  const studentFunc = [
    { label: '个人信息', value: 'personInfo' },
    { label: '设备管理', value: 'deviceManager' },
    { label: '组会管理', value: 'groupManage' },
    { label: '周报管理', value: 'weekReport' },
    { label: '经费报销', value: 'reimbursement' },
    { label: '请假管理', value: 'leaveRequest' }
  ]

  const [current, setCurrent] = useState(studentFunc[0].value)
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    const role = location.pathname.split('/')[1]
    if (role === 'student') {
      switch (e.key) {
        case 'personInfo':
          navigator('/student/personInfo')
          addTabBar(studentFunc[0])
          return
        case 'deviceManager':
          navigator('/student/deviceManager')
          addTabBar(studentFunc[1])
          return
        case 'groupManage':
          navigator('/student/groupManage')
          addTabBar(studentFunc[2])
          return
        case 'weekReport':
          navigator('/student/weekReport')
          addTabBar(studentFunc[3])
          return
        case 'reimbursement':
          navigator('/student/reimbursement')
          addTabBar(studentFunc[4])
          return
        case 'leaveRequest':
          navigator('/student/leaveRequest')
          addTabBar(studentFunc[5])
          return null
      }
    }
  }

  useEffect(() => {
    addTabBar(studentFunc[0])
  }, [])

  const items: MenuItem[] = studentFunc
    .map(item => getItem(item.label, item.value))

  const showModal = () => { setIsModalOpen(true) }

  const handleCancel = () => { setIsModalOpen(false) }

  const handleOk = () => {
    setIsModalOpen(false)
    navigator('/login')
  }

  const info = <span style={{ color: '#333', cursor: 'pointer' }} onClick={showModal}>退出</span>

  return (
    <div className={style.home}>
      <header className={style.header}>
        <div className={style.header_left}>
          <img src={headerIcon} className={style.icon}></img>
          科研团队管理系统{headerText()}
        </div>
        <Tooltip
          title={info}
          color='#fff'
          >
          <img src={existIcon} className={style.existIcon} onClick={showModal}></img>
        </Tooltip>
      </header>
      <main className={style.main}>
        <aside className={style.aside}>
          <Menu
            onClick={onClick}
            style={{ width: 230 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="vertical"
            theme="light"
            items={items}
          />
        </aside>
        <div className={style.right}>
          <TabBar></TabBar>
          <Outlet/>
        </div>
      </main>
      <Modal title="确认退出" open={isModalOpen}
      onOk={handleOk} onCancel={handleCancel}
      cancelText={'取消'}
      okText={'确定'}
      >
        <p>您确定要退出吗？退出后未提交数据将清除</p>
      </Modal>
    </div>
  )
}
