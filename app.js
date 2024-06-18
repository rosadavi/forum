// Configurando EXPRESS.
import express from 'express';
const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Servidor escutando na porta: http://localhost:${port}`);
});


// Testando conexao com BANCO DE DADOS.
import sequelize from './config/conexao.js';

sequelize.authenticate().then(() => {
    console.log('Banco de Dados Conectado');
}).catch( err => {
    console.error('Erro ao se conectar com o Banco de Dados', err);
});
