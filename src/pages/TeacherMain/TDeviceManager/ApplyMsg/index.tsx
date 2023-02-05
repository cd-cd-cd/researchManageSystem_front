import { Input, message, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { consentApply, refuseApply } from '../../../../api/teacherApi/device'
import { IApplyInfoSingle } from '../../../../libs/model'
import style from './index.module.scss'
interface Props {
  item: IApplyInfoSingle
  getDeviceList: () => {}
}
export default function ApplyMsg ({ item, getDeviceList }: Props) {
  const [refuseTag, setRefuseTag] = useState(false)
  // 记录理由
  const [text, setText] = useState('')
  // 提示
  const [warn, setWarn] = useState<string>()
  const clickRefuse = () => {
    setRefuseTag(true)
  }

  // 拒绝申请
  const refuse = async () => {
    if (text.trim().length <= 255) {
      setWarn('')
      const res = await refuseApply(item.id, text)
      if (res?.success) {
        getDeviceList()
        message.success(res.msg)
      }
    } else {
      setWarn('理由不超过255字')
    }
  }

  // 同意申请
  const consent = async () => {
    const res = await consentApply(
      item.equipmentId,
      item.startTime,
      item.endTime,
      item.studentId
    )
    if (res?.success) {
      getDeviceList()
      message.success(res.msg)
    }
  }
  return (
    <div className={style.applyInfo_box}>
      <div className={style.head}>
        <Tag color='green'>申请中</Tag>
        <div>111111111 - 哈哈</div>
        <Tag color='#108ee9' className={style.ok} onClick={() => consent()}>同意</Tag>
        <Tag color='#f50' className={style.refuse} onClick={() => clickRefuse()}>拒绝</Tag>
      </div>
      <div className={style.applyMain}>
        <span className={style.left}>{`申请设备: ${item.serialNumber} - ${item.equipment_name}`}</span>
        <span>{`申请期限：${dayjs(item.startTime).format('YYYY-MM-DD')} --- ${dayjs(item.endTime).format('YYYY-MM-DD')}`}</span>
        <div className={style.reason_box}>{`申请理由：${item.apply_reason ? item.apply_reason : ''}`}</div>
      </div>
      {
        refuseTag
          ? <>
            <div className={style.refuse_box}>
              <Input.TextArea
                style={{ width: '500px' }}
                placeholder='拒绝理由'
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></Input.TextArea>
              <div className={style.box}>
                <a onClick={() => { setText(''); setRefuseTag(false); setWarn('') }}>取消</a>
                <a onClick={() => refuse()}>确定拒绝</a>
              </div>
            </div>
            <div className={style.warn}>{warn}</div>
          </>
          : ''
      }
      <div className={style.applyTime}>{dayjs(item.createdTime).format('YYYY-MM-DD')}</div>
    </div>
  )
}
