const app = require('./src/config/custom-express');

const PORT = '3000';

app.listen(PORT, function() {
    console.log(`Servidor rodando na porta ${PORT}`);
});

