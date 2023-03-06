import { IApplyInfoSingle, IEquipmentState, IPagination, IResStu, IUser } from '../../libs/model'
import request from '../../utils/request'
// 添加设备
export const addDevice = async (
  serialNumber: string,
  name: string,
  version: string,
  originalValue: string,
  performanceIndex: string,
  address: string,
  warehouseEntryTime: string,
  HostRemarks: string,
  remark: string
) => {
  return await request<string>({
    url: '/teacher/device/addEquipment',
    method: 'POST',
    data: {
      serialNumber,
      name,
      version,
      originalValue,
      performanceIndex,
      address,
      warehouseEntryTime,
      HostRemarks,
      remark
    }
  })
}

interface IInfo {
  id: string
  serialNumber: string
  name: string
  version: string
  originalValue: string
  performanceIndex: string
  address: string
  state: IEquipmentState
  warehouseEntryTime: string
  HostRemarks: string
  remark: string
  createdTime: Date
  equipment_manager: IUser
  recipient: string
}

interface IResGetList extends IPagination {
  lists: IInfo[]
}

// 获得设备列表
export const getList = async (pageNum: number, pageSize: number) => {
  return await request<IResGetList>({
    url: '/teacher/device/getDeviceList',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 修改设备信息
export const updateDeviceInfo = async (
  id: string,
  serialNumber: string,
  name: string,
  version: string,
  originalValue: string,
  performanceIndex: string,
  address: string,
  warehouseEntryTime: string,
  HostRemarks: string,
  remark: string
) => {
  return await request<string>({
    url: '/teacher/device/update',
    method: 'PUT',
    data: {
      id,
      serialNumber,
      name,
      version,
      originalValue,
      performanceIndex,
      address,
      warehouseEntryTime,
      HostRemarks,
      remark
    }
  })
}

// 修改设备状态
export const changeState = async (state: IEquipmentState, id: string) => {
  return await request<string>({
    url: '/teacher/device/updateState',
    method: 'PUT',
    data: {
      state,
      id
    }
  })
}

// 得到学生列表
export const getLists = async () => {
  return await request<IResStu[]>({
    url: '/teacher/decive/getStudentList',
    method: 'GET'
  })
}

// 设备指派
export const chooseStu = async (
  recipient: string,
  equipmentId: string,
  startTime: Date,
  endTime: Date
) => {
  return await request<string>({
    url: '/teacher/device/chooseStu',
    method: 'PUT',
    data: {
      recipient,
      equipmentId,
      startTime,
      endTime
    }
  })
}

// 回收设备
export const recoveryDevice = async (equipmentId: string) => {
  return await request<string>({
    url: '/teacher/device/recovery',
    method: 'PUT',
    data: {
      equipmentId
    }
  })
}

interface IResApplyInfo {
  num: number
  applyInfo: IApplyInfoSingle[]
}

// 得到申请信息
export const ApplyInfo = async () => {
  return await request<IResApplyInfo>({
    url: '/teacher/device/applyInfo',
    method: 'GET'
  })
}

// 拒绝申请
export const refuseApply = async (id: string, reason: string) => {
  return await request<string>({
    url: '/teacher/device/refuseApply',
    method: 'PUT',
    data: {
      id,
      reason
    }
  })
}

// 同意申请
export const consentApply = async (
  equipmentId: string,
  startTime: Date,
  endTime: Date,
  studentId: string
) => {
  return await request<string>({
    url: '/teacher/device/consent',
    method: 'POST',
    data: {
      equipmentId,
      startTime,
      endTime,
      studentId
    }
  })
}
