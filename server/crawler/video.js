const base = `https://movie.douban.com/subject/`

const videoBase = `https://movie.douban.com/trailer/226083/#content`

const doubanId ='26942674'

const puppeteer = require('puppeteer')

;(async () => {
    console.log('Start visit the target page')

    const browser = await puppeteer.launch({        
        args:['--no-sandbox'],
        dumpio:false
    })

    const page = await browser.newPage()
    await page.goto(base + doubanId,{
        waitUntil:'networkidle2'
    })

    await page.waitFor(1000)

    
    const result = await page.evaluate(() => {
        var $ = window.$
        var it = $('.related-pic-video')
        if(it && it.length > 0){
            var link = it.attr('href')
            var cover = it.find('img').attr('src')
            return {
                link,
                cover
            }
        }
        return {}
    })


    let video

    if(result.link) {
        await page.goto(result.link,{
            waitUntil:'networkidle2'
        })
        await page.waitFor(2000)

        video = await page.evaluate(() => {
            var $ = window.$
            var it = $('source')

            if(it && it.length >0) {
                return it.attr('src')
            }

            return ''
        })
    }


    const data = {
        video,
        doubanId,
        cover:result.cover
    }

    browser.close()
    
    process.send(data)
    process.exit(0)
})()