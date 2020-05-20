/* eslint-disable */
import {UserLayout, BasicLayout, RouteView, BlankLayout} from '@/layouts'
import {chat} from '@/core/icons'

export const asyncRouterMap = [
{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {title: '首页'},
  redirect: '/homepage',
  children: [
    {
      path: '/homepage',
      name: 'homepage',
      meta: {title: '首页', keepAlive: true, icon: 'home'},
      component: () => import( '@/views/user/Homepage' ),
    },


    //科普文章
    {
      path: '/article/list',
      name: 'ArticleList',
      hidden: false,
      component: () => import('@/views/article/ArticleList'),
      meta: {
        title: '科普天地', keepAlive: true, icon: 'book'
      }
    },
    {
      path: '/article/detail/:id',
      name: 'ArticleDetail',
      hidden: true,
      component: () => import('@/views/article/ArticleDetail'),
      meta: {
        title: '文章详情', keepAlive: false, icon: 'file',
      }
    },


    //通知栏
    {
      path: '/note/list',
      name: 'NoteList',
      hidden: false,
      component: () => import('@/views/note/NoteList'),
      meta: {
        title: '通知栏', keepAlive: true, icon: 'bell'
      }
    },
    {
      path: '/note/detail/:id',
      name: 'NoteDetail',
      hidden: true,
      component: () => import('@/views/note/NoteDetail'),
      meta: {
        title: '通知详情', keepAlive: false, icon: 'bell',
      }
    },


    //心理测试
    {
      path: '/psytest/list',
      name: 'TestList',
      component: () => import('@/views/psytest/TestList'),
      meta: {
        title: '测试列表', keepAlive: true, icon: 'highlight'
      }
    },
    {
      path: '/psytest/detail/:id',
      name: 'TestDetail',
      hidden: 'true',
      component: () => import('@/views/psytest/TestDetail'),
      meta: {
        title: '测试详情', keepAlive: false, icon: 'drag'
      }
    },


    //树洞
    {
      path: '/treeHole',
      name: 'treehole',
      redirect: '/treeHole/Post',
      component: RouteView,
      meta: {title: '树洞', keepAlive: true, icon: chat},
      children: [
        {
          path: '/treeHole/post',
          name: 'post',
          component: () => import( '@/views/treeHole/Post' ),
          meta: {
            title: '帖子', keepAlive: false, icon: 'exception'
          }
        },
        {
          path: '/treeHole/detail/:id',
          name: 'postDetail',
          hidden: true,
          component: () => import( '@/views/treeHole/PostDetail' ),
          meta: {
            title: '详情', keepAlive: false, icon: 'copy'
          }
        }
      ]
    },


    // 线上预约
    {
      path: '/counseling',
      name: 'counseling',
      redirect: '/counseling/teacher',
      component: RouteView,
      meta: {title: '线上预约', keepAlive: true, icon: "table"},
      children: [
        {
          path: '/counseling/teacher',
          name: 'teacher',
          component: () => import( '@/views/counseling/Teacher' ),
          meta: {title: '老师信息', keepAlive: false, icon: 'exception'}
        },
        {
          path: '/counseling/myReservation',
          name: 'myReservation',
          component: () => import( '@/views/counseling/MyReservation' ),
          meta: {title: '我的预约', keepAlive: false, icon: 'snippets'}
        },
        {
          path: '/counseling/detail/:id',
          name: 'teacherDetail',
          hidden: true,
          component: () => import( '@/views/counseling/components/TeacherDetail' ),
          meta: {
            title: '老师详情', keepAlive: false, icon: 'bars'
          },
        },
      ]
    },

    //个人中心
    {
      path: '/user/MyPage',
      name: 'myPage',
      component: () => import( '@/views/user/MyPage' ),
      meta: {title: '个人中心', keepAlive: true, icon: 'user'}
    },

    //聊天
    {
      path: '/chat',
      name: 'chat',
      hidden: true,
      component: () => import( '@/views/chat/Rocket'),
      meta: {title: '聊天', keepAlive: true, icon: chat},
    }
  ]
},
{
  path: '*', redirect: '/404', hidden: true
}
]

/**
* 基础路由
* @type { *[] }
*/
export const constantRouterMap = [
{
  path: '/user',
  component: UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login' )
    }
  ]
},

{
  path: '/test',
  component: BlankLayout,
  redirect: '/test/home',
  children: [
    {
      path: 'home',
      name: 'TestHome',
      component: () => import( '@/views/Home' )
    }
  ]
},

{
  path: '/404',
  component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404' )
}

]
