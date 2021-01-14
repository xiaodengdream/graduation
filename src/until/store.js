import Vue from 'vue'
import Vuex from 'vuex'
// 2.挂载对象实例
Vue.use(Vuex);

// 3.创建store对象
const store = new Vuex.Store({
    state: {
        data: '',
    },
    getters: {
        // state的计算属性
    },
    mutations: {// 更改state中状态的逻辑，同步操作
        getinfo(state, data) {//员工工号
            state.data = data
        }
    },
    actions: {
        // 提交mutation，异步操作
    },
    // 如果将store分成一个个的模块的话，则需要用到modules。
    //然后在每一个module中写state, getters, mutations, actions等。
    modules: {
        // a: moduleA,
        // b: moduleB,
        // ...
    }
});

// 4.导出对象
export default store;