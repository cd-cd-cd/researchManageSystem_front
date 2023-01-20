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
