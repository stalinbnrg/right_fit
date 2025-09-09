const express = require("express");
const router = express.Router();
const expectationController = require("../controllers/expectationController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, expectationController.getOurExpectation);
router.put("/", auth, expectationController.createOrUpdateExpectation);

module.exports = router;