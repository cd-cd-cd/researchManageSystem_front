import { IRole, IStudentModule, ITeacherModule } from '../../libs/model'
import request from '../../utils/request'

interface IStu {
  id: string
  name: string
  username: string
}

export const getStu = async () => {
  return await request<IStu[]>({
    url: '/teacher/data/getStu',
    method: 'GET'
  })
}

export const excelFunc = async (
  role: IRole,
  module: ITeacherModule | IStudentModule,
  startTime: Date,
  endTime: Date,
  studentId: string
) => {
  return await request({
    url: '/teacher/data/excel',
    method: 'POST',
    data: {
      role,
      module,
      startTime,
      endTime,
      studentId
    },
    responseType: 'arraybuffer'
  })
}
