<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.a.count}} = {{count}}</h3>
        <div>
            <button @click="$store.commit('add',10)">+</button>
            <button @click="$store.commit('reduce')">-</button>
            <button @click="reduce">减</button>
        </div>
        <p>
            <button @click="addAction">+</button>
            <button @click="reduceAction">-</button>
        </p>
    </div>
</template>
<script>
import store from '../store'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default{
  data () {
    return {
      msg: 'Hello Vuex'
    }
  },
  // 1、利用computed计算属性
  // computed: {
  //   count() {
  //     return this.$store.state.count
  //   }
  // },

  // 2、通过mapState的对象来赋值
  // computed: mapState({
  //   count: state => state.count
  // }),

  // 3、通过mapState的数组来赋值
  // computed: mapState(['count']),

  computed:{
    // ...mapState(["count"]),
    count() {
      return this.$store.state.a.count
    },
    // ...mapGetters(['count'])
    // count(){
    //     return this.$store.getters.count;
    // }
  },
  // computed: {
  //   ...mapState(['count']),
  //   // count () {
  //   //   return this.$store.getters.count
  //   // }
  //   ...mapGetters(['count'])
  // },
  methods: {
    ...mapMutations(['add', 'reduce']),
    ...mapActions(['addAction', 'reduceAction'])
  },
  store
}
</script>
