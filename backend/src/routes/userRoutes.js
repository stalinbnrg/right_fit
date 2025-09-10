const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get('/me', auth, userController.getOurProfile);
router.put('/:id', auth, userController.updateProfileById);
router.get('/:id', auth, userController.getProfileById);
module.exports = router;