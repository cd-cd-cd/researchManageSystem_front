import request from '../../utils/request'

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
