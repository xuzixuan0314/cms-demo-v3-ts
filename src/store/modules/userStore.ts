import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { IUserDetail } from '@/views/login/types'
import {
  setToken,
  setUserInfo,
  getToken,
  getUserInfo,
  getMenuList,
  setMenuList
} from '@/utils/db/user'
import { api_login, api_userDetailById, api_menuList } from '@/api/user'
import router from '@/router'
import { loadLocalRoutes, loadMapRoutes } from '@/utils/menu'
export const useUserStore = defineStore('userStore', () => {
  let token: string = getToken() ?? ''
  let userInfo: IUserDetail = getUserInfo() ?? {}
  const menuList = ref<any[]>(getMenuList() ?? [])
  // 登录操作
  const login = async (loginForm: { name: string; password: string }) => {
    const params = loginForm
    const data = await api_login(params)
    // token和用户信息存在本地
    setToken(data.token)
    // 查询用户详情
    const userDetail = await api_userDetailById(data.id!)
    // 菜单列表
    const menu = await api_menuList(userDetail.role.id)
    menuList.value = menu
    // 查询菜单列表
    setUserInfo(userDetail)
    setMenuList(menu)
    ElMessage.success('登录成功。。。')
    setTimeout(() => {
      router.push('/home')
    }, 300)
  }
  // 动态注册路由列表
  const loadLocalCache = () => {
    if (token && userInfo && menuList.value) {
      const localRoutes = loadLocalRoutes()
      const mapRoutes = loadMapRoutes(menuList.value, localRoutes)
      mapRoutes.forEach((route) => router.addRoute('home', route))
      console.log(mapRoutes, 'mapRoutes....')
    }
  }

  // 使用计算属性
  return {
    login,
    token,
    userInfo,
    menuList,
    loadLocalCache
  }
})
