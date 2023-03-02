import { IPagination, IUser } from '../../libs/model'
import request from '../../utils/request'

interface IBasicInfo {
  id: string
  name: string
  username: string
  phoneNumber: number
  resume: string
  email: string
  createdTime: Date
}

interface IStuInfo extends IBasicInfo {
  teacher: IUser
}

interface IGetStuInfo extends IPagination {
  infos: IStuInfo[]
}

interface IGetTeacherInfo extends IPagination {
  infos: IBasicInfo[]
}

export const getStuInfo = async (pageNum: number, pageSize: number) => {
  return await request<IGetStuInfo>({
    url: '/manager/info/getStu',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

export const getTeaInfo = async (pageNum: number, pageSize: number) => {
  return await request<IGetTeacherInfo>({
    url: '/manager/info/getTeacher',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

interface IGetTeacher {
  id: string
  name: string
}

// 得到老师
export const getTeacher = async () => {
  return await request<IGetTeacher[]>({
    url: '/manager/info/getSelect',
    method: 'GET'
  })
}

// 创建老师
export const createTeacher = async (username: string, name: string) => {
  return await request({
    url: '/manager/createTeacher',
    method: 'POST',
    data: {
      username,
      name
    }
  })
}

// 创建学生
export const createStudent = async (username: string, name: string, teacherId: string) => {
  return await request({
    url: '/manager/createStudent',
    method: 'POST',
    data: {
      username,
      name,
      teacherId
    }
  })
}

// 初始化学生
export const initStu = async (id: string, username: string) => {
  return await request({
    url: '/manager/stu/init',
    method: 'PUT',
    data: {
      id,
      username
    }
  })
}

// 初始化老师
export const initTeacher = async (id: string, username: string) => {
  return await request({
    url: '/manager/teacher/init',
    method: 'PUT',
    data: {
      id,
      username
    }
  })
}

// 查询学生
export const searchStudent = async (info: string) => {
  return await request<IStuInfo[]>({
    url: '/manager/search/student',
    method: 'GET',
    params: {
      info
    }
  })
}

// 查询老师
export const searchTeacher = async (info: string) => {
  return await request<IBasicInfo[]>({
    url: '/manager/search/teacher',
    method: 'GET',
    params: {
      info
    }
  })
}
export interface ISelf {
  username: string
  name: string
}

// 自己
export const getSelf = async () => {
  return await request<ISelf>({
    url: '/manager/self',
    method: 'GET'
  })
}
