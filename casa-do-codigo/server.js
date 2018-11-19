const http = require('http');

const PORT = '3000';

const servidor = http.createServer(function (req,res) {

    let html = '';

    if (req.url == '/') {
        html = `<html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body>
                </html>`;
    } else if (req.url  == '/livros') {
        html = `<html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Lista de Livros </h1>
                    </body>
                </html>`;
    }

    res.end(html);
});
servidor.listen(PORT);


