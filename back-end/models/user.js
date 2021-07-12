const mongoose = require('mongoose'); // récupération du package mongoose pour facilité les échanges avec la Base de données
const uniqueValidator = require('mongoose-unique-validator'); // récupération du package uniqueValidator
const sanitizerPlugin = require('mongoose-sanitizer-plugin'); // plugin permettant la desinfection des champs

const userSchema = mongoose.Schema({
    email: { type : String, required: [true, "Veuillez renseigner votre adresse email"], unique: true, match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Veuillez renseigner une adresse mail correcte"] },
    password: { type : String, required: [true, "Veuillez choisir votre mot de passe"] },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema);

