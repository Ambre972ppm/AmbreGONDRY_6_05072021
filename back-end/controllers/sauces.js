const Sauce = require('../models/sauce');//récupération du modèle
const fs = require('fs');//récupération de 'file system' qui permet la gestion des images

exports.createSauce = (req, res, next) => {//création d'une nouvelle sauce
  const sauceObject = JSON.parse(req.body.sauce);//on récupère les données envoyés par le front et on le retourne en objet
  delete sauceObject._id;//on supprime l'id généré par défaut car un nouvel id est créé par la BDD

  const sauce = new Sauce({//notre nouvelle sauce créé suis notre modèle
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,//résolution de l'url de l'image
    
  });
    sauce.save() // sauvegarde de la sauce dans la base de données
          .then(() => res.status(201).json({message: 'Sauce enregistrée ! '}))
          .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {// modification de la sauce sélectionnée
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(sauce => res.status(200).json({ message: 'Sauce modifiée !' }))
      .catch(error => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => { // suppression de la sauce sélectionnée
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(sauce => res.status(200).json({message : 'Sauce supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => { // affichage de la sauce sélectionnés
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => { // affichage des sauces
    Sauce.find()
     .then(sauces => res.status(200).json(sauces))
     .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  const like = req.body.like //on récupère le vote
  const userId = req.body.userId //on récupère l'id de l'utilisateur
  const sauceId = req.params.id // on récupère l'id de la sauce pour laquelle on reçoit le vote

  if (like === 1) { //lorsque l'utilisateur LIKE

    Sauce.updateOne({
      _id: sauceId
    }, {
      $push: {usersLiked: userId},
      $inc: {likes: +1}, // On incrémente de 1
      })
      .then(() => res.status(200).json({message: 'like ajouté !'}))
      .catch((error) => res.status(400).json({ error }));

  }else if (like === -1) {//lorsque l'utilisateur DISLIKE

    Sauce.updateOne( 
        {
          _id: sauceId
        }, {
          $push: {usersDisliked: userId},
          $inc: {dislikes: +1}, // On incrémente de 1
        })
        .then(() => res.status(200).json({message: 'dislike ajouté !'}))
        .catch((error) => res.status(400).json({ error }));
    
  }else if (like === 0) {// Annulation des votes    
    Sauce.findOne({
        _id: sauceId
      })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {// Annulation d'un LIKE

          Sauce.updateOne({
              _id: sauceId
          }, {
            $pull: {usersLiked: userId},
            $inc: {likes: -1}, // On incrémente de -1
          })
            .then(() => res.status(200).json({message: 'Like annulé !'}))
            .catch((error) => res.status(400).json({ error }));

        }else if (sauce.usersDisliked.includes(userId)) {// Annulation d'un DISLIKE

          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {usersDisliked: userId},
              $inc: {dislikes: -1}, // On incrémente de -1
            })
            .then(() => res.status(200).json({message: 'Dislike annulé !'}))
            .catch((error) => res.status(400).json({ error }));

        }
      })
      .catch((error) => res.status(404).json({ error }));
  }
};