import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import PersonInfo from '@/views/Employee/PersonInfo'
import SalaryInfo from '@/views/Employee/SalaryInfo'
import Employee from '@/views/Employee/Employee'
import InfoUpdate from '@/views/Employee/InfoUpdate'
import Admin from '@/views/Admin/Admin'
import Employees from '@/views/Admin/Employees'
import AdminInfo from '@/views/Admin/AdminInfo'
import AdmInfoUpdate from '@/views/Admin/AdmInfoUpdate'
import FindPs from '@/views/Employee/FindPs'
import SalarysInfo from '@/views/Admin/SalarysInfo'
import Senior from '@/views/SeniorAdmin/Senior'
import SeniorUpdate from '@/views/SeniorAdmin/SeniorUpdate'
import SeniorInfo from '@/views/SeniorAdmin/SeniorInfo'
import Allemployees from '@/views/SeniorAdmin/Allemployees'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/admin', name: 'admin', component: Admin, children: [
      {
        path: 'adminfoupdate',
        name: 'adminfoupdate',
        component: AdmInfoUpdate
      },
      {
        path: 'salarysinfo',
        name: 'salarysinfo',
        component: SalarysInfo
      },
      {
        path: 'employees',
        name: 'employees',
        component: Employees
      },
      {
        path: 'findps',
        name: 'findps',
        component: FindPs
      },
      {
        path: 'admininfo',
        name: 'admininfo',
        component: AdminInfo
      },

    ]
  },
  {
    path: '/senior', name: 'senior', component: Senior, children: [
      {
        path: 'seniorupdate',
        name: 'seniorupdate',
        component: SeniorUpdate
      },
      {
        path: 'allemployees',
        name: 'allemployees',
        component: Allemployees
      },
      {
        path: 'findps',
        name: 'findps',
        component: FindPs
      },
      {
        path: 'seniorinfo',
        name: 'seniorinfo',
        component: SeniorInfo
      },

    ]
  },
  {
    path: '/employee', name: 'Employee', component: Employee, children: [

      {
        path: 'salaryinfo',
        name: 'salaryinfo',
        component: SalaryInfo
      },
      {
        path: 'infoupdate',
        name: 'infoupdate',
        component: InfoUpdate
      },
      {
        path: 'findps',
        name: 'findps',
        component: FindPs
      },
      {
        path: 'personinfo',
        name: 'personinfo',
        component: PersonInfo
      },
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
