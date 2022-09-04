const express = require('express');
const storesController = require('../controllers/store');
const { validateStore } = require('../validators/store');
const { validateUsernameAndPassword } = require('../validators/user');

const router = express.Router();

router.get('/', validateUsernameAndPassword, storesController.getStores);
router.post('/', validateUsernameAndPassword, validateStore, storesController.createStore);

module.exports = router;
