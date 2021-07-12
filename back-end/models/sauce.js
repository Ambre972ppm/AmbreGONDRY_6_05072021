const mongoose = require('mongoose'); // récupération du package mongoose pour facilité les échanges avec la Base de données
const sanitizerPlugin = require('mongoose-sanitizer-plugin'); // plugin permettant la desinfection des champs

const sauceSchema = mongoose.Schema({
    userId: { type : String, required: true },
    name: { type : String, required: true },
    manufacturer: { type : String, required: true },
    description: { type : String, required: true },
    mainPepper: { type : String, required: true },
    imageUrl: { type : String, required: true },
    heat: { type : Number, required: true },
    likes: { type : Number, required: true },
    dislikes: { type : Number, required: true },
    usersLiked: { type : [String], required: true },
    usersDisliked: { type : [String], required: true },
});

sauceSchema.plugin(sanitizerPlugin); // Utilise le désinfectant HTML de Google Caja pour effectuer la désinfection

module.exports = mongoose.model('Sauce', sauceSchema);