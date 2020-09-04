[code repo](https://github.com/matthew5-template/react-ts-app)
在webpack中编译typescript有多种方式 查看 [[译] TypeScript 牵手 Babel：一场美丽的婚姻](https://juejin.im/post/6844903792865984520) 以及经过对比后决定使用`babel-loader`而放弃~~`awesome-typescript-loader`~~和~~`ts-loader`~~来编译
- 首先添加需要的reference和@types
`yarn add @babel/preset-typescript typescript -D`
`yarn add @types/react @types/react-dom @types/react-router-config @types/react-router-dom -D` 
```
{
    "@babel/preset-typescript": "^7.10.4", // 以此preset来编译typescript语法
    "@types/react": "^16.9.44",
    "@types/react-dom": "^16.9.8",
    "@types/react-router-config": "^5.0.1",
    "@types/react-router-dom": "^5.1.5",
    "typescript": "^3.9.7"
}
```
- 添加`@babel/preset-typescript`到.babelrc.js
```
presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
```
- 添加webpack config resolve
```
// build/webpack.base.js
resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
```
- 重命名js为ts或tsx并解决IDE ts报错
如解决import scss和import image的报错 - 添加.d.ts文件
```
// module.d.ts
declare module '*.png'
declare module '*.scss'
```

- 使用typescript命令`tsc`即时对文件类型进行检查
由于使用babel-loader实际在编译过程中和typescript库没有任何关系 这样加快了编译速度同时也丢掉了类型检查 所以额外开一个进程专门对类型进行监控
除此之外还可以添加eslint对ts进行类型检查 参考 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

  1. 添加必要的tsconfig.json配置 - 注意这里只是为了类型检查 可以使用 `tsc --init` 选择适合的rule
  2. package.json中添加tsc watch
  ```
  "scripts": {
    "check-types": "tsc --watch"
  }
  ```
  参考Microsoft提供的repo [TypeScript-Babel-Starter](https://github.com/Microsoft/TypeScript-Babel-Starter)

  