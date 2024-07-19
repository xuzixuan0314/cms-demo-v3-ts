<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">弘源管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="defaultActiveMenu"
      >
        <template v-for="item in menuList" :key="item.id">
          <el-sub-menu :index="item.id">
            <template #title>
              <el-icon><component :is="item.icon?.split('el-icon-')[1]" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="childMenu in item.children" :key="childMenu.id">
              <el-menu-item @click="navigatorTo(childMenu)" :index="childMenu.id">{{
                childMenu.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

import { useUserStore } from '@/store'
import { loadDefaultMenu } from '@/utils/menu'
const userStore = useUserStore()
const menuList = userStore.menuList
const isFold = defineModel('isFold', {
  type: Boolean,
  default: true
})
// 路由跳转
const router = useRouter()
function navigatorTo(item: { url: string }) {
  router.push(item.url)
  console.log(item, 'item......')
}
const route = useRoute()

const defaultActiveMenu = computed(() => {
  const activeMenu = loadDefaultMenu(route.path, menuList)
  return activeMenu.id
})
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
