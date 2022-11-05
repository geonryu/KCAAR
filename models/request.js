const Sequelize = require('sequelize');

module.exports = class Test extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      clientCompany : {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      clientBizNumber: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      clientAddress: {
        type: Sequelize.STRING(140),
        allowNull: true,
      },
      clientName: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clientPhone: {
        type: Sequelize.INTEGER(30),
        allowNull: true,
      },
      clientEmail: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      deviceName: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      deviceMeasureHeight: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      deviceMeasureWidth: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      deviceMeasureDepth: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      deviceDisplayOffset: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      deviceDisplayWidth: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      deviceDisplayHeight: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      deviceControllerHeight: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      deviceControllerOffset: {
        type: Sequelize.INTEGER(10),
        allowNull : true
      },
      deviceControllerCounts: {
        type: Sequelize.INTEGER(10),
        allowNull : true
      },
      softwareName: {
        type: Sequelize.INTEGER(10),
        allowNull : true
      },
      softwareResolutionWidth: {
        type: Sequelize.INTEGER(10),
        allowNull : true
      },
      softwareResolutionHeight: {
        type: Sequelize.INTEGER(10),
        allowNull : true
      },
      softwarePages: {
        type: Sequelize.INTEGER(10),
        allowNull : true
      },
      userMessage: {
        type: Sequelize.STRING(200)
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Test',
      tableName: 'requests',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Test.belongsTo(db.User);
    // db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};
