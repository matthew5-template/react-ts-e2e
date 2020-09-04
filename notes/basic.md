code repo: [https://github.com/matthew5-template/react-ts-app](https://github.com/matthew5-template/react-ts-app)
branch: basic

### 1. 引入react react-dom
`yarn add react react-dom`
```
// package.json
"dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
```
### 2. 创建基础代码
```
// src/root.js
import React from 'react'

const Root = () => {
  return (
    <div>
      <span>hello root.js</span>
    </div>
  )
}

export default Root

// src/index.js
import React from 'react'
import ReactDom from 'react-dom'
import Root from './root'

const appNode = document.getElementById('app')
ReactDom.render(<Root />, appNode)
```
### 3. 使用webpack编译代码
- 引入reference
```
"devDependencies": {
    "@babel/core": "^7.11.0", // babel-loader相关需要引入
    "@babel/preset-env": "^7.11.0",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "html-webpack-plugin": "^4.3.0", // webpack html入口插件
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
```
- 添加基础的webpack配置文件
`babel-loader` 解析js或jsx
`HtmlWebpackPlugin`将js脚本引入静态html中
```
// build/webpack.base.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devServer: {
    host: 'localhost',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}

```
- 将babel配置加入.babelrc.js
[@babel/preset-env](https://www.babeljs.cn/docs/babel-preset-env) - 支持最新js语法
`@babel/preset-react` - 支持jsx
`@babel/plugin-proposal-class-properties` - 支持class properties语法
```
// .babelrc.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]] 
}
```
- 最后运行webpack命令即可
```
"scripts": {
    "start": "webpack-dev-server --config build/webpack.base.js",
    "build": "webpack --config build/webpack.base.js"
  }
```
### 4. 支持scss和css module
- 加入scss代码
```
// child.scss
.wrapper {
  .child {
    background-color: green;
  }
}
// child.js
import style from './child.scss'

const Child = () => {
  return (
    <div className={style.wrapper}>
      <span className={style.child}>hello child.js</span>
    </div>
  )
}
```
- 加入loader以及plugin
`yarn add style-loader css-loader postcss-loader postcss-preset-env precss `
```
"devDependencies": {
    "css-loader": "^4.1.1",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.7.0",
    "precss": "^4.0.0",
    "style-loader": "^1.2.1"
  }
```
- 在postcss.config.js中添加插件 [postcss-preset-env](https://github.com/csstools/postcss-preset-env)
```
// postcss.config.js
module.exports = {
  plugins: {
    precss: {}, // 解析scss语法
    'postcss-preset-env': {} // 默认解析css next stage2语法
  }
}

```
- 在webpack module中添加scss rule
  1. postcss-loader以及插件负责解析scss语法
  2. css-loader从js文件中根据require import提取出css，并加入css module
  3. style-loader将css注入dom节点
```
// build/webpack.base.js
rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader'
        ]
      }
    ]
```
### 5. 支持image等文件引用
`yarn add file-loader url-loader -D`
url-loader可以将文件优先转为base64 
当超过设置的limit时优先使用file-loader处理，limit单位为bytes
```
"devDependencies": {
    "file-loader": "^6.0.0",
    "url-loader": "^4.1.0",
}

import venom from './assets/venom.png'
<img src={venom} style={{ width: 60 }} />
```
webpack中添加rule配置
```
module: {
  rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'img/[name]_[hash:6].[ext]'
            }
          }
        ]
      }
  ]
}
```

### 6. 使用路由react router
`yarn add react-router react-router-dom react-router-config`
```
"dependencies": {
    "react-router": "^5.2.0",
    "react-router-config": "^5.1.1",
    "react-router-dom": "^5.2.0"
  }
```
- 添加路由页面
由于`react-router-config` renderRoutes **不支持嵌套路由**，将子路由和父路由平级处理 见/child和/child/info
```
// routes.js
import React from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import(/* webpackChunkName: "info" */ './info'))
  },
  {
    path: '/child',
    exact: true,
    component: React.lazy(() =>
      import(/* webpackChunkName: "child" */ './child')
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
    component: React.lazy(() => import(/* webpackChunkName: "info" */ './info'))
  }
]

export default routes
```
- root页面中添加路由渲染
这里使用`HashRouter` 当然也可以使用`BrowserRouter`
使用`react-router-config`工具集中处理routes 也可以使用一般方式如下
```html
<!-- 一般方式 非集中路由 -->
<HashRouter>
 <Route exact path="/child" component={Child} />
 <Route path="/child/info" component={Info} />
</HashRouter>
```

```
// 集中路由配置方式
// root.js
import React, { Suspense } from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

// import Child from './child'
// import Info from './info'

const Root = () => {
  return (
    <div>
      <span>hello root.js</span>
      <Suspense fallback={<div>Loading...</div>}>
        <HashRouter>
          <Switch>
            {/* <Route exact path="/child" component={Child} /> */}
            {/* <Route path="/child/info" component={Info} /> */}
            {renderRoutes(routes)}
          </Switch>
        </HashRouter>
      </Suspense>
    </div>
  )
}

export default Root
```

- dynamic import & code split
  1. 使用React.lazy和Suspend支持dynamic import 参见`./routes.js`和`./root.js`
  2. 在webpack配置中添加splitChunkName 这样可以在webpack打包时对动态加载的页面进行拆分
  ```
  // build/webpack.base.js
  output: {
    chunkFilename: 'js/[name]_[hash:6].js'
  }
  ```

- history api
  1. 创建history实例
  ```
  // utils/history.js
  import { createHashHistory } from 'history'

  export default createHashHistory()
  ```
  
   2. 将root.js中的HashRouter改为Router并添加参数history
  ```
  import { Router, Switch } from 'react-router-dom'
  import history from './utils/history'

  <Router history={history}>
  ```
  3. 使用history
  ```
  import history from './utils/history'

  history.push('/child/info')
  ```

### 7. webpack HMR - hot module replacement
在webpack配置中添加devServer.hot: true
在plugin中添加hmr plugin (目前发现plugin不添加也可以生效)
```
// build/webpack.base.js
devServer: {
    hot: true
},
plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
]
```

在代码入口处监听module change
```
if (module.hot) {
  module.hot.accept('./root', function () {
    ReactDom.render(<Root />, appNode)
  })
}
```
~~##### react-hot-loader (**TODO: 不起作用**)~~
~~webpack提供的HMR可以无刷新更新页面但却无法保存页面中的state数据~~
