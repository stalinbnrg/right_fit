const { UserExpectation } = require("../models");
const { body, validationResult } = require("express-validator");

// POST /api/expectation
exports.createOrUpdateExpectation = [
  body("preferred_age_min").optional().isInt({ min: 18 }),
  body("preferred_age_max").optional().isInt({ min: 18 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const userId = req.user.id;
      const payload = req.body;

      // Find existing expectation for this user
      let expectation = await UserExpectation.findOne({
        where: { user_id: userId },
      });

      if (expectation) {
        // Update existing record
        await expectation.update(payload);
      } else {
        // Create new record
        expectation = await UserExpectation.create({
          user_id: userId,
          ...payload,
        });
      }

      return res.json({
        message: "Expectation saved successfully",
        expectation,
      });
    } catch (err) {
      console.error("Error in createOrUpdateExpectation:", err);
      return res.status(500).json({ message: "Failed to save expectation", error: err.message });
    }
  },
];


//GET /api/expectations
exports.getOurExpectation = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id; // use param if exists, else logged-in user
    const expectation = await UserExpectation.findOne({ where: { user_id: userId } });
    if (!expectation) return res.status(404).json({ message: "Expectation not found" });
    return res.json(expectation);
  } catch (err) {
    console.error("Error in getOurExpectation:", err);
    return res.status(500).json({ message: "Failed to fetch expectation" });
  }
};
