import { Button, DatePicker, DatePickerProps, Drawer, message, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import 'moment/locale/zh-cn'
import style from './index.module.scss'
import useReport from '../../../hooks/useReport'
import addIcon from '../../../assets/imgs/add.png'
import Plate from './Plate'
import { context } from '../../../hooks/store'
import noInfoIcon from '../../../assets/imgs/noInfo.png'
import Mask from './Mask'
import { createReport, getReportRecord } from '../../../api/studentApi/report'
import RecordItem from './RecordItem'
import { IHistoryReport } from '../../../libs/model'
import moment from 'moment'
import usePdf from '../../../hooks/usePdf'
export default function WeekReport () {
  // Draw
  const [open, setOpen] = useState(false)
  const [focusId, setFocusId] = useState<string>()
  const [isMask, setIsMask] = useState<boolean>(false)
  const [time, setTime] = useState<string>()
  const [value, setValue] = useState()
  // 保存历史周报
  const [historyReport, setHistoryReport] = useState<IHistoryReport[]>()
  const { report } = useContext(context)
  const { addPoint, reset, checkReport } = useReport()
  // 输出pdf
  // pdf loading
  const { printPDF, uploadFile } = usePdf()

  const onChange: DatePickerProps['onChange'] = (
    values: any,
    dataString: string
  ) => {
    setTime(dataString)
    setValue(values)
  }

  // 预览
  const showMask = () => {
    setFocusId(undefined)
    const res = checkReport(time)
    if (res === true) {
      setIsMask(true)
    } else {
      if (res) {
        setFocusId(res)
      }
    }
  }

  const resetAll = () => {
    reset()
    setTime(undefined)
    setValue(undefined)
  }

  // 上传
  const uploadReport = async () => {
    const res = checkReport(time)
    if (res === true && time && value) {
      const newReport = JSON.stringify(report)
      const startDate = moment(value).day(1).toDate() // 周一日期
      const endDate = moment(value).day(7).toDate() // 周日日期
      const temp = await createReport(time, newReport, startDate, endDate)
      if (temp?.success) {
        resetAll()
        uploadFile('report', 'reset', '.add', temp.data, time + '周报')
      }
    }
  }

  // 导出pdf
  const exportPdf = () => {
    const res = checkReport(time)
    if (res === true && time && value) {
      message.loading({ content: '正在导出......', key: 'pdf' })
      printPDF('report', 'reset', '.add', time + '周报')
    }
  }

  // 得到周报记录
  const getRecords = async () => {
    setOpen(true)
    const res = await getReportRecord()
    setHistoryReport(res?.data)
  }
  return (
    <div className={style.box}>
      <div className={style.main} id='report'>
        <Button className={style.reset_btn} id='reset' onClick={() => resetAll()}>重置</Button>
        <div className={style.title}>周报</div>
        <div className={style.date} id='time'>
          <DatePicker onChange={onChange} value={value} picker="week" />
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>一、本周进展</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'progress').map((item, index) =>
                <div
                  id={item.id}
                  key={item.id}
                  className={focusId === item.id ? style.plate_box_focus : style.plate_box}
                  onClick={() => setFocusId(item.id)}
                >
                  <Plate type='progress' index={index} reportPart={item} focusId={focusId}></Plate>
                </div>
              )
            }
            <img src={addIcon} className={style.addIcon + ' ' + 'add'} onClick={() => addPoint('progress')}></img>
          </div>
        </div>
        <div className={style.partOne}>
          <div className={style.headOne}>二、下周计划</div>
          <div className={style.partTwo}>
            {
              report.filter(item => item.type === 'plan').map((item, index) =>
                <div
                  id={item.id}
                  key={item.id}
                  className={focusId === item.id ? style.plate_box_focus : style.plate_box}
                  onClick={() => setFocusId(item.id)}
                >
                  <Plate type='plan' index={index} reportPart={item} focusId={focusId}></Plate>
                </div>
              )
            }
          </div>
          <img src={addIcon} className={style.addIcon + ' ' + 'add'} onClick={() => addPoint('plan')}></img>
        </div>
        {
          report.filter(item => item.type === 'teamService').length
            ? <div className={style.partOne}>
              <div className={style.partTwo}>
                <div className={style.headOne}>三、团队服务</div>
                {
                  report.filter(item => item.type === 'teamService').map((item, index) =>
                    <div
                      id={item.id}
                      key={item.id}
                      className={focusId === item.id ? style.plate_box_focus : style.plate_box}
                      onClick={() => setFocusId(item.id)}
                    >
                      <Plate type='teamService' index={index} reportPart={item} focusId={focusId}></Plate>
                    </div>
                  )
                }
              </div>
              <img src={addIcon} className={style.addIcon + ' ' + 'add'} onClick={() => addPoint('teamService')}></img>
            </div>
            : <div className={style.headOne + ' ' + 'add'} style={{ color: 'gray', cursor: 'pointer' }} onClick={() => addPoint('teamService')}>增加团队服务</div>
        }
      </div>
      <div className={style.btn_box}>
        <Button type='primary' onClick={() => showMask()}>预览</Button>
        <Button onClick={() => uploadReport()}>上传</Button>
        <Button onClick={() => exportPdf()} style={{ position: 'relative' }}>导出pdf</Button>
      </div>
      <div className={style.right_box}>
        <Button type='primary' className={style.btn} onClick={() => getRecords()}>历史周报</Button>
      </div>
      <Drawer
        title="历史周报"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width='600px'
      >
        {
          historyReport?.length
            ? historyReport.map(report => <RecordItem key={report.id} report={report}></RecordItem>)
            : <img src={noInfoIcon} className={style.noInfoIcon}></img>
        }
      </Drawer>
      {
        isMask
          ? <Mask
            isCommentComponent={false}
            close={() => setIsMask(false)}
            time={time}
            report={report}
          ></Mask>
          : ''
      }
    </div>
  )
}
