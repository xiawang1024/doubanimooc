const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const path = require('path')


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