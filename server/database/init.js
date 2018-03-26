const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/douban-trailer'

mongoose.Promise = global.Promise

exports.connect = () => {

    let maxConnectTimes = 0

    return new Promise((resolve,reject) => {
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug',true)
        }

        mongoose.connect(db)

        mongoose.connection.on('disconnected',() => {
            maxConnectTimes++
            if(maxConnectTimes < 5) {
                mongoose.connect(db)

            }else{
                throw new Error('数据库挂了，快去修吧少年')
            }
        })
        mongoose.connection.on('error',(err) => {
            maxConnectTimes++
            if(maxConnectTimes < 5) {
                mongoose.connect(db)

            }else{
                throw new Error('数据库挂了，快去修吧少年')
            }        
        })
        mongoose.connection.once('open',async () => {
            const Cat = mongoose.model('Cat',{name:String})
            const kitty = new Cat({
                name:'DOG'
            })
            await kitty.save().then((docs) => {
                console.log(docs)
            })
            resolve()
            console.log('MongoDB connected successful')
        })

    })

}