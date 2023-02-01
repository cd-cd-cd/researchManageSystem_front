import { IEquipmentList, IEquipmentState } from '../../libs/model'
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

// 获得设备列表
export const getList = async (pageNum: number, pageSize: number) => {
  return await request<IEquipmentList>({
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
