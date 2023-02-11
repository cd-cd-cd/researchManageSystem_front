import React, { useContext } from 'react'
import style from './index.module.scss'
import deleteIcon from '../../../../assets/imgs/delete.png'
import circleIcon from '../../../../assets/imgs/circle.png'
import { context } from '../../../../hooks/store'
import dayjs from 'dayjs'
interface Props {
  close: () => void
  time: string[]
}
export default function Mask ({ close, time }: Props) {
  const { report } = useContext(context)

  const returnTitle = (type: 'progress' | 'plan' | 'teamService', index: number) => {
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
    <div className={style.mask_back}>
      <div className={style.main}>
        <div className={style.title}>周报</div>
        <div className={style.date} id='time'>
          {`${dayjs(time[0]).format('YYYY-MM-DD')} --- ${dayjs(time[1]).format('YYYY-MM-DD')}`}
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>一、本周进展</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'progress').map((item, index) =>
                <div
                  key={item.id}
                  className={style.plate_box}
                >
                  <div className={style.headTwo}>
                    <span>{returnTitle('progress', index)}</span>
                    <div className={style.inputTitle}>{item.title}</div>
                  </div>
                  <div className={style.partThree}>
                    {
                      item.point.map((point, pointIndex) =>
                        <div key={point.id} className={style.headThree}>
                          <div>{`${++pointIndex}. ${point.title}`}</div>
                          <div className={style.textLine_box}>
                            {
                              point.text.map((text) =>
                                <div key={text.id} className={style.lineText}>
                                  <img className={style.icon} src={circleIcon}></img>
                                  <div className={style.lineInput}>{text.content}</div>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>二、下周计划</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'plan').map((item, index) =>
                <div
                  key={item.id}
                  className={style.plate_box}
                >
                  <div className={style.headTwo}>
                    <span>{returnTitle('plan', index)}</span>
                    <div className={style.inputTitle}>{item.title}</div>
                  </div>
                  <div className={style.partThree}>
                    {
                      item.point.map((point, pointIndex) =>
                        <div key={point.id} className={style.headThree}>
                          <div>{`${++pointIndex}. ${point.title}`}</div>
                          <div className={style.textLine_box}>
                            {
                              point.text.map((text) =>
                                <div key={text.id} className={style.lineText}>
                                  <img className={style.icon} src={circleIcon}></img>
                                  <div className={style.lineInput}>{text.content}</div>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
        {
          report.filter(item => item.type === 'teamService').length
            ? <div className={style.partOne}>
              <div className={style.headOne}>三、团队服务</div>
              <div className={style.partTwo}>
                {
                  report.filter(item => item.type === 'teamService').map((item, index) =>
                    <div
                      key={item.id}
                      className={style.plate_box}
                    >
                      <div className={style.headTwo}>
                        <span>{returnTitle('teamService', index)}</span>
                        <div className={style.inputTitle}>{item.title}</div>
                      </div>
                      <div className={style.partThree}>
                        {
                          item.point.map((point, pointIndex) =>
                            <div key={point.id} className={style.headThree}>
                              <div>{`${++pointIndex}. ${point.title}`}</div>
                              <div className={style.textLine_box}>
                                {
                                  point.text.map((text) =>
                                    <div key={text.id} className={style.lineText}>
                                      <img className={style.icon} src={circleIcon}></img>
                                      <div className={style.lineInput}>{text.content}</div>
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            : ''
        }
      </div>
      <div className={style.close_box} onClick={() => close()}>
        <img src={deleteIcon} className={style.deleteIcon}></img>
      </div>
    </div>
  )
}
