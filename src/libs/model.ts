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

interface IOption {
  value: string,
  label: string
}

interface IApplyInfo {
  id: string
  applyState: typeIApplyState
  startTime: Date
  endTime: Date
  apply_reason: string
  refuseReason: string
  createdTime: Date
  serialNumber: string
  name: string
  performanceIndex: string
  address: string
}

interface IApplyInfoSingle {
  applyState: typeIApplyState
  apply_reason: string
  createdTime: Date
  endTime: Date
  startTime: Date
  equipment_name: string
  serialNumber: string
  id: string
  equipmentId: string
  studentId: string
  username: string
  studentName: string
}

// 设备申请状态  0 -- 申请中  1 -- 申请同意 -1 -- 申请被拒绝
type typeIApplyState = -1 | 0 | 1

interface ILoadInfo {
  HostRemarks: string
  address: string
  applyId: string
  endTime: Date
  equipmentId: string
  name: string
  performanceIndex: string
  serialNumber: string
  startTime: Date
  version: string
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
  IOption,
  typeIApplyState,
  IApplyInfo,
  IApplyInfoSingle,
  ILoadInfo
}

