'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    Organization: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Task)
    // associations can be defined here
  };
  return User;
};