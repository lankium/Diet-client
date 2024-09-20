<template>
  <div class="contents">
    <div class="content" v-for="(recipe, index) in recipes" :key="index"
      :ref="(el) => (index === recipes.length - 1 ? (nodeRef = el as HTMLElement) : '')"
      @click="() => { router.push({ path: '/recipeDetail', query: { recipe_id: recipe.recipe_id } }) }">
      <img class="food_img" v-lazy="recipe.cover_image_base64" alt="">
      <span class="food_title">{{ recipe.title }}</span>
    </div>
    <div class="text-center" v-if="!hasMore">没有更多了</div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/recipes.ts'
import { ref } from 'vue'
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRouter } from 'vue-router';

const router = useRouter()
/**
 * 定义组件的props，包括食谱列表和加载下一页的函数。
 */
const props = defineProps<{
  recipes: Recipe[],
  /** 
   * 加载下一页的函数，用于无限滚动场景。
   * @param setHasMore 设置是否还有更多页面的回调函数。
   */
  next?: (setHasMore: (value: boolean) => void) => void
}>()

/**
 * 使用ref来创建一个节点引用，用于后续的IntersectionObserver监听。
 * @returns 一个HTML元素的引用，初始值为null。
 */
const nodeRef = ref<HTMLElement | null>(null)

/**
 * 使用IntersectionObserver来检测节点是否进入视口，并加载下一页。
 * @param nodeRef 被观察节点的引用。
 * @param callback 当节点进入视口时的回调函数。
 */
const { hasMore, setHasMore } = useIntersectionObserver(nodeRef, () => {
  console.log('loadmore');
  props.next?.(setHasMore)
})

</script>

<style lang="less" scoped>
.contents {
  padding: 6% 0 50px 0;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  .content {
    width: 44%;
    padding: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .food_img {
      width: 4.4rem;
      height: 4.4rem;
      object-fit: cover;
      border-radius: 0.25rem;
    }

    .food_title {
      display: inline-block;
      font-size: 0.5rem;
      font-weight: bold;
      line-height: 0.8rem;
    }
  }
}
</style>