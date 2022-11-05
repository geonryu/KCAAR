const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      author : {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(400),
        allowNull: false,
      },
      attach1: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      attach2: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      attach3: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      createdAt: {
        type : Sequelize.STRING(200),
        allowNull : false
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    // db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};
