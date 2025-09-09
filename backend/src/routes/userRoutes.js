const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get('/getOurProfile', auth, userController.getOurProfile);
router.put('/updateOurProfile', auth, userController.updateOurProfile);
router.get('/:id', auth, userController.getProfileById);
module.exports = router;