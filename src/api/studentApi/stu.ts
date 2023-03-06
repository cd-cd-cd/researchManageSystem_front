import request from '../../utils/request'

// 学生修改个人信息
export const updateInfo = async (phoneNumber?: string, email?: string, resume?: string) => {
  return await request<string>({
    url: '/student/updateInfo',
    method: 'PUT',
    data: {
      phoneNumber,
      email,
      resume
    }
  })
}

// 学生修改密码
export const stuChangePassword = async (oldPassword: string, newPassword: string) => {
  return await request<string>({
    url: '/student/changePassword',
    method: 'PUT',
    data: {
      oldPassword,
      newPassword
    }
  })
}

export const updateAvatarStu = async (avatar: FormData) => {
  return await request<string>({
    url: '/student/avatar',
    method: 'PUT',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: avatar
  })
}
