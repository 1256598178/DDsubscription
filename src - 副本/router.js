/*global Vue*/
import Router from 'vue-router'
import store from '@/store/state.js'
import Stroage from '@/components/public/storage.js'
import helloWorld from '@/components/login/HelloWorld'
import login from '@/components/login/Login'
import newPsw from '@/components/login/newPsw'
import findPsw from '@/components/login/findPsw'
import register from '@/components/login/register'
import main from '@/components/main/main'
import home from '@/components/main/home/home'

import shopdetail from '@/components/main/home/shopdetail'
import categorylist from '@/components/main/home/categorylist'
import reserve from '@/components/main/home/reserve'

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
import payPsw from '@/components/main/my/payPsw'
import ResultsWithdrawals from '@/components/main/my/ResultsWithdrawals'
import withdrawal from '@/components/main/my/withdrawal'
import WithdrawalRecord from '@/components/main/my/WithdrawalRecord'
import AboutUs from '@/components/main/my/AboutUs'
import AccountBalance from '@/components/main/my/AccountBalance'
import BalanceIncome from '@/components/main/my/BalanceIncome'
import BalanceSpending from '@/components/main/my/BalanceSpending'
import MyStock from '@/components/main/my/MyStock'
import TakeOutStock from '@/components/main/my/TakeOutStock'
import Test from '@/components/main/my/test'
import MyReservation from '@/components/main/my/MyReservation'

import friends from '@/components/main/friends/friends'
import MyAttention from '@/components/main/friends/MyAttention'
import RecentNews from '@/components/main/friends/RecentNews'
import managerMyfriendsInfo from '@/components/main/friends/friendsInfo'
import ReleaseFriends from '@/components/main/friends/ReleaseFriends'

import activity from '@/components/main/activity/activity'
import actdet from '@/components/main/activity/actdet'
import MyActivities from '@/components/main/activity/MyActivities'
import MyEnterActivities from '@/components/main/activity/MyEnterActivities'
import MyEnterActivitiesNotBegin from '@/components/main/activity/MyEnterActivitiesNotBegin'



//manager start
import manager from '@/components/manager/manager'
import managerHome from '@/components/manager/home/home'
import managerDemand from '@/components/manager/demand/demand'
import managerFriends from '@/components/manager/friends/friends'
import managerRecentNews from '@/components/manager/friends/RecentNews'
import managerMyAttention from '@/components/manager/friends/MyAttention'
import managerReleaseFriends from '@/components/manager/friends/ReleaseFriends'
import managerActivity from '@/components/manager/activity/activity'
import manageractdet from '@/components/manager/activity/actdet'
import managerMyActivities from '@/components/manager/activity/MyActivities'
import managerMyEnterActivities from '@/components/manager/activity/MyEnterActivities'

import managerMyactdet from '@/components/manager/activity/Myactdet' //我参加的活动详情
import managerMyEntryrecord from '@/components/manager/activity/MyEntryrecord' //我参加的活动报名记录
import managerMypersonalActivities from '@/components/manager/activity/MypersonalActivities' //我的活动(个人)
import managerAddactivities from '@/components/manager/activity/Addactivities' //添加活动

import managerMy from '@/components/manager/my/my'
import managermyIndex from '@/components/manager/my/myIndex'
import managerInviteFriends from '@/components/manager/my/InviteFriends'
import managerpersonlInfo from '@/components/manager/my/personlInfo'
import managerResultsWithdrawals from '@/components/manager/my/ResultsWithdrawals'
import managerWithdrawal from '@/components/manager/my/withdrawal'
import managerWithdrawalRecord from '@/components/manager/my/WithdrawalRecord'
import managerAboutUs from '@/components/manager/my/AboutUs'
import friendsInfo from '@/components/manager/friends/friendsInfo'

import Mydemand from '@/components/manager/my/Mydemand'
import MydemandList from '@/components/manager/my/MydemandList'
import MydemandListCustom from '@/components/manager/my/MydemandListCustom'
import MydemandListStandard from '@/components/manager/my/MydemandListStandard'

import managerAccountBalance from '@/components/manager/my/AccountBalance'
import managerBalanceIncome from '@/components/manager/my/BalanceIncome'
import managerBalanceSpending from '@/components/manager/my/BalanceSpending'
import managerMyStock from '@/components/manager/my/MyStock'
import managerTakeOutStock from '@/components/manager/my/TakeOutStock'
import manageraddStock from '@/components/manager/my/addStock'
import managerMydocumentary from '@/components/manager/my/Mydocumentary'
import managerpayPsw from '@/components/manager/my/payPsw'

