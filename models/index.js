const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
// config/config.json에서 db 설정 불러온 후 new Sequelize를 통해 MySql 연결 객체를 생성
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
// 연결 객체 재사용을 위하여 db.sequelize에 넣어둠
db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;

// 각각의 모델의 static.init 메서드를 호출한다. init이 실행되어야 테이블이 모델로 연결된다.
User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
