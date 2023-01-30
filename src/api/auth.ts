import { IInfo, IRole } from '../libs/model'
import request from '../utils/request'

interface ILoginRes {
  token: string
  id: string
}

// 登录
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

// 获取个人信息
export const personInfo = async () => {
  return await request<IInfo>({
    url: '/user',
    method: 'GET'
  })
}
