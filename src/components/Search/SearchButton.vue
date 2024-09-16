<template>
  <div class="seachButton">
    <div class="top">
      <span>{{ title }}</span>
      <span v-if="isclear" @click="clear">清空</span>
    </div>
    <div class="button">
      <van-space wrap size="0.35rem">
        <van-button v-for="(item, index) of hot_searchList || searchList" :key="index" type="primary" block
          @click="handleButtonClick(getDisplayText(item))">{{
            getDisplayText(item) }}</van-button>
      </van-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hot_SearchList } from '@/types/hot_search'
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore()
const props = defineProps<{
  title: string,
  isclear: boolean,
  hot_searchList?: Hot_SearchList,
  searchList?: string[]
}>()
const getDisplayText = (item: any) => {
  // 根据isclear条件决定返回内容
  if (props.isclear) {
    return item;
  } else {
    return typeof item === 'object' && item !== null && 'search_term' in item
      ? item.search_term
      : item;
  }
}
const clear = () => {
  searchStore.clearSearchList()
}
const emit = defineEmits(['updateSearchText'])
const handleButtonClick = (item: any) => {
  const text = getDisplayText(item)
  emit('updateSearchText', text)
}

</script>

<style lang="less" scoped>
.top {
  padding: 0.3rem 0;
  font-size: 0.4rem;
  color: rgb(56, 56, 49);
  display: flex;
  justify-content: space-between
}

:deep(.van-space-item) {
  .van-button {
    border-radius: 10px;
    background-color: #fff;
    background-color: rgb(250, 250, 248);
    color: black;
    font-weight: 500;
    border: none;
    font-size: 0.45rem;
  }
}
</style>