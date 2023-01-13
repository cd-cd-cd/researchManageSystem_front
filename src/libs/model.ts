export interface ITabBarCommon {
  label: string,
  value: number,
  name: string
}
export type IRole = 0 | 1 | 2

export interface ILoginValues {
  role: IRole
  username: string
  password: string
}