<template>
  <div>
    <a-layout class="layout">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :default-selected-keys="['0']">
          <a-menu-item key="0">
            <router-link to="/layout">
              <a-icon type="home" />
              <span>首页</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link to="/recommend">
              <a-icon type="idcard" />
              <span>推荐</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/hotSpot">
              <a-icon type="profile" />
              <span>热门</span>
            </router-link>
          </a-menu-item>

          <a-sub-menu key="3">
            <span slot="title">
              <a-icon type="build" /> <span>我的</span>
            </span>
              <router-link to="/myself/user">
                  <a-menu-item key="6">个人资料</a-menu-item>
              </router-link>
            <router-link to="/myself/history">
              <a-menu-item key="5">历史记录</a-menu-item>
            </router-link>
            <router-link to="/myself/prefer">
              <a-menu-item key="6">点赞记录</a-menu-item>
            </router-link>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <!-- 布局中的内容，子路由刷新 -->
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style>
.layout {
  height: 100vh;
}

.layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.layout .trigger:hover {
  color: #1890ff;
}

.layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
