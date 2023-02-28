import { ITabBarCommon } from './model'

export const studentFunc: ITabBarCommon[] = [
  { label: '个人信息', value: 0, name: 'personInfo' },
  { label: '设备管理', value: 1, name: 'deviceManager' },
  { label: '组会管理', value: 2, name: 'groupManage' },
  { label: '周报管理', value: 3, name: 'weekReport' },
  { label: '经费报销', value: 4, name: 'reimbursement' },
  { label: '请假管理', value: 5, name: 'leaveRequest' }
]

export const teacherFunc: ITabBarCommon[] = [
  { label: '个人信息', value: 0, name: 'personInfo' },
  { label: '成员管理', value: 1, name: 'teamManager' },
  { label: '设备管理', value: 2, name: 'TDeviceManager' },
  { label: '组会管理', value: 3, name: 'groupManage' },
  { label: '周报管理', value: 4, name: 'TWeekReport' },
  { label: '经费报销', value: 5, name: 'TReimbursement' },
  { label: '请假管理', value: 6, name: 'TLeaveRequest' }
]

export const managerFunc: ITabBarCommon[] = [
  { label: '个人信息', value: 0, name: 'MInfo' },
  { label: '用户管理', value: 1, name: 'userControl' },
  { label: '用户信息', value: 2, name: 'userInfo' },
  { label: '经费报销', value: 3, name: 'MReimbursement' }
]
