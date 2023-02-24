import { IHistoryReport } from '../../libs/model'
import request from '../../utils/request'

// 上传周报
export const createReport = async (startTime: Date, endTime: Date, text: string) => {
  return await request<string>({
    url: '/student/report/create',
    method: 'POST',
    data: {
      startTime,
      endTime,
      text
    }
  })
}

// 得到周报历史
export const getReportRecord = async () => {
  return await request<IHistoryReport[]>({
    url: '/student/report/record',
    method: 'GET'
  })
}
