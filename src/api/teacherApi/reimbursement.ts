import { IApply, IPagination } from '../../libs/model'
import request from '../../utils/request'

export const postBasic = async (affair: string, sum: number) => {
  return await request<string>({
    url: '/user/reimbursement/basicInfo',
    method: 'POST',
    data: {
      affair,
      sum
    }
  })
}

export const postPdf = async (material: FormData, id: string) => {
  return await request({
    url: '/user/reimbursement/pdf',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: material,
    params: {
      id
    }
  })
}

export const credential = async (material: FormData, num: number, id: string) => {
  return await request({
    url: '/user/reimbursement/credential',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: material,
    params: {
      num,
      id
    }
  })
}

interface IGetInfos extends IPagination {
  applys: IApply[]
}

export const getInfos = async (pageNum: number, pageSize: number) => {
  return await request<IGetInfos>({
    url: '/user/reimbursement/getInfo',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}
