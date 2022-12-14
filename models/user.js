const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      userName: {
        type: Sequelize.STRING(15)
      },
      memberType: {
        type: Sequelize.STRING(15),
        defaultValue: 'default'
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phone: {
        type: Sequelize.INTEGER(12),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      allowPrivacy : {
        type: BOOLEAN,
        defaultValue: true
      },
      allowService : {
        type: BOOLEAN,
        defaultValue: true
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Test);
  }
};
