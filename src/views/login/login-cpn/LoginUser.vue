<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="用户名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
const form = reactive({
  name: 'coderwhy',
  password: '123456'
})
const userStore = useUserStore()
const login = () => {
  userStore.login(form)
}
defineExpose({
  login
})
</script>

<style lang="less">
.login-btn {
  width: 100%;
}
</style>
