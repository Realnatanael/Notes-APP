const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; //Pega o header de autorização da requisição que é o token
    const token = authHeader && authHeader.split(' ')[1]; //Pega o token do header de autorização da requisição e verifica se ele existe e se ele é válido (se ele foi enviado no header de autorização) 
    if (!token) return res.sendStatus(401); //Se o token não existir, ele retorna um status 401 (não autorizado)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { //Se o token existir, ele verifica se o token é válido, se não for válido ele retorna um erro
        if (err) return res.sendStatus(403); //Se o token não for válido, ele retorna um status 403 (proibido)
        req.user = user; //Se o token for válido, ele passa o usuário que está no token para a requisição
        next(); //E chama o próximo middleware
    });
}

module.exports = {
    authenticateToken
};