import { IOption, ITabBarCommon } from './model'

export const studentFunc: ITabBarCommon[] = [
  { label: '个人信息', value: 0, name: 'personInfo' },
  { label: '设备管理', value: 1, name: 'deviceManager' },
  { label: '组会管理', value: 2, name: 'groupManage' },
  { label: '周报管理', value: 3, name: 'weekReport' },
  { label: '经费报销', value: 4, name: 'reimbursement' },
  { label: '请假管理', value: 5, name: 'leaveRequest' },
  { label: '成果管理', value: 6, name: 'production' },
  { label: '项目管理', value: 7, name: 'project' }
]

export const teacherFunc: ITabBarCommon[] = [
  { label: '个人信息', value: 0, name: 'personInfo' },
  { label: '成员管理', value: 1, name: 'teamManager' },
  { label: '设备管理', value: 2, name: 'TDeviceManager' },
  { label: '组会管理', value: 3, name: 'groupManage' },
  { label: '周报管理', value: 4, name: 'TWeekReport' },
  { label: '经费报销', value: 5, name: 'TReimbursement' },
  { label: '请假管理', value: 6, name: 'TLeaveRequest' },
  { label: '数据管理', value: 7, name: 'TDataManage' }
]

export const managerFunc: ITabBarCommon[] = [
  { label: '个人信息', value: 0, name: 'MInfo' },
  { label: '用户管理', value: 1, name: 'userControl' },
  { label: '经费报销', value: 2, name: 'MReimbursement' },
  { label: '数据管理', value: 3, name: 'MDataManage' }
]

export const StuModuleOption: IOption[] = [
  { value: 'meeting', label: '组会模块' },
  { value: 'report', label: '周报模块' },
  { value: 'reimbursement', label: '报销模块' },
  { value: 'request', label: '请假模块' }
]

export const TeaModuleOption: IOption[] = [
  { value: 'device', label: '设备模块' },
  { value: 'meeting', label: '组会模块' },
  { value: 'reimbursement', label: '报销模块' }
]

export const NavItem: IOption[] = [
  { value: 'patent', label: '专利' },
  { value: 'thesis', label: '论文' },
  { value: 'copyright', label: '著作权' },
  { value: 'winning', label: '获奖' }
]

export const copyRightType: IOption[] = [
  { value: '01', label: '文字作品' },
  { value: '02', label: '口述作品' },
  { value: '03', label: '音乐、戏剧、曲艺、舞蹈、杂技艺术作品' },
  { value: '04', label: '美术、建筑作品' },
  { value: '05', label: '摄影作品' },
  { value: '06', label: '电影作品和以类似摄制电影的方法创作的作品' },
  { value: '07', label: '工程设计图、产品设计图、地图、示意图等图形作品和模型作品' },
  { value: '08', label: '计算机软件' },
  { value: '09', label: '法律、行政法规规定的其他作品' }
]

export const awardGradeOption: IOption[] = [
  { value: '01', label: '一等奖' },
  { value: '02', label: '二等奖' },
  { value: '03', label: '三等奖' },
  { value: '04', label: '特等奖' },
  { value: '05', label: '其他' }
]

export const awardLevelOption: IOption[] = [
  { value: '01', label: '国家级' },
  { value: '02', label: '省级' },
  { value: '03', label: '市级' },
  { value: '04', label: '区级' },
  { value: '05', label: '校级' },
  { value: '06', label: '国际级' },
  { value: '07', label: '其他' }
]

export const principalClassificationNumberOption: IOption[] = [
  { value: 'A', label: 'A - 人类生活必需' },
  { value: 'B', label: 'B - 作业；运输' },
  { value: 'C', label: 'C - 化学；冶金' },
  { value: 'D', label: 'D - 纺织；造纸' },
  { value: 'E', label: 'E - 固定建筑物' },
  { value: 'F', label: 'F - 机械工程;照明;加热;武器;爆破' },
  { value: 'G', label: 'G - 物理' },
  { value: 'H', label: 'H - 电学' }
]
