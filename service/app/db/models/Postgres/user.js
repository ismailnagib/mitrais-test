/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    mobileNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    gender: {
      allowNull: true,
      type: DataTypes.ENUM('MALE', 'FEMALE'),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    }
	}, {
		tableName: 'user',
		timestamps: false
	});
};
