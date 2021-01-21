const Sauce = require('../models/sauce');

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    if (req.body.like === 1) {
      Sauce.updateOne({ _id: req.params.id }, { $inc:{likes: 1}, $push:{usersLiked: req.body.userId}})
        .then(() => res.status(201).json('Like added !'))
        .catch(error => res.status(400).json({ error }));
    }
    else if (req.body.like === -1) {
      Sauce.updateOne({ _id: req.params.id }, { $inc:{dislikes: 1}, $push:{usersDisliked: req.body.userId}})
        .then(() => res.status(201).json('Dislike added !'))
        .catch(error => res.status(400).json({ error }));
    }
    else {
      if (sauce.usersLiked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, { $inc:{likes: -1}, $pull:{usersLiked: req.body.userId}})
        .then(() => res.status(201).json('Like deleted !'))
        .catch(error => res.status(400).json({ error }));
      }
      else if (sauce.usersDisliked.includes(req.body.userId)) {
        Sauce.updateOne({ _id: req.params.id }, { $inc:{dislikes: -1}, $pull:{usersDisliked: req.body.userId}})
        .then(() => res.status(201).json('Dislike deleted !'))
        .catch(error => res.status(400).json({ error }));
      }
    }
  })
  .catch(error => res.status(404).json({ error }));
};

