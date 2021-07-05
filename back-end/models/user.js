const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type : String, required: [true, "Veuillez renseigner votre adresse email"], unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"] },
    password: { type : String, required: [true, "Veuillez choisir votre mot de passe"] },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

