import { localCache } from './cache'
import type { IUserDetail } from '@/views/login/types'
const PREFIX = 'VUE3+TS+CMS'
const TOKEN = PREFIX + 'TOKEN'
const USERINFO = PREFIX + 'USERINFO'
const MENULIST = PREFIX + 'MENULIST'
export function setToken(token: string) {
  return localCache.set(TOKEN, token)
}
export function getToken() {
  return localCache.get(TOKEN)
}
export function removeToken() {
  return localCache.remove(TOKEN)
}
export function setUserInfo(userInfo: IUserDetail) {
  return localCache.set(USERINFO, userInfo)
}
export function getUserInfo() {
  return localCache.get(USERINFO)
}
export function removeUserInfo() {
  return localCache.remove(USERINFO)
}
export function setMenuList(menuList: any[]) {
  return localCache.set(MENULIST, menuList)
}
export function getMenuList() {
  return localCache.get(MENULIST)
}
