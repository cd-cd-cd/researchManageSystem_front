import { ICopyRight, IPatent, IPatentExist, IPatentState, IThesis, IWin } from '../../libs/model'
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

// 创建论文信息
export const createThesis = async (
  title: string,
  firstAuthor: string,
  publishDate: Date,
  publicationName: string,
  signature: string,
  disciplineOne: string
) => {
  return await request({
    url: '/student/production/createThesis',
    method: 'POST',
    data: {
      title,
      firstAuthor,
      publishDate,
      publicationName,
      signature,
      disciplineOne
    }
  })
}

// 得到论文信息
export const getThesis = async () => {
  return await request<IThesis[]>({
    url: '/student/production/getThesis',
    method: 'GET'
  })
}

// 取消论文
export const cancelThesis = async (id: string) => {
  return await request({
    url: '/student/production/cancelThesis',
    method: 'PUT',
    data: {
      id
    }
  })
}

// 创建著作权
export const postCopyRight = async (
  registerNumber: string,
  name: string,
  category: string,
  copyrightOwner: string,
  creationCompletionDate: Date,
  firstPublicationDate: Date,
  recordDate: Date
) => {
  return await request({
    url: '/student/production/createCopyRight',
    method: 'POST',
    data: {
      registerNumber,
      name,
      category,
      copyrightOwner,
      creationCompletionDate,
      firstPublicationDate,
      recordDate
    }
  })
}

// 得到著作权
export const getCopyRight = async () => {
  return await request<ICopyRight[]>({
    url: '/student/production/getCopyRight',
    method: 'GET'
  })
}

// 取消著作权
export const cancelCopyRight = async (id: string) => {
  return await request({
    url: '/student/production/cancelCopyRight',
    method: 'PUT',
    data: {
      id
    }
  })
}

// 创建获奖
export const createWin = async (
  name: string,
  awardGrade: string,
  awardLevel: string,
  awardTime: Date,
  organizingCommittee: string
) => {
  return await request({
    url: '/student/production/createWin',
    method: 'POST',
    data: {
      name,
      awardGrade,
      awardLevel,
      awardTime,
      organizingCommittee
    }
  })
}

// 获奖历史
export const getWin = async () => {
  return await request<IWin[]>({
    url: '/student/production/createWin',
    method: 'GET'
  })
}

// 取消获奖
export const cancelWin = async (id: string) => {
  return await request({
    url: '/student/production/cancelWin',
    method: 'PUT',
    data: {
      id
    }
  })
}
