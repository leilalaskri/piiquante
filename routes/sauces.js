const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces.js');

//router.get('/', auth, saucesCtrl.getAllsauces);
router.post('/', auth, multer, saucesCtrl.createsauces);
//router.get('/:id', auth, saucesCtrl.getOnesauces);
router.put('/:id', auth, saucesCtrl.modifysauces);
router.delete('/:id', auth, saucesCtrl.deletesauces);

module.exports = router;