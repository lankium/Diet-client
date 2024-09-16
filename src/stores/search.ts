import { defineStore } from 'pinia';
import { ref } from 'vue'
import axios from '@/api/index.ts';
import type { Hot_SearchList } from '@/types/hot_search'
import type { Response } from '@/types/response'

export const useSearchStore = defineStore('/search', () => {
  // 初始化一个ref来存储所有的搜索数据
  const searchList = ref<string[]>([]);

  const hot_searchList = ref<Hot_SearchList>([])

  /**
   * 异步获取所有的热门搜索数据。
   * 通过axios发送POST请求到'/hot_searchList'，然后更新hot_searchList的值。
   */
  const fetchHot_searchList = async () => {
    try {
      const response: Response = (await axios.post('/hot_searchList')).data;
      if (response.code == '8000') {
        hot_searchList.value = response.data;
        console.log('success hot_searchList')
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.error('Error fetching hot_searchList:', error);
    }
  }
  const setSearchList = (value: string) => {
    searchList.value.push(value)
  }
  const clearSearchList = () => {
    searchList.value.length = 0
  }
  const fetchAiSearch = async (search_text: string, recipes: any) => {
    try {
      const response: Response = (await axios.post('ai_search', {
        search_text: search_text,
        recipes: recipes
      })).data
      if (response.code == '8000') {
        return response.data
        // 根据映射重新排序原数组
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.error('Error fetchAiSearch:', error);
    }
  }

  return {
    searchList,
    hot_searchList,
    fetchHot_searchList,
    fetchAiSearch,
    setSearchList,
    clearSearchList
  }
})