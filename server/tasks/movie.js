const cp = require('child_process')

const path = require('path')

const mongoose = require('mongoose')

const Movie = mongoose.model('Movie')

;(async () => {
    const script = path.join(__dirname,'../crawler/trailer-list.js')
    const child = cp.fork(script,[])
    let invoked = false
    child.on('error', err => {
        if(invoked) return 
        invoked = true
        console.log(err)
    })

    child.on('exit',code => {
        if(invoked) return
        invoked = true
        let err = code === 0 ? null : new Error('exti code' +code)
        console.log(err)
    })

    child.on('message',data => {
        let result = data.result
        
        result.forEach(async item => {
            let movie = await Movie.findOne({
                doubanId:item.doubanId
            })
            if(!movie) {
                movie = new Movie(item)
                await movie.save()
            }
        });
    })
})()