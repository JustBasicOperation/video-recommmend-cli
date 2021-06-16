import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import HotSpotManagement from "./components/management/HotSpotManagement";
import RecommendManagement from "./components/management/RecommendManagement";
import HistoryManagement from "./components/management/HistoryManagement";
import PreferManagement from "./components/management/PreferManagement";
import UserManagement from "./components/management/UserManagement";

Vue.use(VueRouter)
Vue.use(Antd)
Vue.prototype.$axios = axios

Vue.config.productionTip = false


const routes = [
  {
    path: '/',
    component: Login,
    meta: {
      title: '教务管理系统'
    }
  },
  {
    path: '/layout',
    component: Layout,
    meta: {
      title: '教务管理系统'
    },
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/myself/history',
        component: HistoryManagement
      },
      {
        path: '/recommend',
        component: RecommendManagement
      },
      {
        path: '/hotSpot',
        component: HotSpotManagement
      },
      {
        path: '/myself/prefer',
        component: PreferManagement
      },
      {
        path: '/myself/user',
        component: UserManagement
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
