import { IOption, IProgress, IProjectExist, IProjectState, IUser } from '../../libs/model'
import request from '../../utils/request'

export interface IResGetSelf {
  username: string
  name: string
}

export const getSelf = async () => {
  return await request<IResGetSelf>({
    url: '/student/project/getSelf',
    method: 'GET'
  })
}

// 得到组内成员信息
export const getStuInfos = async () => {
  return await request<IOption[]>({
    url: '/student/project/stuInfo',
    method: 'GET'
  })
}

// 创建
export const projectCreate = async (
  title: string,
  teammate: string,
  startTime: Date,
  endTime: Date
) => {
  return await request({
    url: '/student/project/create',
    method: 'POST',
    data: {
      title,
      teammate,
      startTime,
      endTime
    }
  })
}

export interface IResGeTInfo {
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

// 得到信息
export const getInfo = async () => {
  return await request<IResGeTInfo[]>({
    url: '/student/project/getInfo',
    method: 'GET'
  })
}

// 更新项目
export const updateProject = async (
  id: string,
  researchProgress: string,
  nextPlan: string,
  fundPlan: string,
  clarification: string
) => {
  return await request({
    url: '/student/project/updateProject',
    method: 'POST',
    data: {
      id,
      researchProgress,
      nextPlan,
      fundPlan,
      clarification
    }
  })
}

// 得到历史记录
export const getHistoryInfo = async (id: string) => {
  return await request<IProgress[]>({
    url: '/student/project/historyUpdate',
    method: 'GET',
    params: {
      id
    }
  })
}
