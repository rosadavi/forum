import express from 'express';
const app = express();

// Configurando Body-Parser
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando Express-Session
import session, { MemoryStore } from 'express-session';
app.use(session({
    secret: "forum_faculdadecn",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore()
}));

// Configurando Flash
import flash from 'connect-flash';
app.use(flash());

// Configurando Middleware para Flash Messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("succes_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// Configurando arquivos Staticos
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Configurando Handlebars
import exphbs from 'express-handlebars';
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

// Configurando as Rotas
import usuario from './router/usuario.js';
app.use('/', usuario);

// Testando conexao com BANCO DE DADOS
import sequelize from './config/conexao.js';
sequelize.authenticate().then(() => {
    console.log('Banco de Dados Conectado');
}).catch(err => {
    console.error('Erro ao se conectar com o Banco de Dados', err);
});

// Iniciando o Servidor
const port = 3333;
app.listen(port, () => {
    console.log(`Servidor escutando na porta: http://localhost:${port}`);
});
