class LivroDao {
    
    constructor(db) {
        this._db = db;
    }

    lista() {

        const select_query =  'SELECT * FROM livros';

        return new Promise((resolve, reject) => {
            this._db.all(
                select_query,
                (erro, resultados) => {
                    if (erro) return reject(erro); 

                    return resolve(resultados);
                }
            );
        });
    }

    adiciona(livro) {

        const insert_query = 'INSERT INTO livros (titulo, preco, descricao) values (?,?,?)'; 

        return new Promise((resolve, reject) => {
            this._db.run(insert_query, // insert into livros...
                [ 
                    livro.titulo, 
                    livro.preco, 
                    livro.descricao 
                ],
                (erro) => {
                    if (erro) return reject(erro);
                    return resolve();
                }
            );
        });
    }

    buscaPorId(id) {

        const id_sel_query = 'SELECT * FROM livros WHERE id = ?';

        return new Promise((resolve, reject) => {
            this._db.get(
                id_sel_query,
                [
                    id
                ],
                (erro, result) => {
                    if (erro) return reject(erro);
                    return resolve(result);
                }
            );
        });
    }

    atualiza(livro) {

        const update_query = 'UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            this._db.run(update_query, 
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (erro) => {
                    if (erro) return reject(erro);
                    return resolve()
                }
            );
        });
    }

    remove(id) {

        const delete_query = 'DELETE FROM livros WHERE id = ?';

        return new Promise((resolve, reject) => {
            this._db.run(delete_query,
                [
                    id
                ],
                (erro) => {
                    if (erro) return reject(erro);
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivroDao;