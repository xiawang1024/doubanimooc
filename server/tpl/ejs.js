module.exports = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>
                Koa Server HTML
            </title>
            <link href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>
            <script src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <h1><%= name %></h1>
                    </div>
                    <div class="col-md-4">
                        <h1>测试静态HTML</h1>
                    </div>
                </div>
            </div>
        </body>
    </html>
`

