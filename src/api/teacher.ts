import { IStu, IStuList } from '../libs/model'
import request from '../utils/request'

export const updatePhone = async (id: string, phoneNumber: string) => {
  return await request<string>({
    url: '/teacher/updatePhone',
    method: 'POST',
    data: {
      id,
      phoneNumber
    }
  })
}

export const updateEmail = async (id: string, email: string) => {
  return await request<string>({
    url: '/teacher/updateEmail',
    method: 'POST',
    data: {
      id,
      email
    }
  })
}

export const updateResume = async (id: string, resume: string) => {
  return await request<string>({
    url: '/teacher/updateResume',
    method: 'POST',
    data: {
      id,
      resume
    }
  })
}

export const updateAvatar = async (id: string, avatar: string) => {
  return await request<string>({
    url: '/teacher/updateAvatar',
    method: 'POST',
    data: {
      id,
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
