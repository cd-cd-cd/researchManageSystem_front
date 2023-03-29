import { Spin } from 'antd'
import React from 'react'
import style from './index.module.scss'

interface Props {
  loading: boolean
}
export default function ProductionMask ({ loading }: Props) {
  return (
    <div className={style.maskBack}>
      <Spin
      spinning={loading}
      ></Spin>
    </div>
  )
}
