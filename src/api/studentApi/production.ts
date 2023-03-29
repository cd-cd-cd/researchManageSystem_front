import { IPatent, IPatentExist, IPatentState } from '../../libs/model'
import request from '../../utils/request'

// 创建专利
export const createPatent = async (
  name: string,
  applicationNumber: string,
  applicationDate: Date,
  publicationNumber: string,
  openDay: Date,
  principalClassificationNumber: string,
  patentRight: string,
  inventor: string,
  digest: string
) => {
  return await request({
    url: '/student/production/createPatent',
    method: 'POST',
    data: {
      name,
      applicationNumber,
      applicationDate,
      publicationNumber,
      openDay,
      principalClassificationNumber,
      patentRight,
      inventor,
      digest
    }
  })
}

// 得到专利信息
export const getPatent = async () => {
  return await request<IPatent[]>({
    url: '/student/production/getPatent',
    method: 'GET'
  })
}

// 取消专利申请
export const cancelPatent = async (id: string) => {
  return await request({
    url: '/student/production/cancelPatent',
    method: 'PUT',
    data: {
      id
    }
  })
}
