import {DataTypes} from 'sequelize';
import sequelize from '../config/conexao.js';

const Mensagem = sequelize.define('Mensagem', {
    id: {
        type: DataTypes.INTEGER,
        allownull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allownull: false,
        references: {
            model: 'Usuario',
            key: 'id',
        },
    },
    titulo: {
        type: DataTypes.STRING(50),
    },
    mensagem: {
        type: DataTypes.STRING,
        allownull: false,
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allownull: false,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'Mensagem',
});

// Criar a tabela
// Mensagem.sync({force: true});

export default Mensagem;
