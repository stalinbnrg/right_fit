const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const auth = require('../middlewares/authMiddleware');
const { route } = require('./authRoutes');

router.get('/', auth, matchController.getMatches);

module.exports = router;