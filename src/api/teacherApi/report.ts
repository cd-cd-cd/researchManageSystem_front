import { IFirstComment, ITeacherReport } from '../../libs/model'
import request from '../../utils/request'

interface IGetReportInfo {
  total: number
  pageNum: number
  pageSize: number
  reports: ITeacherReport[]
}

// 得到周报信息
export const getReportInfo = async (pageNum: number, pageSize: number, isReview: boolean) => {
  return await request<IGetReportInfo>({
    url: '/teacher/report/infos',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      isReview
    }
  })
}

// 查看周报
export const reviewReport = async (id: string) => {
  return await request({
    url: '/teacher/report/review',
    method: 'PUT',
    data: {
      id
    }
  })
}

// 评论周报
export const commentPost = async (reportId: string, stuId: string, commentContent: string) => {
  return await request({
    url: '/teacher/report/comment',
    method: 'POST',
    data: {
      reportId,
      stuId,
      commentContent
    }
  })
}

// 得到某个周报一级评论
export const getFirstComments = async (reportId: string) => {
  return await request<IFirstComment[]>({
    url: '/teacher/report/firstComment',
    method: 'GET',
    params: {
      reportId
    }
  })
}
