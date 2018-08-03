const Koa = require('koa')
const app = new Koa()
const http = require('http');
const https = require('https');
const router = require('koa-router')()
// const static = require('koa-static'); 
const path = require('path');
// const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const listDir = require('./koa-static-router');

// app.use(bodyParser())    

// app.use(static(
//     path.join( __dirname,  'public')
// )) 

// app.use(listDir({
//     dir:'public',
//     route:'/static/image'   //dont't use path.join 
// }))
app.use(listDir([{
    dir:'public',
    router:'/'   //dont't use path.join 
},{
    dir:'public',
    router:'/public/image'   //dont't use path.join 
},{
    dir:'static',
    router:'/static/image'   //dont't use path.join 
}]))

// app.use(listDir('public'))

// app.keys = ['im a newer secret', 'i like turtle'];
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
//logger
app.use(async (ctx,next)=>{
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method}${ctx.url}-${rt}`)
})


// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

app.use(async (ctx, next)=>{
    await next();
    // ctx.cookies.set('name', 'tobi', { signed: true });
    // ctx.body = 'Hello World'
})

app.use(async (ctx,next)=> {
    await next();
    // console.log(ctx.status)
	if(ctx.status==404){
        ctx.status = 404;
        ctx.body="404"
    }
    else if(ctx.status==405)
    {
        ctx.status = 405;
        ctx.body="Method Not Allowed"
    }
});


// router.get('/static/:str',async (ctx,next)=>{
//     console.log('-----------------------------------')
//     const filePath = path.join(__dirname,'public')
//     await listDir(ctx,filePath)
//     // console.log('---',listDir)
//     // ctx.response.body = 'success'
// })

router.get('/user',(ctx,next)=>{
    console.log(ctx.request.query,ctx.request.body)
    ctx.response.body = JSON.stringify(ctx.request.query)
})

router.post('/user',(ctx,next)=>{
    // console.log(ctx.request.query,ctx.request.body)
    ctx.response.body = 'success'
})



app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑

http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
console.log('the server is running on 3000');
console.log(__dirname);
