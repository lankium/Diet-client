<template>
  <div class="home">
    <div class="header">
      <span class="xia">下</span>
      <span class="chu">厨</span>
      <span class="fang">房</span>
    </div>
    <div class="search" @click="() => { router.push('/searchPage') }">
      <van-search v-model="value" shape="round" input-align="center" placeholder="今天想吃点什么?" />
    </div>
    <div class="text">
      <span>味觉的探险之旅</span>
    </div>
    <div class="form">
      <div class="form_flex">
        <img class="imgs" src="@/assets/image/家常菜.svg" alt="">
        <span class="texts">家常菜</span>
      </div>
      <div class="form_flex">
        <img class="imgs" src="@/assets/image/时间.svg" alt="">
        <span class="texts">快手菜</span>
      </div>
      <div class="form_flex">
        <img class="imgs" src="@/assets/image/米饭.svg" alt="">
        <span class="texts">下饭菜</span>
      </div>
      <div class="form_flex">
        <img class="imgs" src="@/assets/image/太阳.svg" alt="">
        <span class="texts">早餐</span>
      </div>
      <div class="form_flex">
        <img class="imgs" src="@/assets/image/烘培.svg" alt="">
        <span class="texts">烘培</span>
      </div>
      <div class="form_flex">
        <img class="imgs" src="@/assets/image/更多.svg" alt="">
        <span class="texts">更多</span>
      </div>
    </div>
    <RecipesList :recipes="recipesList" :next="handleNextPage"></RecipesList>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs } from 'vue'
import RecipesList from '@/components/Recipes/RecipesList.vue';
import { useRecipesStore } from '@/stores/recipes.ts'
import { useRouter } from 'vue-router';
const router = useRouter()
// 使用recipesStore钩子来管理食谱的相关状态和操作
const recipesStore = useRecipesStore()
// 将recipesStore中的recipesList状态引用到当前组件中
const { recipesList } = toRefs(recipesStore)

// 初始化搜索关键字的值
let value = ref<string>('')
// 初始化当前页码
const currentPage = ref(1)

// 在组件挂载时，触发获取食谱的初始数据
onMounted(async () => {
  await recipesStore.fetchRecipes();
  await recipesStore.getRecipes(1, 6)
})

/**
 * 处理翻到下一页的操作
 * @param {Function} setHasMore - 用于设置是否还有更多页面的回调函数
 */
const handleNextPage = async (setHasMore: (value: boolean) => void) => {
  // 自增当前页码
  currentPage.value++;
  // 根据新的页码获取食谱数据
  const res = await recipesStore.getRecipes(currentPage.value, 6)
  // 如果返回结果表明没有更多数据，则通过回调函数设置相应的状态
  if (!res.hasMore) {
    setHasMore(false)
  }
}

</script>

<style lang="less" scoped>
.home {
  overflow: hidden;
  width: 100%;

  .header {
    padding-top: 25%;
    padding-bottom: 10%;
    text-align: center;
    font-size: 1rem;
    letter-spacing: 0.15rem;
    font-weight: bold;

    .xia {
      color: rgb(139, 204, 220);
    }

    .chu {
      color: rgb(226, 51, 38);
    }

    .fang {
      color: rgb(239, 138, 100);
    }
  }

  .search {
    :deep(.van-search__content) {
      height: 1.5rem;
      background-color: #ffffff;
      /* 添加阴影 */
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);


      .van-cell {
        height: 100%;
        font-size: 0.7rem;

        .van-icon-search {
          font-size: 0.7rem;
        }

        .van-field__control::placeholder {
          color: black;
          /* 设置 placeholder 的字体颜色 */
          opacity: 0.7;
          /* 使颜色完全不透明 */
        }
      }
    }
  }

  .text {
    text-align: center;
    padding: 6%;
    font-size: 0.55rem;
    opacity: 0.22;
    font-weight: bold;
  }

  .form {
    display: flex;
    width: 100%;

    .form_flex {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .imgs {
        width: 0.95rem;
        flex: 1;
        padding-bottom: 0.2rem;
      }

      .texts {
        font-size: 0.43rem;
        color: rgb(56, 56, 49);
        letter-spacing: 0.025rem;
      }
    }

  }

}
</style>