const Card = require('../models/cardModel');
const AlienCardError = require('../castomErrors/AlienCardError');
const { SUCCES_CREATE_STATUS } = require('../helpers/constants');
const { checkExistence, checkHandleSend, handleError } = require('../helpers/utils');
const NotFoundCardError = require('../castomErrors/NotFoundErrors/NotFoundCardError');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.status(SUCCES_CREATE_STATUS).send({ data: card }))
    .catch((err) => handleError(err, req, res, next));
};

module.exports.deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .then((card) => {
      checkExistence(card, NotFoundCardError);
      if (card.owner.toString() === req.user._id) {
        return card.deleteOne();
      }
      throw new AlienCardError();
    })
    .then((data) => res.send({ data }))
    .catch(next);
};

module.exports.setLike = (req, res, next) => {
  checkHandleSend(Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ), res, next, NotFoundCardError);
};

module.exports.deleteLike = (req, res, next) => {
  checkHandleSend(Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ), res, next, NotFoundCardError);
};
