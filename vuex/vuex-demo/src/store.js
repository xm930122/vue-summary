import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 1、state访问状态对象
const state = {
  count: 1
}

// 2、Mutations修改状态
const mutations = {
  add (state, n) {
    state.count += n
  },
  reduce (state) {
    state.count--
  }
}

//3、getters计算过滤操作
const getters = {
  // count: (state) => {
  //   state.count += 100
  // }
  count (state) {
    state.count += 100
  }
}

//4、actions异步修改状态
const actions = {
  // addAction (context) {
  //   context.commit('add', 10)
  //   setTimeout(() => {
  //     context.commit('reduce')
  //   }, 5000)
  //   console.log('我比reduce先执行了')
  // },
  addAction ({commit}) {
    commit('add', 10)
    setTimeout(() => {
      commit('reduce')
    }, 3000)
    console.log('我比reduce先执行了');
  },
  reduceAction ({commit}) {
    commit('reduce')
  }
}

//5、module模块组
const moduleA = {
  state,
  mutations,
  getters,
  actions,
}

export default new Vuex.Store({
  // state,
  // mutations,
  // getters,
  // actions,
  modules:{ a: moduleA}
})