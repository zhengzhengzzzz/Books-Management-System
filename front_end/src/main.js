import Vue from "vue";
import App from "./App.vue";
// 导入VueRouter
import router from "./router";
// 导入全局样式表
import "./assets/css/global.css";
// 导入elementUI
import ElementUI from "element-ui";
// 导入elementUI样式
import "element-ui/lib/theme-chalk/index.css";
// 导入axios
import axios from "axios";
// 导入Vuex
import Vuex from "vuex";
// 导入store
import store from "./store";
// 使用ElementUI
Vue.use(ElementUI);
// 使用Vuex
Vue.use(Vuex);

// 修改原型
Vue.prototype.$http = axios; //axios

Vue.prototype.baseUrl = "/api";

Vue.config.productionTip = false;

// 配置拦截器
axios.interceptors.request.use((config) => {
  if (config.url === Vue.baseUrl + "/userlogin") return config;
  config.headers.authorization =
    "Bearer " + window.localStorage.getItem("token");
  return config;
});
Vue.directive('click-outside', {
  bind(el, binding) {
    // 在绑定指令时，添加点击事件监听器
    el.clickOutsideEvent = function (event) {
      // 检查点击事件是否在元素外部发生
      if (!(el === event.target || el.contains(event.target))) {
        // 如果是，则调用提供的方法
        binding.value(event);
      }
    };
    // 在 document 上添加点击事件监听器
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el) {
    // 在解绑指令时，移除点击事件监听器
    document.removeEventListener('click', el.clickOutsideEvent);
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");