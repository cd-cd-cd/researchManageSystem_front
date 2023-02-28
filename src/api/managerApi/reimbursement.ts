import { IPagination, IReimbersementState, IUser } from '../../libs/model'
import request from '../../utils/request'

interface IInfo {
  affairReason: string
  amount: number
  applyUser: IUser
  createdTime: Date
  credential: string
  id: string
  invoice: string
  reimbursementState: IReimbersementState
}
interface IGetInfos extends IPagination {
  requests: IInfo[]
}
export const getInfos = async (pageNum: number, pageSize: number, chooseUnchecked: boolean) => {
  return await request<IGetInfos>({
    url: '/manager/reimbursement/getInfo',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      chooseUnchecked
    }
  })
}

export const consent = async (id: string) => {
  return await request({
    url: '/manager/reimbursement/consent',
    method: 'PUT',
    data: {
      id
    }
  })
}

export const refuse = async (id: string) => {
  return await request({
    url: '/manager/reimbursement/refuse',
    method: 'PUT',
    data: {
      id
    }
  })
}
