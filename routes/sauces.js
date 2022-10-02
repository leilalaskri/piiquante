const express = require('express');
const router = express.Router();

const sauces = require('../models/sauces');

router.post('/', (req, res, next) => {
    const sauces = new sauces({});
    sauces.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.get('/:id', (req, res, next) => {
    sauces.findOne({
        _id: req.params.id
    }).then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

router.put('/:id', (req, res, next) => {
    const sauces = new sauces({

    });
    sauces.updateOne({ _id: req.params.id }, sauces).then(
        () => {
            res.status(201).json({
                message: 'sauces updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.delete('/:id', (req, res, next) => {
    sauces.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.get('/' +
    '', (req, res, next) => {
        Thing.find().then(
            (things) => {
                res.status(200).json(things);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    });

module.exports = router;