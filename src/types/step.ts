// 定义步骤的接口
export interface Step {
  // 步骤的唯一标识符
  step_id: number; // 原先是 id
  // 食谱的id
  recipe_id: number;
  // 食谱步骤
  step_number: number;
  // 食谱的步骤描述
  instruction: string;
  // 食谱的步骤图片
  image_base64: string;
}