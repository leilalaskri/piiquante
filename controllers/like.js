const sauces = require("../models/sauces");
exports.addLikeOrDislike = (req, res, next) => {
    if (req.body.likes == 1) {
        sauces.updateOne({ _id: req.params.id }, {
            // $push: { usersLiked: req.body.userId },
            $inc: { likes: req.body.likes },
        })

        .then(() => res.status(200).json({ message: "Objet modifié !" }))
            .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.likes == -1) {
        sauces.updateOne({ _id: req.params.id }, {
            //$push: { usersDisliked: req.body.userId },
            $inc: { dislikes: 1 },
        })

        .then(() => res.status(200).json({ message: "Objet modifié !" }))
            .catch((error) => res.status(400).json({ error }));
    }



    ;
}