const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: {type: [String], default: []}, //Aqui eu defino o tipo do campo tags como um array de strings, e defino o valor padrão como um array vazio
    isPinned: {type: Boolean, default: false},
    userId: {type: String, required: true}, 
    createdOn: {type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model('Note', noteSchema);