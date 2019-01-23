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
import myIndex from '@/components/main/my/myIndex'
import InviteFriends from '@/components/main/my/InviteFriends'
import personlInfo from '@/components/main/my/personlInfo'
import ResultsWithdrawals from '@/components/main/my/ResultsWithdrawals'
import withdrawal from '@/components/main/my/withdrawal'
import AboutUs from '@/components/main/my/AboutUs'
import AccountBalance from '@/components/main/my/AccountBalance'
import BalanceIncome from '@/components/main/my/BalanceIncome'
import BalanceSpending from '@/components/main/my/BalanceSpending'
import MyStock from '@/components/main/my/MyStock'
import TakeOutStock from '@/components/main/my/TakeOutStock'

import friends from '@/components/main/friends/friends'
import MyAttention from '@/components/main/friends/MyAttention'
import RecentNews from '@/components/main/friends/RecentNews'

import activity from '@/components/main/activity/activity'
import actdet from '@/components/main/activity/actdet'
import MyActivities from '@/components/main/activity/MyActivities'
import MyEnterActivities from '@/components/main/activity/MyEnterActivities'
import MyEnterActivitiesNotBegin from '@/components/main/activity/MyEnterActivitiesNotBegin'


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
          component: my,
          redirect:'/main/my/myIndex',
          children:[
            {
              path: 'myIndex',
              name: 'myIndex',
              component: myIndex,
            },
            {
              path: 'personlInfo',
              name: 'personlInfo',
              component: personlInfo,
            },
            {
              path: 'InviteFriends',
              name: 'InviteFriends',
              component: InviteFriends,
            },
            {
              path: 'AboutUs',
              name: 'AboutUs',
              component: AboutUs,
            },
            {
              path: 'MyStock',
              name: 'MyStock',
              component: MyStock,
            },
            {
              path: 'AccountBalance',
              name: 'AccountBalance',
              component: AccountBalance,
            },
            {
              path: 'BalanceIncome',
              name: 'BalanceIncome',
              component: BalanceIncome,
            },
            {
              path: 'BalanceSpending',
              name: 'BalanceSpending',
              component: BalanceSpending,
            },
            {
              path: 'withdrawal',
              name: 'withdrawal',
              component: withdrawal,
            },
            {
              path: 'ResultsWithdrawals',
              name: 'ResultsWithdrawals',
              component: ResultsWithdrawals,
            },
            {
              path: 'TakeOutStock',
              name: 'TakeOutStock',
              component: TakeOutStock,
            }
          ]
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
          component: friends,
          redirect:'/main/friends/RecentNews',
          children:[
            {
              path:'MyAttention',
              name:'MyAttention',
              component:MyAttention
            },
            {
              path:'RecentNews',
              name:'RecentNews',
              component:RecentNews
            }
          ]
        },
        {
          path: 'activity',
          name: 'activity',
          component: activity,
					redirect:'/main/activity/MyActivities',
					children:[
						{
							path:'MyActivities',
					    name:'MyActivities',
					    component:MyActivities
						},{
							path:'MyEnterActivities',
					    name:'MyEnterActivities',
					    component:MyEnterActivities
            },
            {
							path:'MyEnterActivitiesNotBegin',
					    name:'MyEnterActivitiesNotBegin',
					    component:MyEnterActivitiesNotBegin
            },
            {
							path:'actdet',
					    name:'actdet',
					    component:actdet
						}
					]
        }
      ]
    }
  ]
})

export default router
