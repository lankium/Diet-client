<template>
  <van-tabbar v-model="active">
    <van-tabbar-item to="/home">
      <span>下厨房</span>
      <template #icon>
        <i class="iconfont icon-home-fill"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/fridge">
      <span>冰箱管理</span>
      <template #icon>
        <i class="iconfont icon-fridge"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/foodSelection">
      <span>选菜</span>
      <template #icon>
        <i class="iconfont icon-menu-s"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/collections">
      <span>收藏</span>
      <template #icon>
        <i class="iconfont icon-shoucang1"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/account">
      <span>我的</span>
      <template #icon>
        <i class="iconfont icon-wode1"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<number>(0);
</script>

<style lang="less" scoped>
.van-tabbar {
  background-color: white;
}

.iconfont {
  font-size: 0.9rem;
}

.van-tabbar-item {
  color: #909090;
}

.van-tabbar-item--active {
  color: rgb(226, 51, 38);
}
</style>