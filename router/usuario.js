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

    if(cadastro == null) {
        res.status(400).json({error: 'Credenciais invalidas.'})
    } else {
        req.session.user = {
            id: cadastro.id,
            nome: cadastro.nome,
            sobrenome: cadastro.sobrenome,
            email: cadastro.email
        }
        res.redirect('usuario');
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
    } else {registrar
        res.status(400).json({error: 'Email ja cadastrado.'});
    }

});

router.get('/usuario', (req, res) => {
    if(req.session.user == undefined || req.session.user == null) {
        res.redirect('/login');
    } else {
        res.render('public/usuario.handlebars', {user:req.session.user});
    }
}); 

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

export default router;
