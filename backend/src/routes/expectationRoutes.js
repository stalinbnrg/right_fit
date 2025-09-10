const express = require("express");
const router = express.Router();
const expectationController = require("../controllers/expectationController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, expectationController.createOrUpdateExpectation);
router.get("/", auth, expectationController.getOurExpectation);
router.get("/:id", auth, expectationController.getOurExpectation);

module.exports = router;
