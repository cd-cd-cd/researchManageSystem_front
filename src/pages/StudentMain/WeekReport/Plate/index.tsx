import { Input } from 'antd'
import React from 'react'
import circleIcon from '../../../../assets/imgs/circle.png'
import { IPart } from '../../../../libs/model'
import style from './index.module.scss'
interface Props {
  type: 'progress' | 'plan' | 'teamService'
  index: number
  reportPart: IPart
}
export default function Plate ({ index, reportPart, type }: Props) {
  const returnTitle = () => {
    switch (type) {
      case 'progress':
        return `[进展${index + 1}]`
      case 'plan':
        return `[计划${index + 1}]`
      case 'teamService':
        return `[团队服务${index + 1}]`
    }
  }
  return (
    <>
      <div className={style.headTwo}>
        <span>{returnTitle()}</span>
        <Input bordered={false} placeholder='填写标题' className={style.inputTitle}>
        </Input>
      </div>
      <div className={style.partThree}>
        {
          reportPart.point.map((point, pointIndex) =>
            <div key={point.id} className={style.headThree}>
              <div>{`${++pointIndex}. ${point.title}`}</div>
              <div className={style.textLine_box}>
                {
                  point.text.map((text, textIndex) => <div key={text.id} className={style.lineText}>
                    <img className={style.icon} src={circleIcon}></img>
                    <Input bordered={false} placeholder={`内容${++textIndex}`} className={style.lineInput}></Input>
                  </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
