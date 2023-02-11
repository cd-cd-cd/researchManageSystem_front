import { Input } from 'antd'
import React, { useState } from 'react'
import circleIcon from '../../../../assets/imgs/circle.png'
import addIcon from '../../../../assets/imgs/text_add.png'
import { IPart } from '../../../../libs/model'
import deleteIcon from '../../../../assets/imgs/delete.png'
import style from './index.module.scss'
import useReport from '../../../../hooks/useReport'
interface Props {
  type: 'progress' | 'plan' | 'teamService'
  index: number
  reportPart: IPart
  focusId?: string
}
export default function Plate ({ index, reportPart, type, focusId }: Props) {
  const { deletePoint, addText, deleteText, changeTitle, changeText } = useReport()
  // title
  const [warnText, setWarnText] = useState<string>()
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

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (title.trim().length <= 50) {
      setWarnText('')
      changeTitle(reportPart.id, title.trim())
    } else {
      setWarnText('标题少于50字')
    }
  }
  return (
    <>
      <div className={style.headTwo}>
        {
          (index !== 0 || type === 'teamService') && focusId === reportPart.id ? <img src={deleteIcon} className={style.deleteIcon} onClick={() => deletePoint(reportPart.id)}></img> : ''
        }
        <span>{returnTitle()}</span>
        <Input
          bordered={false}
          placeholder='填写标题'
          onChange={(e) => setTitle(e)}
          value={reportPart.title}
          className={style.inputTitle}
        >
        </Input>
      </div>
      <div className={style.warn}>{warnText}</div>
      <div className={style.partThree}>
        {
          reportPart.point.map((point, pointIndex) =>
            <div key={point.id} className={style.headThree}>
              <div>{`${++pointIndex}. ${point.title}`}</div>
              <div className={style.textLine_box}>
                {
                  point.text.map((text, textIndex) =>
                    <div key={text.id} className={style.lineText}>
                      <img className={style.icon} src={circleIcon}></img>
                      <Input.TextArea
                        autoSize
                        bordered={false}
                        placeholder={`内容${++textIndex}`}
                        className={style.lineInput}
                        onChange={(e) => changeText(reportPart.id, point.id, text.id, e.target.value)}
                      ></Input.TextArea>
                      {
                        textIndex !== 1
                          ? <img onClick={() => deleteText(reportPart.id, point.id, text.id)} className={style.icon_text} src={deleteIcon}></img>
                          : ''
                      }
                    </div>
                  )
                }
                <img className={style.iconAdd} onClick={() => addText(reportPart.id, point.id)} src={addIcon}></img>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
