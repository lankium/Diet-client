<template>
  <div>
    <van-tabs v-model:active="active" sticky offset-top="">
      <van-tab title="综合" name="composite">
        <div class="content" v-for="(item, index) of sortedRecipes" :key="index"
          @click="() => { router.push({ path: '/recipeDetail', query: { recipe_id: item.recipe_id } }) }">
          <img class=" content_img" :src="item.cover_image_base64" alt="">
          <div class="content_text">
            <h1 class="text_title">{{ item.title }}</h1>
            <div class="content_icon">11231</div>
            <div class="content_span">
              <span class="content_score">{{ item.average_rating }}分</span>&nbsp;&nbsp;
              <span class="content_num">{{ item.made_count }}人做过</span>
            </div>
            <div class="content_user">蜗牛</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="评分最高" name="score">
        评分最高
      </van-tab>
      <van-tab title="做过最多" name="num">
        做过最多
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Recipe } from '@/types/recipes'
import { useRouter } from 'vue-router';
const router = useRouter()
const active = ref<string>('composite')

defineProps<{
  sortedRecipes: Recipe[]
}>()

</script>

<style lang="less" scoped>
.content {
  display: flex;
  padding: 0.3rem 0;

  .content_img {
    width: 3.5rem;
    height: 2.8rem;
    border-radius: 10px;
  }

  .content_text {
    padding-left: 0.3rem;

    .text_title {
      font-size: 0.5rem;
      font-weight: bold;
      color: #333;
      margin: 0;
      padding: 0.25rem 0;
    }

    .content_icon {
      padding-bottom: 0.25rem;
      height: 0.3rem;
    }

    .content_span {
      padding-bottom: 0.25rem;

      .content_score,
      .content_num,
      .content_user {
        font-size: 0.4rem;
        margin-top: 5px;
      }
    }

    .content_user {
      font-size: 0.4rem;
      color: #888;
    }
  }

}
</style>