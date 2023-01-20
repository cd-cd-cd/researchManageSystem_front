import { IInfo, IRole } from '../libs/model'
import request from '../utils/request'

interface ILoginRes {
  token: string
  id: string
}
export const login = async (role: IRole, username: string, password: string) => {
  return await request<ILoginRes>({
    url: '/user/login',
    method: 'POST',
    data: {
      role,
      username,
      password
    }
  })
}

export const personInfo = async (id: string, role: IRole) => {
  return await request<IInfo>({
    url: '/user',
    method: 'GET',
    params: {
      id,
      role
    }
  })
}
