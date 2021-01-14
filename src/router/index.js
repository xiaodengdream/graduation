import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Employee from '@/views/Employee '
import SalaryInfo from '@/views/SalaryInfo'
import PersonInfo from '@/views/PersonInfo'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/home', name: 'Home', component: Home },
  {
    path: '/employee', name: 'Employee', component: Employee, children: [
      {
        path: 'personinfo',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'personinfo',
        component: PersonInfo
      },
      {
        path: 'salaryinfo',
        name: 'salaryinfo',
        component: SalaryInfo
      },
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
