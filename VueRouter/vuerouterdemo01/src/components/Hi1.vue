<template>
<div>
    <h2>{{msg}}</h2>
    <hr>
    <h3 v-if="$route.params.username" style="color:red">{{$route.params.username}}-{{$route.params.id}}</h3>
    <h2 v-if="$route.query.username" style="color:green">{{$route.query.username}}-{{$route.query.id}}</h2>
    <!-- <router-view/> -->
</div>
</template>

<script>

export default{
    data() {
        return {
            msg:'I am Hi1 component'
        }
    }
}
</script>