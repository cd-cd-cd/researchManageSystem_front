import { IStu, IStuList } from '../../libs/model'
import request from '../../utils/request'

export const updatePhone = async (phoneNumber: string) => {
  return await request<string>({
    url: '/teacher/updatePhone',
    method: 'POST',
    data: {
      phoneNumber
    }
  })
}

export const updateEmail = async (email: string) => {
  return await request<string>({
    url: '/teacher/updateEmail',
    method: 'POST',
    data: {
      email
    }
  })
}

export const updateResume = async (resume: string) => {
  return await request<string>({
    url: '/teacher/updateResume',
    method: 'POST',
    data: {
      resume
    }
  })
}

export const updateAvatar = async (avatar: string) => {
  return await request<string>({
    url: '/teacher/updateAvatar',
    method: 'POST',
    data: {
      avatar
    }
  })
}

// 老师创建学生
export const createStu = async (username: string, name: string) => {
  return await request<string>({
    url: '/teacher/createStu',
    method: 'POST',
    data: {
      username,
      name
    }
  })
}

// 得到学生列表
export const getStuList = async (pageNum: number, pageSize: number) => {
  return await request<IStuList>({
    url: '/teacher/stuList',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 得到学生信息
export const getStu = async (id: string) => {
  return await request<IStu>({
    url: '/teacher/getStuDetail',
    method: 'GET',
    params: {
      id
    }
  })
}

// 老师删除学生
export const deleteStu = async (id: string) => {
  return await request<string>({
    url: '/teacher/deleteStu',
    method: 'DELETE',
    data: {
      id
    }
  })
}

// 老师修改密码
export const changePassword = async (oldPassword: string, newPassword: string) => {
  return await request<string>({
    url: '/teacher/passwordChange',
    method: 'PUT',
    data: {
      oldPassword,
      newPassword
    }
  })
}

// 设备指派
export const chooseStu = async (recipient: string, serialNumber: string) => {
  return await request<string>({
    url: '/teacher/device/chooseStu',
    method: 'PUT',
    data: {
      recipient,
      serialNumber
    }
  })
}

// 回收设备
export const recoveryDevice = async (serialNumber: string) => {
  return await request<string>({
    url: '/teacher/device/recovery',
    method: 'PUT',
    data: {
      serialNumber
    }
  })
}
