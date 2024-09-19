<template>
  <div>
    <RouterView></RouterView>
    <div class="bottom">
      <Bottom></Bottom>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bottom from '@/views/layout/Bottom.vue'
</script>

<style lang="less" scoped>
.bottom {
  height: 50px;
}
</style>