import {DataTypes} from 'sequelize';
import sequelize from '../config/conexao.js';

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allownull: false,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(50),
        allownull: false,
    },
    sobrenome: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(100),
        allownull: false,
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Usuario',
});

// Criar a tabela.
// Usuario.sync({forece: true});

export default Usuario;
