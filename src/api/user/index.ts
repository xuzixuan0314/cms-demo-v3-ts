import { request } from '@/utils/request/http'
import type { IUserDetail } from '@/views/login/types'
/**
 * @description 用户登录
 * @param data 参数体
 * @param data.name 用户名
 * @param data.password 密码
 * @returns
 */
export function api_login(data: {
  /** 用户名 */
  name: string
  /** 密码 */
  password: string
}) {
  return request.post({
    url: '/login',
    data
  })
}
/**
 * @description 根据用户id查询用户详情
 * @param id 用户id
 * @returns {
 *
 * }
 */
export function api_userDetailById(id: /**用户id */ number) {
  return request.get<IUserDetail>({
    url: `/users/${id}`
  })
}
/**
 * @description 查询菜单列表
 * @param id 角色id
 * @returns
 */
export function api_menuList(id: number) {
  return request.get({
    url: `/role/${id}/menu`
  })
}
