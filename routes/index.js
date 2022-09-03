const express = require('express');
const router = express.Router();
const storeRoutes = require('./stores')

router.use('/health-check', (req, res) => res.status(200).send('OK'));
router.use('/stores', storeRoutes)

module.exports = router;
