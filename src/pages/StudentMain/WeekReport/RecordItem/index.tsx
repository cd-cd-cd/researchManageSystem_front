import { Button } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { IHistoryReport } from '../../../../libs/model'
import Mask from '../Mask'
import style from './index.module.scss'
interface Props {
  report: IHistoryReport
}
export default function RecordItem ({ report }: Props) {
  const [isMask, setIsMask] = useState<boolean>(false)
  return (
    <div className={style.back}>
      <div>
        <div>{`${dayjs(report.startTime).format('YYYY-MM-DD')} --- ${dayjs(report.endTime).format('YYYY-MM-DD')} 周报`}</div>
        <div className={style.time}>创建时间：{dayjs(report.createdTime).format('YYYY-MM-DD HH:MM')}</div>
      </div>
      <Button
        type='default'
        onClick={() => setIsMask(true)}
      >周报详情</Button>
      {
        isMask
          ? <Mask
            close={() => setIsMask(false)}
            time={[report.startTime, report.endTime]}
            report={report.text}
          ></Mask>
          : ''
      }
    </div>
  )
}
