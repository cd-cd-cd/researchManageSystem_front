import { Tag } from 'antd'
import dayjs from 'dayjs'

import React from 'react'
import useFile from '../../../hooks/useFile'
import { IMeetingInfo, IMeetingState } from '../../../libs/model'
import style from './index.module.scss'
interface Props {
  info: IMeetingInfo
}
export default function Meet ({ info }: Props) {
  const { decode } = useFile()

  const returnTag = (status: IMeetingState) => {
    switch (status) {
      case -1:
        return <Tag color='#108ee9'>已结束</Tag>
      case 0:
        return <Tag color='#2db7f5'>进行中</Tag>
      case 1:
        return <Tag color='#87d068'>未开始</Tag>
    }
  }

  const returnParticipants = () => {
    const arr = info.records.map(record => {
      return record.participant.name
    })
    return arr.map((item, index) => <Tag key={index} style={{ marginBottom: '5px' }}>{item}</Tag>)
  }
  return (
    <div className={style.box}>
      <div className={style.header}>
        {returnTag(info.meetState)}
        <span className={style.title}>{info.title}</span>
      </div>
      <div className={style.main}>
        <div className={style.row}>
          <div className={style.label}>发起人：</div>
          <Tag>{info.sponsor.name}</Tag>
        </div>
        <div className={style.row}>
          <div className={style.label} style={{ marginBottom: '-5px' }}>参会人:</div>
          {returnParticipants()}
        </div>
        <div className={style.row}>
          <div className={style.label}>地点：</div>
          <div>{info.address}</div>
        </div>
        <div className={style.row}>
          <div className={style.label}>时间：</div>
          <div>{`${dayjs(info.startTime).format('YYYY-MM-DD HH:mm')} --- ${dayjs(info.endTime).format('YYYY-MM-DD HH:mm')}`}</div>
        </div>
        {
          info.briefContent
            ? <div className={style.row}>
              <div className={style.label}>简要：</div>
              <div>{info.briefContent}</div>
            </div>
            : ''
        }
        {
          info.materials
            ? <div className={style.row}>
              <div className={style.label}>文件：</div>
              <div className={style.a_box}>
                {
                  info.materials.split(';')
                    .map((url, index) =>
                      <a href={url} key={index}>{decode(url, 'http://seach-chendian.oss-cn-hangzhou.aliyuncs.com/meetings/')}
                      </a>)
                }
              </div>
            </div>
            : null
        }
      </div>
    </div>
  )
}
