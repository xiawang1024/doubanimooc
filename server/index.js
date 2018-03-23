const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const path = require('path')


// 加载模板引擎
app.use(views(path.join(__dirname, './tpl'),{
    extension: 'ejs'
}))

app.use(async (ctx,next) => {
    let title = 'Wangxia'
    await ctx.render('test',{
        title
    })
})

app.listen(4455)