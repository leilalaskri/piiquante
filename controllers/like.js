const sauces = require("../models/sauces");
//like=1

//aller chercher l'objet dans la base de données
sauces.findOne({ _id: requestAnimationFrame.params.id })
    .then((objet) => {
        if (!objet.usersLiked.includes(req.userId) && req.body.likes === 1) {
            //mis a jour bdd
            sauces.updateOne({ _id: req.params.id },

                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                .then(() => res.status(201).json({ message: 'sauces like+1' }))
                .catch((error) => res.status(400).json({ error }));
        };


        //like=0 likes =0 pas de vote

        if (objet.usersLiked.includes(req.userId) && req.body.likes === 0) {
            //mis a jour bdd
            sauces.updateOne({ _id: req.params.id },

                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                .then(() => res.status(201).json({ message: "sauces like 0" }))
                .catch((error) => res.status(400).json({ error }));
        };



        //like=-1 dislike=+1
        if (!objet.usersDisLiked.includes(req.userId) && req.body.likes === -1) {
            //mis a jour bdd
            sauces.updateOne({ _id: req.params.id },

                    {
                        $inc: { dislikes: 1 },
                        $push: { usersDisLiked: req.body.userId }
                    }
                )
                .then(() => res.status(201).json({ message: 'sauces dislike+1' }))
                .catch((error) => res.status(400).json({ error }));
        };

        //apres un like =-1 on met un like =0 likes=0 pas de vote on enleve le dislike
        //like=0 likes =0 pas de vote

        if (objet.usersLiked.includes(req.userId) && req.body.likes === 0) {
            //mis a jour bdd
            sauces.updateOne({ _id: req.params.id },

                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisLiked: req.body.userId }
                    }
                )
                .then(() => res.status(201).json({ message: "sauces dislike 0" }))
                .catch((error) => res.status(400).json({ error }));
        };
    })
    .catch((error) => res.status(404).json({ error }));