import { IHistoryReport, ISecondComment } from '../../libs/model'
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
