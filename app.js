// Configurando EXPRESS.
import express from 'express';
const app = express();
const port = 3333;

import usuario from './router/usuario.js';
app.use('/', usuario);

app.listen(port, () => {
    console.log(`Servidor escutando na porta: http://localhost:${port}`);
});

// Configurando Handlebars.
import exphbs from 'express-handlebars';
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

// Testando conexao com BANCO DE DADOS.
import sequelize from './config/conexao.js';

sequelize.authenticate().then(() => {
    console.log('Banco de Dados Conectado');
}).catch( err => {
    console.error('Erro ao se conectar com o Banco de Dados', err);
});
