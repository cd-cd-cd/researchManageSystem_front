import { Menu, MenuProps, Modal, Tooltip } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
import style from './index.module.scss'
import existIcon from '../../assets/imgs/exist.svg'
import headerIcon from '../../assets/imgs/science_icon.svg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TabBar from '../../components/TabBar'
import useTabBar from '../../hooks/useTabBar'
import { context } from '../../hooks/store'
import { studentFunc } from '../../libs/data'

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
  const { setTabBarId, tabBarId } = useContext(context)
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

  const role = location.pathname.split('/')[1]

  // 根据tabBarId增加

  const onClick: MenuProps['onClick'] = e => {
    // setTabBarId(Number(e.key))
    const index = Number(e.key)
    if (role === 'student') {
      addTabBar(studentFunc[index])
      setTabBarId(studentFunc[index].value)
    }
  }

  useEffect(() => {
    addTabBar(studentFunc[0])
  }, [])

  useEffect(() => {
    const path = studentFunc[tabBarId]
    if (path !== undefined) {
      navigator(`/student/${path.name}`)
    }
  }, [tabBarId])

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
            selectedKeys={[tabBarId.toString()]}
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
