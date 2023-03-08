import { Button, DatePicker, Radio, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { excelFunc, getStu } from '../../../api/teacherApi/dataManage'
import { Moment } from 'moment'
import useDataManage from '../../../hooks/useDataManage'
import { StuModuleOption, TeaModuleOption } from '../../../libs/data'
import { IOption, IRole, IStudentModule, ITeacherModule } from '../../../libs/model'
import style from './index.module.scss'

type RangeValue = [Moment | null, Moment | null] | null

interface IInfo {
  role: IRole
  module: ITeacherModule | IStudentModule
  time: RangeValue
  studentId: string
}
export default function TDataManage () {
  const { checkItem, createExcelName } = useDataManage()
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<IInfo>({
    role: 1,
    module: 'meeting',
    time: [null, null],
    studentId: ''
  })
  const [studentName, setStudentName] = useState('')

  const [stuList, setStuList] = useState<IOption[]>()
  const getStuList = async () => {
    const res = await getStu()
    if (res?.success) {
      setStuList(res.data.reduce((pre: IOption[], cur) => {
        pre.push({
          value: cur.id,
          label: cur.name
        })
        return pre
      }, []))
    }
  }

  const exportExcel = async () => {
    if (checkItem(info.role, info.module, info.time, info.studentId)) {
      const startTime = (info.time)![0]!.toDate()
      const endTime = (info.time)![1]!.toDate()
      startTime.setHours(0, 0, 0)
      endTime.setHours(24, 0, 0)
      setLoading(true)
      const res = await excelFunc(
        info.role,
        info.module,
        startTime,
        endTime,
        info.studentId)
      if (res) {
        const enc = new TextDecoder('utf-8')
        const uint8Msg = new Uint8Array(res as unknown as ArrayBufferLike)
        const realRes = JSON.parse(enc.decode(uint8Msg))
        const blob = new Blob([new Uint8Array(realRes.data.data)], { type: 'application/vnd.ms-excel' })
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = createExcelName(info.role, info.module, [startTime, endTime], studentName)
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    getStuList()
  }, [])
  return (
    <div>
      <div className={style.box}>
        {
          loading
            ? <div className={style.mask}>
              <Spin spinning={loading} />
            </div>
            : ''
        }
        <div className={style.item}>
          <span className={style.label}>角色：</span>
          <Radio.Group onChange={e => { setInfo({ ...info, role: e.target.value, time: [null, null], studentId: '' }); setStudentName('') }} value={info.role}>
            <Radio value={1}>老师(自己)</Radio>
            <Radio value={0}>学生</Radio>
          </Radio.Group>
        </div>
        {
          info.role === 0
            ? <div className={style.item}>
              <span className={style.label}>用户：</span>
              <Select
                value={info.studentId}
                onChange={(e, option) => { setInfo({ ...info, studentId: e }); setStudentName((option as IOption).label) }}
                options={stuList}
                style={{ width: 180 }}
              />
            </div>
            : null
        }
        <div className={style.item}>
          <span className={style.label}>模块：</span>
          <Select
            value={info.module}
            onChange={e => setInfo({ ...info, module: e })}
            style={{ width: 180 }}
            options={info.role === 1 ? TeaModuleOption : StuModuleOption}
          ></Select>
        </div>
        <div className={style.item}>
          <span className={style.label}>时间范围：</span>
          <DatePicker.RangePicker
            onChange={e => setInfo({ ...info, time: e })}
            value={info.time}
          ></DatePicker.RangePicker>
        </div>
        <Button className={style.btn} onClick={() => exportExcel()}>输出EXCEL</Button>
      </div>
    </div>
  )
}
