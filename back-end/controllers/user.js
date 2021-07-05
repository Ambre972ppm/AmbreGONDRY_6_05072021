const bcrypt = require('bcrypt');// On utilise bcrypt pour hasher le mot de passe des utilisateurs

const User = require('../models/user');// On récupère notre modele User

const jwt = require('jsonwebtoken');// On utilise jsonwebtoken pour créer un token au user à l'inscription et à la connection

exports.signup = (req, res, next) => {//on crée notre nouvel utilisateur
    bcrypt.hash(req.body.password, 10)//on hash le mot de passe avec bcrypt, 10 est le nombre de tour qu'on fait faire à l'algorythme
        .then(hash =>{
            const user = new User({//création de l'utilisateur grâce à notre modèle
                email: req.body.email,//on passe l'email présent dans la requête
                password: hash//et le mot de passe encodé par bcrypt
            });
            user.save()//on enregistre l'utilisateur dans la base de donnée
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })//on récupère l'utilisateur dans la base de données
      .then(user => {
        if(!user){//si on ne le trouve pas on retourne une erreur
            return res.status(401).json({ error : 'Utilisateur non trouvé ! '})
        }
        bcrypt.compare(req.body.password, user.password)//les mots de passe entré et de la base de données sont comparés
            .then(valid => {
                if(!valid){//si la comparaison n'est pas bonne on renvoi une erreur
                    return res.status(401).json({ error : 'Mot de passe invalide ! '})
                }
                return res.status(200).json({// si c'est ok on lui retourne son userId et un token
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                        )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
      .catch(error => res.status(500).json({ error }));
};