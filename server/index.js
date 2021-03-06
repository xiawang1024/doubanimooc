const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const path = require('path')
const mongoose = require('mongoose')

const { connect, initSchemas } = require('./database/init')

// 数据库连接
;(async () =>{
    await connect()   
    initSchemas()
    
    // require(path.join(__dirname , './tasks/movie'))
    require(path.join(__dirname , './tasks/api'))
})()


// 加载模板引擎
app.use(views(path.join(__dirname, './views'),{
    extension: 'pug'
}))

app.use(async (ctx,next) => {
    let you = 'Gyy'
    let me = 'Wangxia'
    await ctx.render('index',{
        you,me
    })
})

app.listen(4455)