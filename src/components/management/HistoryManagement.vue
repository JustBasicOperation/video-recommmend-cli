<template>
  <div class="history-management">
    <div class="list">
      <ul class="history-list">
        <li class="history-item" v-for="(array,index) in arrays" :key="index">
          <div class="item">
            <h1>{{array.title}}</h1>
          </div>
        </li>
      </ul>
    </div>
    <div class="page-bar">
      <ul>
        <li v-if="pageNum>1"><a v-on:click="pageNum--,get_history_list()">上一页</a></li>
        <li v-if="pageNum===1"><a class="banclick">上一页</a></li>
        <!--当前页背景色为蓝色-->
        <li v-for="index in indexes" v-bind:class="{ 'active': pageNum === index}" v-bind:key="index">
          <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="pageNum<totalPage"><a v-on:click="pageNum++,get_history_list()">下一页</a></li>
        <li v-if="pageNum === totalPage"><a class="banclick">下一页</a></li>
        <li><a>共<i>{{totalPage}}</i>页</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

const arrays = [
  {title:1},{title:2},{title:3},{title:4}
];

let indexes = [];

let pageNum = 1;
let pageSize = 10;
let totalPage = 10;

export default {
  data() {
    return {
      arrays,
      pageNum,
      pageSize,
      totalPage,
      indexes
    };
  },
  created: function () {
    this.get_history_list();
    this.generate_index();
  },
  methods: {
    get_history_list: function () {
      this.$axios.get('http://8.131.121.224:8081/user/history',{
        params:{
          userId:sessionStorage.getItem("userId"),
          pageSize:this.pageSize,
          pageNum:this.pageNum
        }
      }).then((response) => {
        console.log(response);
        this.arrays = response.data.records;
        this.totalPage = response.data.totalPage;
      }).catch((error) => {
        console.log(error)
      })
    },
    generate_index:function () {
        if (this.indexes.length === totalPage) {
            console.log("totalPage = " + totalPage)
        } else {
            for (let i = 0; i <totalPage; i++) {
                this.indexes.push(i+1);
            }
        }
    }
  },
};
</script>


<style scoped>
  .history-management{
    height: 600px;
  }
  .history-item{
    height: 50px;
  }
  .list{
    width: 1250px;
    height: 550px;
  }
  .page-bar{
    margin:40px;
  }
  ul,li{
    margin: 0px;
    padding: 0px;
  }
  li{
    list-style: none
  }
  .page-bar li:first-child>a {
    margin-left: 0px
  }
  .page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    pageNumsor: pointer
  }
  .page-bar a:hover{
    background-color: #eee;
  }
  .page-bar a.banclick{
    pageNumsor:not-totalPageowed;
  }
  .page-bar .active a{
    color: #fff;
    pageNumsor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>