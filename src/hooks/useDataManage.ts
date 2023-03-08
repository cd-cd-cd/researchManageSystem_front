import { message } from 'antd'
import { IRole, ITeacherModule, IStudentModule } from '../libs/model'
import { Moment } from 'moment'
import dayjs from 'dayjs'
export default function useDataManage () {
  // 检查
  const checkItem = (
    role: IRole,
    module: ITeacherModule | IStudentModule,
    time: [Moment | null, Moment | null] | null,
    studentId: string
  ): boolean => {
    if (role !== 0 && role !== 1) {
      message.info('请选择角色')
      return false
    } else if (!module) {
      message.info('请选择模块')
      return false
    } else if (!time || !time[0] || !time[1]) {
      message.info('请选择时间')
      return false
    } else if (role !== 1 && !studentId) {
      message.info('请选择学生')
      return false
    }
    return true
  }

  const renderModule = (module: ITeacherModule | IStudentModule) => {
    switch (module) {
      case 'device':
        return '设备管理'
      case 'meeting':
        return '组会管理'
      case 'reimbursement':
        return '报销管理'
      case 'report':
        return '周报管理'
      case 'request':
        return '请假管理'
    }
  }

  // 生成excel名字
  const createExcelName = (
    role: IRole,
    module: ITeacherModule | IStudentModule,
    time: [Date, Date],
    studentName: string
  ) => {
    let roleText
    if (role === 0) {
      roleText = '同学'
    } else {
      roleText = '老师'
    }
    const moduleText = renderModule(module)
    const studentText = studentName
    const timeText = `${dayjs(time[0]).format('YYYY-MM-DD')}——${dayjs(time[1]).format('YYYY-MM-DD')}`
    return `${studentText + roleText}-${moduleText}-${timeText}`
  }
  return {
    checkItem,
    createExcelName
  }
}
