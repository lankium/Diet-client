// 类型接口
interface Hot_Search {
  search_id: number;
  search_term: string;
  search_count: number;
  last_searched_at?: string
}

export type Hot_SearchList = Hot_Search[]