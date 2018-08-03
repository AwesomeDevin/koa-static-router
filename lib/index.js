const fs = require('fs')
const Path = require('path')
const send = require('koa-send')



function get_Route_FilePath(ctx,data)
{
    let dir,router
    if(typeof(data) === 'object')
    {
        if(data[0])
        {
            console.log('*********************************')
            data.forEach((item)=>{
                console.log('----------',item,ctx.request.url,ctx.request.url.includes(item.router))
                if(ctx.request.url.includes(item.router))
                {
                    // console.log('123')
                    dir = item.dir
                    router = item.router
                }
            })
        }
        else
        {
            dir = data.dir
            router = data.router
        }
        
    }
    else
    {
         dir = router = data
    }
    console.log(dir,router)
    // console.log(2)
    return {dir,router}
}

function  static(data){

    return async function static (ctx,next){
        // console.log(ctx.body,ctx.status)
        if(ctx.method !== 'HEAD' && ctx.method !== 'GET')
        {
            ctx.body = 'Method Not Allowed'
            await next()
            return;
        }
        if (ctx.body != null || ctx.status !== 404) {
            return;
        }
        let done = false;
        let {dir,router} = get_Route_FilePath(ctx,data)

        const index = ctx.request.url.lastIndexOf(router)+router.length
        const fileUrl = ctx.request.url.substring(index)
        const filePath = Path.join( dir,fileUrl)
        console.log('file',dir,fileUrl,filePath,index)
        try{
            done = await send(ctx, filePath)
        }
        catch(e)
        {
            if (e.status !== 404) {
                throw e
            }
        }

        // console.log('done',done)
        console.log('*********************************')
        await next()
    }
}

module.exports =  static

// async function getType(filePath){    
//     // filePath = path.join(filePath,path)
//     const buffObj = await new Promise((resolve)=>{
//         fs.readFile(filePath,(err,buff)=>{
//             // var fd = fs.openSync(filePath, 'r');
//             // fs.readSync(fd, buff, 0, 8, 0);
//             resolve(buff) 
//         })
//     })
//     var newBuf = buffObj.slice(0, 6);
//     var head_1 = newBuf[0].toString(16);
//     var head_2 = newBuf[1].toString(16);
//     var head_3 = newBuf[2].toString(16);
//     var head_4 = newBuf[3].toString(16);  
//     var typeCode = head_1 + head_2 + head_3 + head_4  ;
//     var filetype = '';
//     var mimetype;
//     switch (typeCode){
//         case 'ffd8ffe1':
//             filetype = 'jpg';
//             mimetype = ['image/jpeg', 'image/pjpeg'];
//             break;
//         case '47494638':
//             filetype = 'gif';
//             mimetype = 'image/gif';
//             break;
//         case '89504e47':
//             filetype = 'png';
//             mimetype = ['image/png', 'image/x-png'];
//             break;
//         case '504b34':
//             filetype = 'zip';
//             mimetype = ['application/x-zip', 'application/zip', 'application/x-zip-compressed'];
//             break;
//         case '2f2ae585':
//             filetype = 'css';
//             mimetype = 'text/css';
//             break;
//         case '5b7bda':
//             filetype = 'json';
//             mimetype = ['application/json', 'text/json'];
//             break;
//         case '3c212d2d':
//             filetype = 'ejs';
//             mimetype = 'text/html';
//             break;
//         default:
//             filetype = 'unknown';
//             break;
//     }
//     // console.log(filetype,typeCode)
//     return filetype
// }








