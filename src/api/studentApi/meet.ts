import { IRole } from '../../libs/model'
import request from '../../utils/request'

interface resParticipant {
  id: string
  name: string
  role: IRole
}
export const getParticipants = async () => {
  return await request<resParticipant[]>({
    url: '/meet/participants',
    method: 'GET'
  })
}

export const postMaterial = async (material: FormData, num: number) => {
  return await request({
    url: `/meet/create?num=${num}`,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: material
  })
}
