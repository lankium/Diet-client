import { defineStore } from 'pinia';
import axios from '@/api/index.ts';
import { Recipe } from '@/types/recipes.ts'
import { ref } from 'vue'
import type { Response } from '@/types/response'
/**
 * 使用pinia定义名为'recipes'的store。
 * 该store负责管理食谱的相关数据，包括获取食谱列表和缓存已加载的食谱。
 */
export const useRecipesStore = defineStore('recipes', () => {
  // 初始化一个ref来存储所有的食谱数据
  const recipes = ref<Recipe[]>([]);
  // 初始化一个ref来存储已加载的食谱列表
  const recipesList = ref<Recipe[]>([]);

  /**
   * 异步获取所有的食谱数据。
   * 通过axios发送POST请求到'/recipes'，然后更新recipes的值。
   */
  const fetchRecipes = async () => {
    try {
      const response: Response = (await axios.post('/recipes')).data;
      if (response.code == '8000') {
        recipes.value = response.data;
        console.log('success recipes')
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  /**
   * 分页获取食谱数据。
   * @param page 当前页码
   * @param size 每页包含的食谱数量
   * @returns 返回一个Promise，包含分页后的食谱数据、当前页码、总数量和是否还有更多页的标志。
   */
  const getRecipes = (page: number, size: number) => {
    return new Promise<{
      data: Recipe[]
      page: number
      total: number
      hasMore: boolean
    }>((resolve) => {
      setTimeout(() => {
        const data = recipes.value.slice((page - 1) * size, page * size)
        recipesList.value = [...recipesList.value, ...data]
        resolve({
          data,
          page,
          total: recipes.value.length,
          hasMore: page * size < recipes.value.length
        })
      }, 500)
    })
  }

  // 返回公开的属性和方法
  return {
    recipes,
    recipesList,
    fetchRecipes,
    getRecipes
  }
});