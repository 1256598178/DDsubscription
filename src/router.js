/*global Vue*/
import Router from 'vue-router'
import helloWorld from '@/components/login/HelloWorld'
import login from '@/components/login/Login'
import newPsw from '@/components/login/newPsw'
import findPsw from '@/components/login/findPsw'
import register from '@/components/login/register'
import main from '@/components/main/main'
import home from '@/components/main/home/home'
import demand from '@/components/main/demand/demand'
import demandList from '@/components/main/demand/demandList'
import demandListStandard from '@/components/main/demand/demandListStandard'
import demandListCustom from '@/components/main/demand/demandListCustom'
import demandOrderStandard from '@/components/main/demand/demandOrderStandard'
import demandOrderCustom from '@/components/main/demand/demandOrderCustom'

import my from '@/components/main/my/my'
import friends from '@/components/main/friends/friends'
import activity from '@/components/main/activity/activity'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'helloWorld',
      component: helloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/newPsw',
      name: 'newPsw',
      component: newPsw
    },
    {
      path: '/findPsw',
      name: 'findPsw',
      component: findPsw
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect:'/main/home',
      children:[
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'my',
          name: 'my',
          component: my
        },
        {
          path: 'demand',
          name: 'demand',
          component: demand,
          redirect:'/main/demand/demandList',
          children:[
            {
              path:'demandList',
              name:'demandList',
              component:demandList,
              redirect:'/main/demand/demandList/demandListStandard',
              children:[
                {
                  path: 'demandListStandard',
                  name: 'demandListStandard',
                  component: demandListStandard,
                },
                {
                  path: 'demandListCustom',
                  name: 'demandListCustom',
                  component: demandListCustom,
                }
              ]
            },
            {
              path:'demandOrderStandard',
              name:'demandOrderStandard',
              component:demandOrderStandard
            },
            {
              path:'demandOrderCustom',
              name:'demandOrderCustom',
              component:demandOrderCustom
            },
          ]
        },
        {
          path: 'friends',
          name: 'friends',
          component: friends
        },
        {
          path: 'activity',
          name: 'activity',
          component: activity
        }
      ]
    }
  ]
})

export default router
