'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {});
};
