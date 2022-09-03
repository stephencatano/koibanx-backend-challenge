const express = require('express');
const router = express.Router();
const storesController = require('../controllers/store')
const { validateUserAndPassword } = require('../middlewares/auth')

router.get('/', validateUserAndPassword, storesController.getStores);
router.post('/', validateUserAndPassword, storesController.createStore);

module.exports = router;
