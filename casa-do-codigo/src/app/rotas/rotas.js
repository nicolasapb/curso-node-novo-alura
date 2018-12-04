const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

module.exports = app => {

    app.get('/', function(req, res) {
        res.send(
            `<html>
              <head>
                <meta charset="utf-8">
             </head>
             <body>
                <h1> Casa do Código </h1>
             </body>
            </html>`
        );
    });
    
    app.get('/livros', function(req, res) {

        const livroDao = new LivroDao(db);

        livroDao
            .lista()
            .then(livros => res.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros
                }
            ))
            .catch(erro => console.log('algo deu errado:', erro));  
    });

    app.get('/livros/form/:id', (req, res) => {

        const id = req.params.id;

        if (!id) {
            return res.status(404).end();
        }

        const livroDao = new LivroDao(db);
        
        livroDao
            .buscaPorId(id)
            .then(livro => {
                if (!livro) return res.status(404).end();

                res.marko(
                    require('../views/livros/form/form.marko'),
                    {
                        livro
                })
            })
            .catch(erro => console.log('algo deu errado:', erro));
    });

    app.get('/livros/form', (req, res) => 
        res.marko(require('../views/livros/form/form.marko'), { livro: {} })
    );

    app.post('/livros', (req, res) => { 

        const livroDao = new LivroDao(db);

        livroDao
            .adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log('algo deu errado:', erro));        
    });

    app.put('/livros', (req, res) => { 

        const livroDao = new LivroDao(db);

        livroDao
            .atualiza(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log('algo deu errado:', erro));        
    });

    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;

        const livroDao = new LivroDao(db);

        livroDao
            .remove(id)
            .then(() => res.status(200).end())
            .catch(erro => console.log('algo deu errado:', erro));
    });
};