interface ITabBarCommon {
  label: string,
  value: number,
  name: string
}

type IRole = 0 | 1 | 2

// -1 -- 损坏 0 -- 闲置 1 -- 在用
type IEquipmentState = -1 | 0 | 1

interface ILoginValues {
  role: IRole
  username: string
  password: string
}

interface IInfo {
  avatar: string
  createTime: string
  email: string
  id: string
  name: string
  phoneNumber: string
  resume: string
  username: string
}

interface IStu {
  avatar: string | null
  createdTime: Date
  email: string
  id: string
  name: string
  phoneNumber: string | null
  resume: string | null
  teacherId: string
  username: string
}

interface IStuList {
  pageNum: number
  pageSize: number
  total: number
  list: IStu[]
}

interface IDevice {
  key: string
  id: string
  createdTime: string
  serialNumber: string
  name: string
  version: string
  originalValue: string
  performanceIndex: string
  address: string
  state: IEquipmentState
  warehouseEntryTime: string
  recipient: string
  HostRemarks: string
  remark: string
}

interface IEquipmentList {
  pageNum: number
  pageSize: number
  total: number
  lists: IDevice[]
}

interface IResStu {
  id: string,
  name: string,
  username: string
}

interface IOptionStu {
  value: string,
  label: string
}

export type {
  IStuList,
  IStu,
  IInfo,
  ILoginValues,
  IRole,
  ITabBarCommon,
  IEquipmentState,
  IDevice,
  IEquipmentList,
  IResStu,
  IOptionStu
}
