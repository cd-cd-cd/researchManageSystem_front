import { IRole, IStudentModule, ITeacherModule } from '../../libs/model'
import request from '../../utils/request'

interface IUser {
  id: string
  name: string
  username: string
}
export const getList = async (role: IRole) => {
  return await request<IUser[]>({
    url: '/manager/data/getList',
    method: 'GET',
    params: {
      role
    }
  })
}

export const excelFunc = async (
  role: IRole,
  module: ITeacherModule | IStudentModule,
  startTime: Date,
  endTime: Date,
  id: string
) => {
  return await request({
    url: '/manager/data/excel',
    method: 'POST',
    data: {
      role,
      module,
      startTime,
      endTime,
      id
    },
    responseType: 'arraybuffer'
  })
}
