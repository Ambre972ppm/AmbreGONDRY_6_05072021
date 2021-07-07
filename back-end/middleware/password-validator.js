const passwordSchema = require('../models/password');

// vérifie que le mot de passe valide le schema décrit
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message": "Votre mot de passe doit comporter au minimum 8 caractères comprenant au moins 1 majuscule, 1 minuscule et un chiffre sans espaces "}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};