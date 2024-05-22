const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Aqui eu defino o schema do usuário, que é o modelo do usuário que vai ser salvo no banco de dados
const userSchema = new Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    createdOn: {type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model('User', userSchema);