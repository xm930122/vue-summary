<template>
<div>
    <h2>{{msg}}</h2>
    <br>
    <p>新闻Id:{{$route.params.newsId}}</p>
    <p>新闻标题:{{$route.params.newsTitle}}</p>
</div>
</template>

<script>

export default{
    data() {
        return {
            msg:'Params Page'
        }
    },
    // 路由中的钩子函数
    beforeRouteEnter:(to, from, next) => {
        console.log('准备进入Params路由模板');
        next();    
    },
    beforeRouteLeave:(to, from, next) => {
        console.log('准备离开Params路由模板');
        next();
    }
}
</script>