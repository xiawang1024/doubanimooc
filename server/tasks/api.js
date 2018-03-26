// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')


async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res
}

;(async () => {
    let movies = [
        { 
            doubanId: 26942674,
            title: '神秘巨星',
            rate: 7.9,
            poster:'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2508925590.jpg' 
        },
        { 
            doubanId: 26746559,
            title: '每分钟120击',
            rate: 8.4,
            poster:'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2476693368.jpg' 
        }
    ]

    movies.map(async movie => {
        let movieData = await fetchMovie(movie)
        try{
            movieData = JSON.parse(movieData)
            console.log(movieData.title)
            console.log(movieData.summary)

        }catch(err) {
            console.log(err)
        }
    })
})()