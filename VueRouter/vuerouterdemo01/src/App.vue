<template>
  <div id="app">
    <div>
      <button @click="goBack">后退</button>
      <button @click="goForward">前进</button>
      <button @click="goHome">返回首页</button>
    </div>
    <p>导航：
      <router-link to="/">首页</router-link> |
      <router-link to="/pang">pang页面</router-link> |
      <router-link to="/hi">Hi页面</router-link> |
      <router-link :to="{name:'Hello/Hi/Hi1',params:{username:'JSPang', id:'888'}}">-Hi页面1</router-link> |
      <router-link :to="{name:'Hello/Hi/Hi1',query:{username:'JSPang', id:'888888'}}">-Hi页面2-name引入</router-link> |
      <router-link :to="{path:'Hi1',query:{username:'JSPang', id:'888888'}}">-Hi页面2-path引入</router-link> |
      <router-link to="/hi/hi2">-Hi页面2</router-link> |
      <router-link to="/params/198/jspang website is very good">-Params页面</router-link> |
      <router-link to="/goHome">-goHome页面</router-link> |
      <router-link to="/goParams/6666/I like vue.js">-goParams页面</router-link> |
      <router-link to="/jspang">-Jspang页面</router-link> |
      <router-link to="/12345">-404页面</router-link> |
    </p>
    <p style="color:green;">{{$route.name}}</p>
    <transition 
    name="fade" 
    mode="out-in"
    >
      <router-view/>
    </transition>
    <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"/>
    <router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // 编程式导航
  methods:{
    // 后退
    goBack() {
      this.$router.go(-1);
    },
    // 前进
    goForward() {
      this.$router.go(1);
    },
    // 跳转到任意页面
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
