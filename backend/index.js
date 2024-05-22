require('dotenv').config();
//Aqui eu importo o dotenv, que é um módulo que permite que eu defina variáveis de ambiente no arquivo .env e as utilize no meu código
const config = require('./config.json');
const mongoose = require('mongoose');
//Aqui eu conecto o mongoose ao banco de dados, o método connect recebe a string de conexão que está no arquivo config.json
mongoose.connect(config.connectionString);

const User = require('./models/user.model');

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utilities');

//Aqui eu defino o express.json() que é um middleware que permite que o express entenda requisições no formato json, sem ele o express não consegue entender requisições no formato json
app.use(express.json());
//Aqui eu defino o cors, que é um middleware que permite que o front-end acesse o back-end, sem ele o front-end não consegue acessar o back-end
app.use(
    cors({
        origin: "*", //Aqui eu defino o origin como "*", isso permite que qualquer front-end acesse o back-end
    })
)
//Aqui eu defino a rota principal, que é a rota raiz, que é a rota que o usuário vai acessar para ver a aplicação
app.get('/', (req, res) => {
    res.json({
        data: "hello world!"
    });
});

// Criar a conta 
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "Missing required information" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m", //Aqui eu defino o tempo de expiração do token em milissegundos (10 horas) 
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Account created successfully",
    });
});
//Aqui eu defino a rota de login, que é a rota que o usuário vai acessar para fazer login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required information" });
    }

    const userInfo = await User.findOne({ email: email });
    //Aqui eu verifico se o usuário existe, se não existir eu retorno uma mensagem de erro
    if (!userInfo) {
        return res.json({
            error: true,
            message: "User does not exist",
        });
    }
    //Aqui eu verifico se o email e a senha que o usuário digitou são iguais ao email e senha do usuário que está no banco de dados
    if (userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            user: userInfo,
            accessToken,
            message: "Login successful",
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid email or password",
        });
    } 
});               

//Aqui eu defino s porta que o servidor vai rodar, listen é uma função do express que recebe a porta e inicia o servidor
app.listen(8000);
//Exportando o app para ser utilizado em outros arquivos
module.exports = app;
