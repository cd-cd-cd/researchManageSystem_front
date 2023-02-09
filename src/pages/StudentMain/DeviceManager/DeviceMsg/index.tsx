import { Tag } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { ILoadInfo } from '../../../../libs/model'
import style from './index.module.scss'
interface Props {
  item: ILoadInfo
}
export default function DeviceMsg ({ item }: Props) {
  return (
    <div className={style.back}>
      <Tag color='green'>{`${item.serialNumber} - ${item.name}`}</Tag>
      <div className={style.info}>
        <div>{`位置： ${item.address}`}</div>
        <div>{`型号： ${item.version}`}</div>
        <div>{`性能指标： ${item.performanceIndex}`}</div>
        <div>{`主机备注： ${item.HostRemarks}`}</div>
        <div>{`申请期限： ${dayjs(item.startTime).format('YYYY-MM-DD')} --- ${dayjs(item.endTime).format('YYYY-MM-DD')}`}</div>
      </div>
    </div>
  )
}
