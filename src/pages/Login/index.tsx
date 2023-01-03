import React from 'react'
import style from './index.module.scss'
import headerIcon from '../../assets/imgs/science_icon.svg'

export default function Login () {
  return (
    <div className={style.login_part}>
      <header className={style.header}>
        <img src={headerIcon} className={style.icon}></img>
      </header>
      <main className={style.main}>
        <div className={style.login_box}>
        </div>
      </main>
      <footer className={style.footer}>科研团队管理系统 - Scientific research team management system - 2023</footer>
    </div>
  )
}
