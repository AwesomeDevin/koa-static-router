# koa-static-router
![](https://img.shields.io/badge/npm-1.1.3-blue.svg)
![](https://img.shields.io/badge/license-MIT-brightgreen.svg)


Static file serving middleware with router

## Installation

```js
$ npm install koa-static-router
```

## Usage
#### A Single Router
```
 app.use(static({
     dir,
     route  
 }))
```

#### Multiple Router 
 please make sure that routing is same length when you choose Multiple Router   (多个路由时，请确保路由长度相同)
 '/static/'         - > length = 1
 '/static/image1/'  - > length =2
```
app.use(static([
    {
    dir',     //dir:static resource directory
    router    //router:router
},{
    dir,
    router  
}
]))
```

## Examplle
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
![](https://github.com/Rise-Devin/koa-static-router/blob/master/img/public.png?raw=true)
![](https://github.com/Rise-Devin/koa-static-router/blob/master/img/static.png?raw=true)

```
