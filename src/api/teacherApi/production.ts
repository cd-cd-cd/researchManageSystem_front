import { IPagination, IProduction, ITCopyright, ITPatent, ITProductionInfo, ITThesis, ITWin } from '../../libs/model'
import request from '../../utils/request'

interface IGetInfo extends IPagination {
  infos: ITProductionInfo
}

export const getInfo = async (nav: string, pageNum: number, pageSize: number) => {
  return await request<IGetInfo>({
    url: '/teacher/production/info',
    method: 'GET',
    params: {
      nav,
      pageNum,
      pageSize
    }
  })
}

// 同意&驳回
export const pass = async (type: IProduction, id: string) => {
  return await request({
    url: '/teacher/production/pass',
    method: 'PUT',
    data: {
      type,
      id
    }
  })
}

export const returnAsk = async (type: string, id: string) => {
  return await request({
    url: '/teacher/production/returnAsk',
    method: 'PUT',
    data: {
      type,
      id
    }
  })
}
