const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserExpectation = sequelize.define(
    "UserExpectation",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      preferred_age_min: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      preferred_age_max: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      preferred_height_min: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      preferred_height_max: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      // preferred_caste: {
      //   type: DataTypes.ENUM("General", "OBC", "SC", "ST"),
      //   allowNull: true,
      // },
      // preferred_religion: {
      //   type: DataTypes.ENUM("Hindu", "Christian", "Muslim", "Other"),
      //   allowNull: true,
      // },
      // preferred_education: {
      //   type: DataTypes.ENUM("Bachelors", "Masters", "PhD", "Other"),
      //   allowNull: true,
      // },
      // preferred_occupation: {
      //   type: DataTypes.ENUM(
      //     "Private Job",
      //     "Government Job",
      //     "Business",
      //     "Other"
      //   ),
      //   allowNull: true,
      // },
      preferred_caste: { type: DataTypes.STRING, allowNull: true },
      preferred_religion: { type: DataTypes.STRING, allowNull: true },
      preferred_education: { type: DataTypes.STRING, allowNull: true },
      preferred_occupation: { type: DataTypes.STRING, allowNull: true },
      preferred_salary_min: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      preferred_salary_max: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      preferred_location_city: { type: DataTypes.STRING, allowNull: true },
      preferred_location_state: { type: DataTypes.STRING, allowNull: true },
      preferred_location_country: { type: DataTypes.STRING, allowNull: true },
      other_expectations: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: "user_expectations",
      timestamps: true,
    }
  );
  return UserExpectation;
};
