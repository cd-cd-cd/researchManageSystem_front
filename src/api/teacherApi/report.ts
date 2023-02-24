import { ITeacherReport } from '../../libs/model'
import request from '../../utils/request'

interface IGetReportInfo {
  total: number
  pageNum: number
  pageSize: number
  reports: ITeacherReport[]
}
export const getReportInfo = async (pageNum: number, pageSize: number) => {
  return await request<IGetReportInfo>({
    url: '/teacher/report/infos',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}
