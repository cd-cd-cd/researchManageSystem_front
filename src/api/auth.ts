import { IRole } from '../libs/model'
import request from '../utils/request'

export const login = async (role: IRole, username: string, password: string) => {
  return await request({
    url: '/auth/login',
    method: 'POST',
    data: {
      role,
      username,
      password
    }
  })
}
