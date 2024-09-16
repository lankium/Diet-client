import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload';

import '@/assets/style/reset.css' // 初始化样式
import 'lib-flexible/flexible.js' // 自适应大小

// 1. 引入你需要的组件
import { Cell, Divider, Space, Tabbar, TabbarItem, Search, Button, Form, Field, CellGroup, Col, Row, Tab, Tabs } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
const app = createApp(App)

// 3. 注册你需要的组件
app.use(Tabbar);
app.use(TabbarItem);
app.use(Button);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Search);
app.use(Col);
app.use(Row)
app.use(Space);
app.use(Tab);
app.use(Tabs);
app.use(Divider)
app.use(Cell)

app.use(VueLazyload, {
  loading: '@/assets/image/uploading images.png',  // 替换为你的加载占位图片路径
  error: '@/assets/image/loading_image_error.png'       // 替换为你的错误占位图片路径
})
app.use(createPinia())
app.use(router)
app.mount('#app')
