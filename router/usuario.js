import express from 'express';
import Usuario from '../models/Usuario.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.render('public/index.handlebars');
});

router.get('/login', (req, res) => {
    res.render('public/login.handlebars');
});

router.post('/login', async(req, res) => {
    const {email, senha} = req.body;
    const cadastro = await Usuario.findOne({where: {
        email,
        senha
    }});

    if(Object.keys(cadastro).length <= 1) {
        res.status(400).json({error: 'Credenciais invalidas.'})
    } else {
        req.session.userId = cadastro.id;
        req.session.userNome = cadastro.nome;
        req.session.userSobrenome = cadastro.sobrenome;
        req.session.userEmail = cadastro.email
        res.render('public/usuario.handlebars');
    }

});

router.get('/registrar', (req, res) => {
    res.render('public/registrar.handlebars');
});

router.post('/registrar', async(req, res) => {
    const {nome, sobrenome, email, senha} = req.body;
    const emailCadastrado = await Usuario.findAll({where: {
        email
    }});
      
    if(Object.keys(emailCadastrado).length === 0) {
        Usuario.create({
            nome,
            sobrenome,
            email,
            senha,
        }); 
        res.send('Usuario cadastrado com sucesso.');
    } else {
        res.status(400).json({error: 'Email ja cadastrado.'});
    }

});

export default router;
