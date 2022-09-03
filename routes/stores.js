const express = require('express');
const router = express.Router();
const storesController = require('../controllers/store')

router.get('/', storesController.getStores);
router.post('/', storesController.createStore);

module.exports = router;
