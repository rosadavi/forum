import express from 'express';
import Usuario from '../models/Usuario.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.render('public/index.handlebars');
});

router.get('/login', (req, res) => {
    res.render('public/login.handlebars');
});

router.get('/registrar', (req, res) => {
    res.render('public/registrar.handlebars');
});

router.post('/registrar', (req, res) => {
    const {nome, sobrenome, email, senha} = req.body;

    // Usuario.create({
    //     nome: nome,
    //     sobrenome: sobrenome,
    //     email: email,
    //     senha: senha,
    // });

    // res.send('Usuario cadastrado com sucesso.');
    res.send(req.body);
});

export default router;
