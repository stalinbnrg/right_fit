const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserProfile = sequelize.define(
    "UserProfile",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: { type: DataTypes.STRING, allowNull: false },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      dob: { type: DataTypes.DATEONLY, allowNull: false },
      age: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone_number: { type: DataTypes.STRING, allowNull: true, unique: true },
      // caste: {
      //   type: DataTypes.ENUM("General", "OBC", "SC", "ST"),
      //   allowNull: true,
      // },
      // religion: {
      //   type: DataTypes.ENUM("Hindu", "Christian", "Muslim", "Other"),
      //   allowNull: true,
      // },
      // education: {
      //   type: DataTypes.ENUM("Bachelors", "Masters", "PhD", "Other"),
      //   allowNull: true,
      // },
      // specification: { type: DataTypes.STRING, allowNull: true },
      // occupation: {
      //   type: DataTypes.ENUM(
      //     "Private Job",
      //     "Government Job",
      //     "Business",
      //     "Other"
      //   ),
      //   allowNull: true,
      // },
      caste: { type: DataTypes.STRING, allowNull: true },
      religion: { type: DataTypes.STRING, allowNull: true },
      education: { type: DataTypes.STRING, allowNull: true },
      occupation: { type: DataTypes.STRING, allowNull: true },
      salary: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      marital_status: {
        type: DataTypes.ENUM("Single", "Divorced", "Widowed"),
        allowNull: true,
      },
      height_cm: { type: DataTypes.INTEGER, allowNull: true },
      weight_kg: { type: DataTypes.INTEGER, allowNull: true },
      hobbies: { type: DataTypes.TEXT, allowNull: true },
      about_me: { type: DataTypes.TEXT, allowNull: true },
      location_city: { type: DataTypes.STRING, allowNull: true },
      location_state: { type: DataTypes.STRING, allowNull: true },
      location_country: { type: DataTypes.STRING, allowNull: true },
      profile_photo_url: { type: DataTypes.STRING, allowNull: true },
    },
    {
      tableName: "user_profiles",
      timestamps: true,
    }
  );
  return UserProfile;
};
