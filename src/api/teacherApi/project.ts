import { IPagination, IProjectExist, IProjectState, IUser } from '../../libs/model'
import request from '../../utils/request'
export interface IGeTInfo {
  id: string
  title: string
  manager: IUser
  teacherManager: IUser
  teammate: IUser[]
  projectState: IProjectState
  projectExist: IProjectExist
  startTime: Date
  endTime: Date
}

interface IRes extends IPagination {
  res: IGeTInfo[]
}

export const getInfo = async (pageNum: number, pageSize: number, isAll: boolean) => {
  return await request<IRes>({
    url: '/teacher/project/getInfo',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      isAll
    }
  })
}

export const pass = async (id: string) => {
  return await request({
    url: '/teacher/project/pass',
    method: 'PUT',
    data: {
      id
    }
  })
}

export const fail = async (id: string) => {
  return await request({
    url: '/teacher/project/fail',
    method: 'PUT',
    data: {
      id
    }
  })
}

export const over = async (id: string) => {
  return await request({
    url: '/teacher/project/over',
    method: 'PUT',
    data: {
      id
    }
  })
}
