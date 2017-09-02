import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/Pos'
import Select from '@/components/select'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Pos',
    //   component: Pos
    // }，
    {
      path: '/',
      name: 'Select',
      component: Select
    }
  ]
})
