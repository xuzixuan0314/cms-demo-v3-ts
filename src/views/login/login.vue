<template>
  <div class="home">
    <el-tabs class="login-card" type="border-card" stretch>
      <el-tab-pane label="账号密码登录">
        <login-user ref="ref_loginUser"></login-user>
      </el-tab-pane>
      <el-tab-pane label="手机号登录">
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <el-button class="login-btn" type="primary" @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import LoginUser from './login-cpn/LoginUser.vue'
import LoginPhone from './login-cpn/LoginPhone.vue'
import { ref } from 'vue'
const ref_loginUser = ref<InstanceType<typeof LoginUser>>()
const login = () => {
  ref_loginUser.value?.login()
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.login-card {
  width: 500px;
  height: 300px;
}
.login-btn {
  width: 500px;
}
</style>
