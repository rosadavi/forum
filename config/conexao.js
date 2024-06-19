import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host:'localhost',
    username: 'root',
    password: '',
    database: 'Forum'
});

export default sequelize;
