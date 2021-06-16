<template>
  <div>
    <a-card class="card2">
      <div class="user-management">
        <a-card class="card1">
          <div class="smile">
            <a-icon type="smile" id="smileIcon"></a-icon>
          </div>
          <div class="userName">
            <span>{{userName}}</span>
          </div>
          <div class="userId">
            <span>用户id：{{id}}</span>
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<script>

const id = '';
const userName = '';

export default {
  data() {
    return {
      id,
      userName
    };
  },
  created() {
    this.get_user_info();
  },
  methods: {
    get_user_info:function () {
      this.id = sessionStorage.getItem("userId");
      this.userName = sessionStorage.getItem("userName");
    },
  },
};
</script>

<style>
  .user-management #smileIcon {
    width: 220px;
    height: 150px;
    font-size: 100px;
  }
  .smile{
    width: 100px;
    height: 120px;
  }
  .card1{
    width: 300px;
    height: 220px;
  }
  .user-management .userName {
    width: 220px;
    height: 25px;
    text-align: center;
  }
  .user-management .userId {
    height: 25px;
    width: 220px;
    text-align: center;
  }
  .card2{
    height: 500px;
  }
</style>