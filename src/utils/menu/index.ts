import type { RouteRecordRaw } from 'vue-router'
/**
 * 读取router/main文件夹下所有的路由对象,放到一个数组中返回
 * @returns router/main下所有路由文件导出的对象,组成的数组
 */
export function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const records: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', { eager: true })
  console.log(records, 'records...')

  for (const key in records) {
    if (Object.prototype.hasOwnProperty.call(records, key)) {
      const record = records[key].default
      localRoutes.push(record)
    }
  }
  return localRoutes
}

//用户登录时候,获取用户在全部路由下的第一个菜单
export let firstMenu: any = null

/**
 * 将本地表单列表和有权限的菜单列表进行匹配,返回路由树
 * @param userMenu 有权限的菜单列表
 * @param localRoutes 本地所有的表单列表
 * @returns
 */
export function loadMapRoutes(userMenu: any[], localRoutes: RouteRecordRaw[]) {
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    const childRoutes = []
    for (const form of menu.children) {
      const route = localRoutes.find((i) => i.path === form.url)
      if (route) {
        childRoutes.push(route)
      }
      if (!firstMenu && route) firstMenu = form
    }
    routes.push({
      path: menu.url,
      children: childRoutes
    })
  }
  console.log(routes, 'routes....')

  return routes
}

/**
 *
 * @param path 当前路由地址
 * @param menuList 菜单列表
 * @returns 当前路由对应的菜单
 */
export function loadDefaultMenu(path: string, menuList: any[]) {
  for (const menu of menuList) {
    for (const form of menu.children) {
      if (form.url === path) return form
    }
  }
}
