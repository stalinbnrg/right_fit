const { sequelize } = require("../../config/db");
const UserProfileModel = require("./UserProfile");
const UserExpectationModel = require("./UserExpectation");

const UserProfile = UserProfileModel(sequelize);
const UserExpectation = UserExpectationModel(sequelize);

UserProfile.hasOne(UserExpectation, {
  foreignKey: "user_id",
  as: "expectation",
  onDelete: "CASCADE",
});
UserExpectation.belongsTo(UserProfile, {
  foreignKey: "user_id",
  as: "profile",
});

module.exports = { sequelize, UserProfile, UserExpectation };