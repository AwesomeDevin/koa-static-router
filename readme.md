
# koa-static-router
![](https://img.shields.io/badge/npm-1.1.8-blue.svg)
![](https://img.shields.io/badge/build-passing-brightgreen.svg)
![](https://img.shields.io/badge/license-MIT-brightgreen.svg)





Static file serving middleware with router,wrapper for koa-send.【koa中间件,koa-static-router实现多个&&多层路由加载静态资源】

## Installation

```js
$ npm install koa-static-router
```

## Usage
#### Simple Router   (简单配置)
```
app.use(static('public'))      //dir:public  route:'/public'
```
#### A Single Router   (单个路由配置)
```
 app.use(static({
     dir:'public',    //dir:static resource directory
     router:'/'    //router:router
 }))
```

#### Multiple Router  (多个路由配置)
> please make sure that routing is same length when you choose Multiple Router   (多个路由时，请确保路由长度相同)

> '/static/'         - >routing length = 1

> '/static/image1/'  - >routing length =2
```
app.use(static([
    {
    dir:'public',     //dir:static resource directory
    router:'/public/'    //router:router
},{
    dir:'static',
    router:'/static/'  
}
]))
```

## Example
```
git clone git@github.com:Rise-Devin/koa-static-router.git
cd koa-static-router
npm install 
npm start
```
Access localhost:3000/public/image/dir/1.png
![](https://github.com/Rise-Devin/koa-static-router/blob/master/img/public.png?raw=true)
Access localhost:3000/static/image/dir/2.png
![](https://github.com/Rise-Devin/koa-static-router/blob/master/img/static.png?raw=true)
```
const static = require('koa-static-router');

//   A Single Router
// app.use(static({
//     dir:'public',
//     router:'/static/'   
// }))


//Multiple Router
app.use(static([
    {
    dir:'public',     
    router:'/public/image/'   //routing length = 2
},{
    dir:'static',
    router:'/static/image/'   //routing length = 2
}
]))
```
