import { Button, DatePicker } from 'antd'
import React, { useState } from 'react'
import 'moment/locale/zh-cn'
import style from './index.module.scss'
import useReport from '../../../hooks/useReport'
import addIcon from '../../../assets/imgs/add.png'
import Plate from './Plate'
export default function WeekReport () {
  const [focusId, setFocusId] = useState<string>()
  const { addPoint, report } = useReport()
  return (
    <div className={style.box}>
      <div className={style.main}>
        <div className={style.title}>周报</div>
        <div className={style.date}>
          <DatePicker.RangePicker picker="week" />
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>一、本周进展</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'progress').map((item, index) =>
                <div
                  key={item.id}
                  className={focusId === item.id ? style.plate_box_focus : style.plate_box}
                  onClick={() => setFocusId(item.id)}
                >
                  <Plate type='progress' index={index} reportPart={item}></Plate>
                </div>
              )
            }
            <img src={addIcon} className={style.addIcon} onClick={() => addPoint('progress')}></img>
          </div>
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>二、下周计划</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'plan').map((item, index) =>
                <div
                  key={item.id}
                  className={focusId === item.id ? style.plate_box_focus : style.plate_box}
                  onClick={() => setFocusId(item.id)}
                >
                  <Plate type='plan' index={index} reportPart={item}></Plate>
                </div>
              )
            }
          </div>
          <img src={addIcon} className={style.addIcon} onClick={() => addPoint('plan')}></img>
        </div>
        {
          report.filter(item => item.type === 'teamService').length
            ? <div className={style.partOne}>
              <div className={style.partTwo}>
                <div className={style.headOne}>三、团队服务</div>
                {
                  report.filter(item => item.type === 'teamService').map((item, index) =>
                    <div
                      key={item.id}
                      className={focusId === item.id ? style.plate_box_focus : style.plate_box}
                      onClick={() => setFocusId(item.id)}
                    >
                      <Plate type='teamService' index={index} reportPart={item}></Plate>
                    </div>
                  )
                }
              </div>
              <img src={addIcon} className={style.addIcon} onClick={() => addPoint('teamService')}></img>
            </div>
            : <div className={style.headOne} style={{ color: 'gray', cursor: 'pointer' }} onClick={() => addPoint('teamService')}>增加团队服务</div>
        }
      </div>
      <div className={style.btn_box}>
        <Button type='primary'>预览</Button>
        <Button>上传</Button>
      </div>
      <div className={style.right_box}>
        <Button type='primary' className={style.btn}>历史周报</Button>
      </div>
    </div>
  )
}
