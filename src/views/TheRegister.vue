<template>
  <div class="login">
    <h1>注册</h1>
    <div class="login-wrapper">
      <div class="avatar">
        <img src="../assets/image/头像.png" alt="">
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
          <van-field v-model="nickname" name="nickname" label="昵称" placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
    <p class="register" @click="() => router.push('/login')">已有账号?点击这里登录</p>
  </div>
</template>

<script setup lang="ts">
import axios from '@/api/index.ts';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import type { UserInfo } from '@/types/user.ts'
import type { Response } from '@/types/response'

const username = ref('');
const password = ref('');
const nickname = ref('')
const router = useRouter()
// 注册
const onSubmit = async (values: UserInfo) => {
  const res: Response = await axios.post('/user/register', {
    username: values.username,
    password: values.password,
    nickname: values.nickname
  })
  if (res.code == '8000') {
    showSuccessToast(res.msg)
    setTimeout(() => {
      router.push('/login')
    }, 500);
  } else {
    showFailToast(res.msg)
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  h1 {
    height: 0.6933rem;
    text-align: center;
    font-size: 0.48rem;
    margin-top: 1.12rem;

  }

  .login-wrapper {
    width: 7.44rem;
    height: 10.77rem;
    border: 1px solid rgba(187, 187, 187, 1);
    margin: 0 auto;
    margin-top: 1.7rem;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.533rem 0 rgba(170, 170, 170, 1);

    .avatar {
      width: 2.4rem;
      height: 2.4rem;
      margin: 1rem auto 0.77rem;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }

  .register {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.374rem;
    color: rgba(16, 16, 16, 1);
  }
}

:deep(.van-cell__title.van-field__label) {
  width: 45px;
}
</style>