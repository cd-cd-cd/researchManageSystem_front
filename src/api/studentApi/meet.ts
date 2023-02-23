import { IMeetingInfo, IRole } from '../../libs/model'
import request from '../../utils/request'

interface resParticipant {
  id: string
  name: string
  role: IRole
}
export const getParticipants = async () => {
  return await request<resParticipant[]>({
    url: '/meet/participants',
    method: 'GET'
  })
}

// 创建会议
export const createMeet = async (
  title: string,
  briefContent: string,
  startTime: Date,
  endTime: Date,
  address: string,
  participants: string[]
) => {
  return await request<string>({
    url: '/meet/create',
    method: 'POST',
    data: {
      title,
      briefContent,
      startTime,
      endTime,
      address,
      participants
    }
  })
}

// 创建会议（上传资料）
export const postMaterial = async (
  material: FormData,
  num: number,
  id: string
) => {
  return await request({
    url: '/meet/material',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: material,
    params: {
      num,
      id
    }
  })
}

interface IResGetMeeting {
  pageNum: number
  pageSize: number
  total: number
  meetings: IMeetingInfo[]
}
// 得到会议
export const getMeeting = async (pageNum: number, pageSize: number) => {
  return await request<IResGetMeeting>({
    url: '/meet/get',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}
