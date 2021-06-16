<template>
  <div class="home-page">
    <a-card>
      <div class="description">
        <h2>欢迎进入</h2>
        <h2>视频推荐系统</h2>
        <a-icon type="smile" id="smileIcon" />
      </div>
      <div id="space"></div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
};
</script>

<style scoped>
.home-page .description {
  text-align: center;
}
.home-page #smileIcon {
  width: 100px;
  height: 100px;
  font-size: 100px;
}
.home-page #space {
  height: 80px;
}
</style>