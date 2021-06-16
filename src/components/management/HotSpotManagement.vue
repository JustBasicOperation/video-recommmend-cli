<template>
  <div>
    <div class="flush">
      <a-button @click="flush">刷新</a-button>
    </div>
    <!-- 视频列表 -->
    <div class="video-list">
      <ul class="videoShow" id="videoShow">
        <div class="video-item" v-for="(array,index) in arrays" :key="index">
          <div class="pic" v-on:click="loadVideo(array.videoId)" >
            <img :src='array.cover_address' alt='图片'  >
          </div>
          <div class="text">{{array.title}}</div>
          <div class="user-judge">
            <a-button-group class="button">
              <a-button @click="reportPrefer(array.videoId,0)" ghost>喜欢</a-button>
              <a-button @click="reportPrefer(array.videoId,1)" ghost>不喜欢</a-button>
            </a-button-group>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
const data = [];

const arrays = [];
const preferArr = [];
const historyArr = [];

export default {
  data() {
    return {
      data,
      isAddVisible: false,
      isEditVisible: false,
      arrays,
      preferArr,
      historyArr
    };
  },
  created: function () {
    this.query_video_list();
  },
  methods: {
    query_video_list: function () {
      this.$axios.get('http://8.131.121.224:8081/video/hotspot',{
        params:{
          userID:sessionStorage.getItem("userId")
        }
      }).then((response) => {
        this.arrays = [];
        this.arrays = response.data;
      }).catch((error) => {
          console.log(error);
        });
    },
    loadVideo: function (videoId) {
      //1.获取视频详情后跳转网页
      this.$axios.get('http://8.131.121.224:8081/video/single',{
        params:{
          videoId:videoId
        }
      }).then((response) => {
        window.open(response.data.url);
      }).catch((error) => {
        console.log(error);
      });
      //2.上报用户点击行为
      const history = {userId:sessionStorage.getItem("userId"),itemId:videoId}
      this.historyArr.push(history);
      if (this.historyArr.length === 10) {
        console.log("historyArr length:" + this.historyArr.length)
        this.$axios({
          method: 'post',
          url: 'http://8.131.121.224:8081/video/history',
          data: this.historyArr
        }).then((response => {
          console.log(response);
        })).catch((error) => {
          console.log(error);
        })
        this.historyArr = [];
      }
      console.log("report click data:" + videoId);
    },
    //上报用户点赞行为
    reportPrefer:function (id,score) {
      const preference = {userId: sessionStorage.getItem("userId"), itemId: id, status: score};
      this.preferArr.push(preference);
      if(this.preferArr.length === 10) {
        console.log("preferArr length:" + this.preferArr.length)
        this.$axios({
          method: 'post',
          url: 'http://8.131.121.224:8081/video/prefer',
          data: this.preferArr
        }).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
        this.preferArr = [];
      }
      console.log("report prefer data:" + id + ":" + score);
    },
    flush: function () {
      this.query_video_list();
      // this.reload();
    }
  },
  inject:['reload']
};
</script>

<style>
  .pic{
    width:380px;
    height:240px;
  }
  .text{
    width:380px;
    height:60px;
  }
  .user-judge{
    width:380px;
    height:30px;
  }
</style>