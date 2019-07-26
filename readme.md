
# koa-static-router
![](https://img.shields.io/badge/npm-1.3.0-blue.svg)
![](https://img.shields.io/badge/build-passing-brightgreen.svg)






Static file serving middleware with router,wrapper for [koa-send](https://github.com/koajs/send) and support Multiple Router  

## Installation

```js
$ npm install koa-static-router
```

## Usage
#### Simple Router  
```
app.use(static('public'))      //default: {dir:public  route:'/public'}
```
####  Single Router   
```
 app.use(static({
     dir:'public',    //dir:static resource directory
     router:'/'    //router:router
 }))
```

#### Multiple Router  
> please make sure that routing length is the same when you choose Multiple Router  

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
