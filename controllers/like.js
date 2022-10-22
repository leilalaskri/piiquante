const sauces = require("../models/sauces");

exports.addlikesOrdislikes = (req, res, next) => {
    sauces.findOne({
            _id: req.params.id,
        })
        .then((sauce) => {

            if (req.body.like == 1) {

                if ((!sauce.usersLiked.includes(req.body.userId)) && (!sauce.usersDisliked.includes(req.body.userId))) {
                    sauces.updateOne({ _id: req.params.id }, {
                        $push: { usersLiked: req.body.userId },
                        $inc: { likes: req.body.like },
                    })

                    .then(() => res.status(201).json({ message: "Objet modifié !" }))
                        .catch((error) => res.status(400).json({ error }))
                } else { res.status(401).json({ message: "utilisateur a deja liké!" }) }
            };
            if (req.body.like == -1) {
                if ((!sauce.usersLiked.includes(req.body.userId)) && (!sauce.usersDisliked.includes(req.body.userId))) {
                    sauces.updateOne({ _id: req.params.id }, {
                            $push: { usersDisliked: req.body.userId },
                            $inc: { dislikes: req.body.like },

                        })
                        .then(() => res.status(201).json({ message: "Objet modifié !" }))
                        .catch((error) => res.status(400).json({ error }))
                } else { res.status(401).json({ message: "utilisateur a deja liké!" }) }
            };
            if (req.body.like == 0) {
                /////////
                if ((sauce.usersLiked.includes(req.body.userId))) {
                    sauces.updateOne({ _id: req.params.id }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        })
                        .then(() => res.status(201).json({ message: "utilisateur a enlevé like !" }))
                        .catch((error) => res.status(400).json({ error }));
                }
                //////////////
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    sauces.updateOne({ _id: req.params.id }, {
                            $inc: { dislikes: 1 },
                            $pull: { usersDisliked: req.body.userId }
                        })
                        .then(() => res.status(201).json({ message: "utilisateur a enlevé dislike " }))
                        .catch((error) => res.status(400).json({ error }))
                } else { res.status(401).json({ message: "utilisateur n'a pas liké ou disliké" }) }
            };

        })

}