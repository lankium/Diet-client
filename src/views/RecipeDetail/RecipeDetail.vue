<template>
  <div v-if="recipe.length" class="container">
    <div class="recipe-header">
      <img class="header_img" :src="recipe[0].cover_image_base64" alt="辣子鸡丁">
      <h1 class="recipe_title">{{ recipe[0].title }}</h1>
      <p class="recipe_score">{{ recipe[0].average_rating }}综合评分</p>
      <div class="author-info">
        <img class="author_img" :src="recipe[0].cover_image_base64" alt="作者">
        <div class="author_content">
          <p class="author_name">作者: 蜗牛</p>
        </div>
      </div>
      <div class="recipe_content">
        {{ recipe[0].description }}
      </div>
    </div>

    <div class="ingredients">
      <h1 class="ingredients_title">用料</h1>
      <van-cell-group v-if="recipeingredients.length">
        <van-cell v-for="(item, index) in recipeingredients" :title="item.ingredient_name" :value="item.quantity"
          :key="index" />
      </van-cell-group>
    </div>

    <div class="steps">
      <div class="step" v-if="recipeDetail.length" v-for="(item, index) in recipeDetail">
        <h1 class="step_title">步骤{{ index + 1 }}</h1>
        <img class="step_img" :src="item.image_base64" alt="步骤1">
        <p class="step_text">{{ item.instruction }}</p>
      </div>
      <!-- 添加更多步骤 -->
    </div>
    <audio class="step_search" v-if="audioSrc" :src="audioSrc" controls></audio>
  </div>
</template>

<script setup lang="ts">
import axios from '@/api/index.ts';
import { useRoute } from 'vue-router';
import type { Response } from '@/types/response'
import { onMounted, ref } from 'vue'
import type { Recipe } from '@/types/recipes'
import type { Step } from '@/types/step'
const route = useRoute();
const recipe_id = route.query.recipe_id as string | undefined;

const recipeDetail = ref<Step[]>([])
const recipe = ref<Recipe[]>([])
const recipeingredients = ref<any>([])
const audioSrc = ref<string>('')
onMounted(async () => {
  const response: Response = (await axios.post('/recipeDetail', {
    recipe_id: recipe_id
  })).data
  recipe.value = response.data.recipe
  recipeDetail.value = response.data.recipeDetail
  recipeingredients.value = response.data.recipeingredients
  const step_text = ref<string>('')
  for (let i = 0; i <= recipeingredients.value.length; i++) {
    step_text.value += `步骤${i + 1}`
    step_text.value += recipeDetail.value[i].instruction
    step_text.value += '        '
  }
  console.log(step_text.value);

  const result = await axios.post('/ai_speak', {
    content: step_text.value
  }, {
    responseType: 'blob' // 设置响应类型为 blob
  })
  if (result.status !== 200) {
    throw new Error(`HTTP status code: ${result.status}`);
  }
  const blob = result.data;
  if (!(blob instanceof Blob)) {
    throw new Error('Response is not a Blob');
  }
  audioSrc.value = URL.createObjectURL(blob);
  console.log('Audio source:', audioSrc.value);
})
// console.log(recipe, recipeDetail);


</script>

<style lang="less" scoped>
.container {
  width: 100%;

  .recipe-header {
    width: 100%;

    .header_img {
      width: 100%;
      height: 8rem;
      border-radius: 10px;
    }

    .recipe_title {
      font-size: 1rem;
      text-align: center;
      line-height: 2rem;
      color: #333;
    }

    .recipe_score {
      font-size: 0.5rem;
      text-align: center;
    }

    .author-info {
      display: flex;
      align-items: center;
      padding: 0.5rem;

      .author_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .author_content {
        padding-left: 0.3rem;

        .author_name {
          font-size: 0.6rem;
          font-weight: 500;
        }
      }
    }

    .recipe_content {
      padding: 0.8rem 0.5rem;
      font-size: 0.55rem;
    }
  }

  .ingredients {
    padding: 0 0.5rem 0.4rem 0.5rem;

    .ingredients_title {
      font-size: 0.6rem;
      font-weight: 600;
      padding-bottom: 0.3rem;
    }
  }

  .steps {
    padding: 0 0.5rem 1.5rem 0.5rem;

    .step {
      .step_title {
        font-size: 0.6rem;
        font-weight: 600;
        padding-bottom: 0.3rem;
      }

      .step_img {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
      }

      .step_text {
        font-size: 0.5rem;
        line-height: 2rem;
      }
    }
  }

  .step_search {
    position: fixed;
    bottom: 0.5rem;
    left: 50%;
    transform: translate(-50%);
  }
}

.author-info div {
  font-size: 14px;
  color: #555;
}
</style>