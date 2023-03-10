import { IHistoryReport, ISecondComment } from '../../libs/model'
import request from '../../utils/request'

// 上传周报
export const createReport = async (time: string, text: string, startTime: Date, endTime: Date) => {
  return await request<string>({
    url: '/student/report/create',
    method: 'POST',
    data: {
      time,
      text,
      startTime,
      endTime
    }
  })
}

// 上传周报pdf
export const uploadPdf = async (id: string, material: FormData) => {
  return await request({
    url: '/student/report/pdf',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: material,
    params: {
      id
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

// 回复评论
export const replyComment = async (firstCommentId: string, replyUserId: string, comment: string) => {
  return await request({
    url: '/student/report/replyComment',
    method: 'POST',
    data: {
      firstCommentId,
      replyUserId,
      comment
    }
  })
}

// 得到二级评论
export const getSecondComments = async (firstCommentId: string) => {
  return await request<ISecondComment[]>({
    url: '/student/report/secondComment',
    method: 'GET',
    params: {
      firstCommentId
    }
  })
}
