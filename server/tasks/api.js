// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native')
const mongoose = require('mongoose')

const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res
}

;(async () => {
    

    let movies = await Movie.find({
        $or:[
            {summary:{$exists:false}},
            {summary:null},
            {summary:''},
            {title:''}
        ]
    })

    for(let i=0;i<movies.length;i++) {
        let movie = movies[i]
        let movieData = await fetchMovie(movie)
        console.log(movieData)
        // if(movieData) {
        //     let tags = movieData.tags || []
        //     movie.tags = tags
        //     movie.summary = movieData.summary || ''
        //     movie.title = movieData.alt_title || movieData.title || ''
        //     movie.rawTitle = movieData.rawTitle || movieData.title || ''

        //     if(movie.attrs) {
        //         movie.movieTypes = movieData.attrs.movie_type || []

        //         movie.movieTypes.forEach(async item => {
        //             let cat = await Category.findOne({
        //                 name:item
        //             })

        //             if(!cat) {
        //                 cat = new Category({
        //                     name:item,
        //                     movies:[movie._id]
        //                 })
        //             }else{
        //                 if(cat.movies.indexOf(movie._id) === -1){
        //                     cat.movies.push(movie._id)
        //                 }
        //             }
        //             await movie.save()
        //         })
        //     }

        // }
    }

    // movies.map(async movie => {
    //     let movieData = await fetchMovie(movie)
    //     try{
    //         movieData = JSON.parse(movieData)
    //         console.log(movieData.title)
    //         console.log(movieData.summary)

    //     }catch(err) {
    //         console.log(err)
    //     }
    // })
})()