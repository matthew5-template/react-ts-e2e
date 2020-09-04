import React from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() =>
      import(/* webpackChunkName: "info" */ './pages/info')
    )
  },
  {
    path: '/child',
    exact: true,
    component: React.lazy(() =>
      import(/* webpackChunkName: "child" */ './pages/child')
    )
    // 不支持嵌套
    // routes: [
    //   {
    //     path: '/info',
    //     component: Info
    //   }
    // ]
  },
  {
    path: '/child/info',
    component: React.lazy(() =>
      import(/* webpackChunkName: "info" */ './pages/info')
    )
  }
] as any

export default routes
