<template>
  <div class="curmb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { useRoute } from 'vue-router'

// const breadcrumbs = ref<{ path: string; name: string }[]>()
const route = useRoute()
const menuList = useUserStore().menuList

const breadcrumbs = computed<{ path: string; name: string }[]>(() => {
  const list: { path: string; name: string }[] = []
  for (const menu of menuList) {
    for (const form of menu.children) {
      if (route.path === form.url) {
        list.push({
          path: menu.url,
          name: menu.name
        })
        list.push({
          path: form.url,
          name: form.name
        })
        return list
      }
    }
  }
  return list
})
</script>

<style lang="less" scoped>
.curmb {
  color: red;
}
</style>
