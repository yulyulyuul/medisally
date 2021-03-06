module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define(
    "User",
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designatedSex: {
        type: DataTypes.ENUM("female", "male"),
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UUID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {}
  );
  user.associate = function (models) {
    user.hasMany(models.SymptomType, {
      foreignKey: "userUUID",
      sourceKey: "UUID",
    });
    user.hasMany(models.Symptom, {
      foreignKey: "userUUID",
      sourceKey: "UUID",
    });
    user.hasMany(models.Treat, {
      foreignKey: "userUUID",
      sourceKey: "UUID",
    });
    user.hasMany(models.TreatType, {
      foreignKey: "userUUID",
      sourceKey: "UUID",
    });
  };
  return user;
};
