// const movies = [{
//     video:'http://vt1.doubanio.com/201803261534/4050c8b191bef37204a0ed59d4afc401/view/movie/M/302260083.mp4',
//     doubanId:'26942674',
//     cover:'https://img3.doubanio.com/img/trailer/medium/2511084446.jpg?',
//     poster:'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2508925590.jpg'
// }]

const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK,config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac,cfg)

const uploadToQiniu = async (url,key) => {
    return new Promise((resolve,reject) => {
        client.fetch(url,bucket,key,(err,ret,info) => {
            if(err) {
                reject(err)
            }else{
                if(info.statusCode === 200){
                    resolve({key})

                }else{
                    reject(info)
                }
            }
        })
    })
}

;(async () => {
    let movies = [{
        video:'http://vt1.doubanio.com/201803261534/4050c8b191bef37204a0ed59d4afc401/view/movie/M/302260083.mp4',
        doubanId:'26942674',
        cover:'https://img3.doubanio.com/img/trailer/medium/2511084446.jpg?',
        poster:'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2508925590.jpg'
    }]

    movies.map(async movie => {
        if(movie.video &&　!movie.key){
            try{
                console.log('开始传video')
                let videoData = await uploadToQiniu(movie.video,nanoid() + '.mp4')
                console.log('开始传cover')
                let coverData = await uploadToQiniu(movie.cover,nanoid() + '.png')
                console.log('开始传poster')
                let posterData = await uploadToQiniu(movie.poster,nanoid() + '.png')

                if(videoData.key) {
                    movie.videoKey = videoData.key
                }
                if(coverData.key) {
                    movie.coverKey = coverData.key
                }
                if(posterData.key) {
                    movie.posterKey = posterData.key
                }
                console.log(movie)
            }catch(err) {
                console.log(err)
            }
        }
    })
})()