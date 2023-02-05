import { IApplyInfo } from '../../libs/model'
import request from '../../utils/request'

interface IResGetDevice {
  id: string
  serialNumber: string
  name: string
}

// 得到闲置设备
export const getDevice = async () => {
  return await request<IResGetDevice[]>({
    url: '/student/device/getIdleDevice',
    method: 'GET'
  })
}

// 申请设备
export const apply = async (
  equipmentId: string,
  reason: string,
  startTime: Date,
  endTime: Date
) => {
  return await request<string>({
    url: '/student/device/apply',
    method: 'POST',
    data: {
      equipmentId,
      reason,
      startTime,
      endTime
    }
  })
}

interface IResApplyInfo {
  pageNum: number
  pageSize: number
  total: number
  applys: IApplyInfo[]
}

// 得到申请信息
export const applyInfo = async (pageNum: number, pageSize: number) => {
  return await request<IResApplyInfo>({
    url: '/student/device/applyInfo',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 取消申请
export const cancelApply = async (applyId: string) => {
  return await request<string>({
    url: '/student/device/cancelApply',
    method: 'DELETE',
    data: {
      applyId
    }
  })
}
