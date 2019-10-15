const Koa = require('koa')
const app = new Koa()
const http = require('http');
const https = require('https');
const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const static = require('koa-static-router');



/*
 1、使用多路由时，请确保router层级相等，层级不相等可能会发生404
 '/static/'         - > 层级为1
 '/static/image1/'  - > 层级为2
*/



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


app.use(async (ctx,next)=>{
    await next()
    const rt = ctx.response.get('X-Response-Time')
})


// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

app.use(async (ctx,next)=> {
    await next();
	if(ctx.status==404){
        ctx.status = 404;
        ctx.body="404"
    }
    else if(ctx.status==405)
    {
        ctx.status = 405;
        ctx.body='"Method Not Allowed"'
    }
});



router.get('/',(ctx,next)=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./view/hello.html');
})

//http请求
router.get('/jsonp',(ctx,next)=>{
    const params = ctx.request.query
    const data = {
        code:0,
        data:'success'
        }
    const res = params.callback+'('+JSON.stringify(data)+')'
    console.log('返回结果>>',res)
    ctx.response.body = res
})
router.get('/user',(ctx,next)=>{
    ctx.response.body = JSON.stringify(ctx.request.query)
})

router.post('/user',(ctx,next)=>{
    ctx.response.body = 'success'
})

router.get('/upload',(ctx,next)=>{
    ctx.response.body='success'
})




app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑

http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
console.log('the server is running on 3000');
