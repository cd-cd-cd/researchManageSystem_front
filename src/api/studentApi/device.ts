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
  serialNumber: string,
  reason: string,
  startTime: string,
  endTime: string
) => {
  return await request<string>({
    url: '/student/device/apply',
    method: 'POST',
    data: {
      serialNumber,
      reason,
      startTime,
      endTime
    }
  })
}
