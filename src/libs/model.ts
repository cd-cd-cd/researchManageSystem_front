interface ITabBarCommon {
  label: string,
  value: number,
  name: string
}

type IRole = 0 | 1 | 2

interface ILoginValues {
  role: IRole
  username: string
  password: string
}

interface IInfo {
  avatar: string
  createTime: string
  email: string
  id: string
  name: string
  phoneNumber: string
  resume: string
  username: string
}

interface IStu {
  avatar: string | null
  createdTime: Date
  email: string
  id: string
  name: string
  phoneNumber: string | null
  resume: string | null
  teacherId: string
  username: string
}

interface IStuList {
  pageNum: number
  pageSize: number
  total: number
  list: IStu[]
}

export type {
  IStuList,
  IStu,
  IInfo,
  ILoginValues,
  IRole,
  ITabBarCommon
}