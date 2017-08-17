<template>
  <div>
    <input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="email">
    <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
    <button type="submit" class="btn btn-default" @click="login">登录</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        let params = {
          email: this.email,
          password: this.password
        }
        // 获取已有账号密码
        this.$http.post('/api/login', params).then((response) => {
          // 响应成功回调
          console.log(response.body)
        })
      }
    }
  }
</script>