import myDemand from '@/components/manager/comm/myDemand'
import myDemandList from '@/components/manager/comm/myDemandList'
import myDemandListCustom from '@/components/manager/comm/myDemandListCustom'
import myDemandListStandard from '@/components/manager/comm/myDemandListStandard'
//manager end


Vue.use(Router)

const router = new Router({
    routes: [{
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
            redirect: '/main/home',
            children: [{
                    path: 'home',
                    name: 'home',
                    component: home
                },
                {
                    path: 'categorylist',
                    name: 'categorylist',
                    component: categorylist
                },
                {
                    path: 'shopdetail',
                    name: 'shopdetail',
                    component: shopdetail
                },
				{
                    path: 'reserve',
                    name: 'reserve',
                    component: reserve
                },
                {
                    path: 'my',
                    name: 'my',
                    component: my,
                    redirect: '/main/my/myIndex',
                    children: [{
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
						    path: 'payPsw',
						    name: 'payPsw',
						    component: payPsw,
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
						    path: 'WithdrawalRecord',
						    name: 'WithdrawalRecord',
						    component: WithdrawalRecord,
						},
                        {
                            path: 'TakeOutStock',
                            name: 'TakeOutStock',
                            component: TakeOutStock,
                        },
                        {
                            path: 'Test',
                            name: 'Test',
                            component: Test,
                        },
						{
                            path: 'MyReservation',
                            name: 'MyReservation',
                            component: MyReservation,
                        }
                    ]
                },
                {
                    path: 'demand',
                    name: 'demand',
                    component: demand,
                    redirect: '/main/demand/demandList',
                    children: [{
                            path: 'demandList',
                            name: 'demandList',
                            component: demandList,
                            redirect: '/main/demand/demandList/demandListStandard',
                            children: [{
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
                            path: 'demandOrderStandard',
                            name: 'demandOrderStandard',
                            component: demandOrderStandard
                        },
                        {
                            path: 'demandOrderCustom',
                            name: 'demandOrderCustom',
                            component: demandOrderCustom
                        },
                    ]
                },
                {
                    path: 'friends',
                    name: 'friends',
                    component: friends,
                    redirect: '/main/friends/RecentNews',
                    children: [{
                            path: 'MyAttention',
                            name: 'MyAttention',
                            component: MyAttention
                        },
                        {
                            path: 'RecentNews',
                            name: 'RecentNews',
                            component: RecentNews
                        },{
							path: 'managerMyfriendsInfo',
							name: 'managerMyfriendsInfo',
							component: managerMyfriendsInfo
						},{
							path: 'ReleaseFriends',
							name: 'ReleaseFriends',
							component: ReleaseFriends
						}
                    ]
                },
                {
                    path: 'activity',
                    name: 'activity',
                    component: activity,
                    redirect: '/main/activity/MyActivities',
                    children: [{
                            path: 'MyActivities',
                            name: 'MyActivities',
                            component: MyActivities
                        }, {
                            path: 'MyEnterActivities',
                            name: 'MyEnterActivities',
                            component: MyEnterActivities
                        },
                        {
                            path: 'MyEnterActivitiesNotBegin',
                            name: 'MyEnterActivitiesNotBegin',
                            component: MyEnterActivitiesNotBegin
                        },
                        {
                            path: 'actdet',
                            name: 'actdet',
                            component: actdet
                        }
                    ]
                }
            ]
        },
        {
            path: '/manager',
            name: 'manager',
            component: manager,
            redirect: '/manager/home',
            children: [{
                    path: 'home',
                    name: 'managerHome',
                    component: managerHome
                },
                {
                    path: 'demand',
                    name: 'managerDemand',
                    component: managerDemand,
                },
                {
                    path: '/manager/comm/myDemand',
                    name: 'myDemand',
                    component: myDemand,
                    redirect: '/manager/comm/myDemandList',
                    children: [{
                        path: '/manager/comm/myDemandList',
                        name: 'myDemandList',
                        component: myDemandList,
                        redirect: '/manager/comm/myDemandListStandard',
                        children: [{
                                path: '/manager/comm/myDemandListStandard',
                                name: 'myDemandListStandard',
                                component: myDemandListStandard,
                            },
                            {
                                path: '/manager/comm/myDemandListCustom',
                                name: 'myDemandListCustom',
                                component: myDemandListCustom,
                            }
                        ]
                    }]
                },
                {
                    path: 'friends',
                    name: 'managerFriends',
                    component: managerFriends,
                    redirect: '/manager/friends/RecentNews',
                    children: [{
                            path: '/manager/friends/RecentNews',
                            name: 'managerRecentNews',
                            component: managerRecentNews,
                        },
                        {
                            path: '/manager/friends/MyAttention',
                            name: 'managerMyAttention',
                            component: managerMyAttention,
                        },{
                            path: '/manager/friends/friendsInfo',
                            name: 'friendsInfo',
                            component: friendsInfo
                        },{
                            path: '/manager/friends/ReleaseFriends',
                            name: 'managerReleaseFriends',
                            component: managerReleaseFriends
                        }
                    ]
                },
                {
                    path: 'managerActivity',
                    name: 'managerActivity',
                    component: managerActivity,
                    redirect: '/manager/activity/managerMyActivities',
                    children: [{
                            path: '/manager/activity/managerMyActivities',
                            name: 'managerMyActivities',
                            component: managerMyActivities,
                        }, {
                            path: 'managerMyEnterActivities',
                            name: 'managerMyEnterActivities',
                            component: managerMyEnterActivities,
                        }, {
                            path: 'manageractdet',
                            name: 'manageractdet',
                            component: manageractdet,
                        }, {
                            path: 'managerMypersonalActivities',
                            name: 'managerMypersonalActivities',
                            component: managerMypersonalActivities,
                        }, {
                            path: 'managerMypersonalActivities/managerMyactdet',
                            name: 'managerMyactdet',
                            component: managerMyactdet,
                        }, {
                            path: 'managerMypersonalActivities/managerMyEntryrecord',
                            name: 'managerMyEntryrecord',
                            component: managerMyEntryrecord,
                        }, {
                            path: 'managerMypersonalActivities/managerAddactivities',
                            name: 'managerAddactivities',
                            component: managerAddactivities,
                        }

                    ]
                },
                {
                    path: 'managerMy',
                    name: 'managerMy',
                    component: managerMy,
                    redirect: '/manager/my/myIndex',
                    children: [
                    	{
                            path: '/manager/my/myIndex',
                            name: 'managermyIndex',
                            component: managermyIndex,
                        },
                        {
                            path: '/manager/my/AccountBalance',
                            name: 'managerAccountBalance',
                            component: managerAccountBalance,
                        }, 
                        {
                            path: '/manager/my/BalanceIncome',
                            name: 'managerBalanceIncome',
                            component: managerBalanceIncome,
                        },
                        {
                            path: '/manager/my/BalanceSpending',
                            name: 'managerBalanceSpending',
                            component: managerBalanceSpending,
                        },
                        {
                            path: '/manager/my/managerpayPsw',
                            name: 'managerpayPsw',
                            component: managerpayPsw,
                        },
                        {
                            path: '/manager/my/withdrawal',
                            name: 'managerWithdrawal',
                            component: managerWithdrawal,
                        },
                        {
                            path: '/manager/my/managerWithdrawalRecord',
                            name: 'managerWithdrawalRecord',
                            component: managerWithdrawalRecord,
                        },
                        {
                            path: '/manager/my/ResultsWithdrawals',
                            name: 'managerResultsWithdrawals',
                            component: managerResultsWithdrawals,
                        },
                        {
                            path: '/manager/my/AboutUs',
                            name: 'managerAboutUs',
                            component: managerAboutUs,
                        }, {
                            path: '/manager/my/InviteFriends',
                            name: 'managerInviteFriends',
                            component: managerInviteFriends,
                        }, {
                            path: '/manager/my/personlInfo',
                            name: 'managerpersonlInfo',
                            component: managerpersonlInfo,
                        }, {
                            path: '/manager/my/managerMyStock',
                            name: 'managerMyStock',
                            component: managerMyStock,
                        }, {
                            path: '/manager/my/managerTakeOutStock',
                            name: 'managerTakeOutStock',
                            component: managerTakeOutStock,
                        }, {
                            path: '/manager/my/manageraddStock',
                            name: 'manageraddStock',
                            component: manageraddStock,
                        }, {
                            path: 'Mydemand',
                            name: 'Mydemand',
                            component: Mydemand,
                            redirect: '/manager/Mydemand/MydemandList',
                            children: [{
                                path: 'MydemandList',
                                name: 'MydemandList',
                                component: MydemandList,
                                redirect: '/manager/Mydemand/MydemandList/MydemandListStandard',
                                children: [{
                                        path: 'MydemandListStandard',
                                        name: 'MydemandListStandard',
                                        component: MydemandListStandard,
                                    },
                                    {
                                        path: 'MydemandListCustom',
                                        name: 'MydemandListCustom',
                                        component: MydemandListCustom,
                                    }
                                ]
                            }, ]
                        }, {
                            path: 'managerMydocumentary',
                            name: 'managerMydocumentary',
                            component: managerMydocumentary,
                        }
                    ]
                },
            ]
        }
    ]
})

export default router