// 定义食谱的接口
export interface Recipe {
  // 食谱的唯一标识符
  recipe_id: number; // 原先是 id
  // 食谱的标题
  title: string;
  // 食谱的描述
  description: string;
  // 食谱的平均评分
  average_rating: number;
  // 已制作该食谱的次数
  made_count: number;
  // 食谱的封面图片，以base64编码的字符串形式存储
  cover_image_base64: string;
  // 食谱的创建时间，使用ISO 8601日期时间格式
  created_at: string;
  // 创建该食谱的用户的ID
  user_id: number;
}