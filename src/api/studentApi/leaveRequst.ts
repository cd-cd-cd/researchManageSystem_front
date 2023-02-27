import { IRequestInfo } from '../../libs/model'
import request from '../../utils/request'

// 请假
export const postLeaveRequest = async (startTime: Date, endTime: Date, reason: string) => {
  return await request<string>({
    url: '/studetnt/leave/postLeaveReques',
    method: 'POST',
    data: {
      startTime,
      endTime,
      reason
    }
  })
}

// 请假（材料）
export const postLeaveMaterial = async (
  material: FormData,
  num: number,
  id: string) => {
  return await request({
    url: '/student/leave/material',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: material,
    params: {
      num,
      id
    }
  })
}

// 得到请假信息
export const getRequestInfos = async (pageNum: number, pageSize: number) => {
  return await request<IRequestInfo>({
    url: '/student/leave/getInfo',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}
