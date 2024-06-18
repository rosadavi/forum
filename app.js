import sequelize from './config/conexao.js';

sequelize.authenticate().then(() => {
    console.log('Banco de Dados Conectado');
}).catch( err => {
    console.error('Erro ao se conectar com o Banco de Dados', err);
});