import express from 'express';
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

export default router;
