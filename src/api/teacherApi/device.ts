import { IEquipmentList } from '../../libs/model'
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
