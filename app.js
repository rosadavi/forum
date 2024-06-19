// // Configurando EXPRESS.
// import express from 'express';
// const app = express();
// const port = 3333;

// import usuario from './router/usuario.js';
// app.use('/', usuario);

// app.listen(port, () => {
//     console.log(`Servidor escutando na porta: http://localhost:${port}`);
// });

// // Configurando Express-Session
// import session, { MemoryStore } from 'express-session';
// app.use(session({
//     secret: "forum_faculdadecn",
//     resave: false,
//     saveUninitialized: true,
//     store: new MemoryStore()
// }));

// // Configurando Flash
// import flash from 'connect-flash';
// app.use(flash());

// // Configurando Middleware
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash("succes_msg");
//     res.locals.error_msg = req.flash("error_msg");
//     next();
// });

// // Configurando Body-Parser
// import bodyParser from 'body-parser';
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// // Configurando arquivos Staticos
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, '/public')));
// app.use((req, res, next) =>{
//     next();
// });

// // Configurando Handlebars.
// import exphbs from 'express-handlebars';
// app.engine('handlebars', exphbs.engine({
//     defaultLayout: 'main',
//     runtimeOptions: {
//         allowProtoPropertiesByDefault: true,
//         allowProtoMethodsByDefault: true,
//     }
// }));
// app.set('view engine', 'handlebars');

// // Testando conexao com BANCO DE DADOS.
// import sequelize from './config/conexao.js';

// sequelize.authenticate().then(() => {
//     console.log('Banco de Dados Conectado');
// }).catch( err => {
//     console.error('Erro ao se conectar com o Banco de Dados', err);
// });
// Configurando EXPRESS.
import express from 'express';
import bodyParser from 'body-parser';
import session, { MemoryStore } from 'express-session';
import flash from 'connect-flash';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import sequelize from './config/conexao.js';
import usuario from './router/usuario.js';

const app = express();
const port = 3333;

// Configurando Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando Express-Session
app.use(session({
    secret: "forum_faculdadecn",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore()
}));

// Configurando Flash
app.use(flash());

// Configurando Middleware para Flash Messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("succes_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// Configurando arquivos Staticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Configurando Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

// Configurando as Rotas
app.use('/', usuario);

// Testando conexao com BANCO DE DADOS
sequelize.authenticate().then(() => {
    console.log('Banco de Dados Conectado');
}).catch(err => {
    console.error('Erro ao se conectar com o Banco de Dados', err);
});

// Iniciando o Servidor
app.listen(port, () => {
    console.log(`Servidor escutando na porta: http://localhost:${port}`);
});
