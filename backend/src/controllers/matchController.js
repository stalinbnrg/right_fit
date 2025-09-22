const { UserProfile, UserExpectation } = require("../models");
const { scoreCandidate } = require("../services/matchService");
const { Op } = require("sequelize");

exports.getMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get my profile
    const myProfile = await UserProfile.findByPk(userId, {
      include: [{ model: UserExpectation, as: "expectation" }],
    });

    if (!myProfile) return res.status(404).json({ message: "User profile not found" });

    const myExpectation = myProfile.expectation;
    if (!myExpectation) return res.status(400).json({ message: "Set your expectations first" });

    // 2. Opposite gender filter
    let oppositeGender = null;
    if (myProfile.gender === "Male") oppositeGender = "Female";
    else if (myProfile.gender === "Female") oppositeGender = "Male";

    // 3. Fetch other profiles
    const otherProfiles = await UserProfile.findAll({
      where: {
        id: { [Op.ne]: userId },
        ...(oppositeGender ? { gender: oppositeGender } : {}),
      },
      include: [{ model: UserExpectation, as: "expectation" }],
    });

    // 4. Score candidates
    const scored = otherProfiles
      .map((p) => {
        const score = p.expectation ? scoreCandidate(p, myExpectation) : 0;
        return { profile: p, score };
      })
      // 5. Filter out low score matches (<30%)
      .filter((m) => m.score >= 30)
      // 6. Sort by score descending
      .sort((a, b) => b.score - a.score);

    return res.json({
      baseUser: {
        id: myProfile.id,
        name: myProfile.full_name,
        gender: myProfile.gender,
        email: myProfile.email,
      },
      matches: scored,
    });
  } catch (err) {
    console.error("Error in getMatches:", err);
    return res.status(500).json({ message: "Failed to fetch matches" });
  }
};
