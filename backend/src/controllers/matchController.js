const {UserProfile, UserExpectation} = require("../models/");
const {scoreCandidate} = require("../services/matchService");
const {Op, where} = require("sequelize");

exports.getMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get my expectation
    const myExpectation = await UserExpectation.findOne({ where: { user_id: userId } });
    if (!myExpectation) {
      return res.status(400).json({ message: "Set your expectations first" });
    }

    // Fetch my own profile (so frontend knows for whom matches are being calculated)
    const myProfile = await UserProfile.findOne({ where: { id: userId } });

    // Fetch other users with expectations
    const otherProfiles = await UserProfile.findAll({
      where: { id: { [Op.ne]: userId } },
      include: [{ model: UserExpectation, as: "expectation" }],
    });

    // Score candidates
    const scored = otherProfiles.map((p) => {
      const score = p.expectation ? scoreCandidate(p, myExpectation) : 0;
      return { profile: p, score };
    });

    // Sort by best match
    scored.sort((a, b) => b.score - a.score);

    return res.json({
      baseUser: {
        id: myProfile?.id,
        name: myProfile?.name,
        gender: myProfile?.gender,
        email: myProfile?.email,
      },
      matches: scored,
    });
  } catch (err) {
    console.error("Error in getMatches:", err);
    return res.status(500).json({ message: "Failed to fetch matches" });
  }
};
