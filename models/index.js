const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
console.log(env, config);
const User = require('./user');
const Post = require('./post');
const Test = require('./request');
// const Managers = require('./managers');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Test = Test;

User.init(sequelize);
Post.init(sequelize);
Test.init(sequelize);

User.associate(db);
Post.associate(db);
Test.associate(db);

module.exports = db;
