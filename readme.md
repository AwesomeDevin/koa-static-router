# koa-static-router
![](https://img.shields.io/badge/npm-1.1.3-blue.svg)
![](https://img.shields.io/badge/license-MIT-brightgreen.svg)


Static file serving middleware with router

## Installation

```js
$ npm install koa-static-router
```

## Usage
#### 单路由
```
 app.use(static({
     dir,
     route  
 }))
```

#### 多路由 
> 1、使用多路由时，请确保router层级相等，层级不相等可能会发生404
 '/static/'         - > 层级为1
 '/static/image1/'  - > 层级为2
```
app.use(static([
    {
    dir',
    router 
},{
    dir,
    router  
}
]))
```

## Examplle
```
const static = require('koa-static-router');

//   单路由
// app.use(static({
//     dir:'public',
//     router:'/static/'   
// }))


//多路由
app.use(static([
    {
    dir:'public',
    router:'/public/image/'   
},{
    dir:'static',
    router:'/static/image/'   
}
]))
```
