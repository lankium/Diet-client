<template>
  <div class="searchPage">
    <div class="topBar">
      <i class="iconfont icon-zuojiantou" @click="() => { router.push('/home') }"></i>
      <h1 class="search_title">菜谱搜索</h1>
    </div>
    <div class="search">
      <van-search shape="round" @search="onClickButton" @focus="focus" v-model="search_text" show-action
        placeholder="今天想吃点什么?">
        <template #action>
          <span class="search_span" @click="onClickButton">搜索</span>
        </template>
      </van-search>
    </div>
    <SearchButton v-if="searchList.length && !searchDetailVisible" :title="'搜索历史'" :isclear="true"
      :searchList="searchList" @updateSearchText="updateSearchText">
    </SearchButton>
    <SearchButton v-if="!searchDetailVisible" :title="'热门搜索'" :isclear="false" :hot_searchList="hot_searchList"
      @updateSearchText="updateSearchText">
    </SearchButton>
    <SearchDetail v-if="searchDetailVisible" :sortedRecipes="sortedRecipes"></SearchDetail>
  </div>
</template>

<script setup lang="ts">
import SearchButton from '@/components/Search/SearchButton.vue';
import SearchDetail from '@/components/Search/SearchDetail.vue'
import { useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/search';
import { onMounted, ref, toRefs } from 'vue';
import { useRecipesStore } from "@/stores/recipes";
import type { Recipe } from '@/types/recipes'

const router = useRouter()
const searchStore = useSearchStore()
const recipesStore = useRecipesStore()

const { searchList, hot_searchList } = toRefs(searchStore)
const { recipes } = toRefs(recipesStore)

const search_text = ref<string>('')
const searchDetailVisible = ref<boolean>(false) // 控制是否显示searchDetail
const sortedRecipes = ref<Recipe[]>([])

onMounted(async () => {
  await searchStore.fetchHot_searchList();
})
// 提取仅包含 title 和 description 的新数组

const simplifiedRecipes = recipes.value.map(({ recipe_id, title, description }) => ({
  recipe_id,
  title,
  description
}));

const onClickButton = async () => {
  if (!searchList.value.includes(search_text.value))
    searchStore.setSearchList(search_text.value);
  searchDetailVisible.value = true; // 点击搜索后显示searchDetail
  if (recipes.value.length) {
    searchStore.fetchAiSearch(search_text.value, simplifiedRecipes)
      .then((res) => {
        const orderMap = new Map(res.map((item: { recipe_id: any; }, index: any) => [item.recipe_id, index]));
        sortedRecipes.value = recipes.value
          .filter(recipe => orderMap.has(recipe.recipe_id))
          .sort((a, b) => {
            const indexA: any = orderMap.get(a.recipe_id);
            const indexB: any = orderMap.get(b.recipe_id);
            return (indexA !== undefined ? indexA : Infinity) - (indexB !== undefined ? indexB : Infinity);
          });
      })

  }
}

const focus = () => {
  searchDetailVisible.value = false; // 点击搜索后显示searchDetail
}

const updateSearchText = async (text: string) => {
  search_text.value = text;
  await onClickButton()
}

</script>

<style lang="less" scoped>
.searchPage {
  padding: 20px 20px 0 20px;

  .topBar {
    display: flex;
    align-items: center;
    background-color: white;
    font-size: 0.5rem;

    .search_title {
      flex-grow: 1;
      text-align: center;
      margin: 0;
    }
  }

  .search {
    padding: 0.3rem 0;

    :deep(.van-search__content) {
      height: 1rem;
      background-color: rgb(240, 240, 240);

      .van-cell {
        height: 100%;
        font-size: 0.5rem;

        .van-icon-search {
          font-size: 0.7rem;
        }

        .van-field__control::placeholder {
          color: black;
          /* 设置 placeholder 的字体颜色 */
          opacity: 0.5;
          /* 使颜色完全不透明 */
        }
      }
    }

    .search_span {
      font-size: 0.5rem;
    }
  }
}
</style>