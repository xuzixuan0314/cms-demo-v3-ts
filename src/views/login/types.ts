export type UserInfoType = {
  id?: number
  name?: string
}
export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface IDepartment {
  id: number
  name: string
  parentId?: any
  createAt: string
  updateAt: string
  leader: string
}

export interface IUserDetail {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: IRole
  department: IDepartment
}
