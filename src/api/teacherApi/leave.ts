import { IPagination, IRequestState, IUser } from '../../libs/model'
import request from '../../utils/request'

interface IRequest {
  askForLeavePerson: IUser
  auditor: IUser
  createdTime: Date
  endEndTime: Date
  endStartTime: Date
  endTime: Date
  id: string
  materials: string
  reason: string
  requestState: IRequestState
  startTime: Date
}

interface IGetLeaveRequest extends IPagination {
  requests: IRequest[]
}

// 得到信息
export const getLeaveRequest = async (pageNum: number, pageSize: number, chooseUnchecked = false) => {
  return await request<IGetLeaveRequest>({
    url: '/teacher/leave/getInfo',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      chooseUnchecked
    }
  })
}

// 拒绝
export const refuse = async (id: string) => {
  return await request({
    url: '/teacher/leave/refuse',
    method: 'POST',
    data: {
      id
    }
  })
}

// 同意
export const consent = async (id: string, endStartTime: Date, endEndTime: Date) => {
  return await request({
    url: '/teacher/leave/consent',
    method: 'POST',
    data: {
      id,
      endStartTime,
      endEndTime
    }
  })
}
