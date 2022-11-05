const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);// 세션에 유저 아이디만 저장
  });

  passport.deserializeUser((id, done) => {//로그인 이후 요청부터 여기가 실행됨. (패스포트가 세션을 이용하여 아이디를 알아냄)
    User.findOne({ where: { id } })//아이디를 찾아서
      .then(user => done(null, user)) // 유저의 전체 정보를 가져옴 req.user, res.isAuthenticated() 
      .catch(err => done(err));
  });// 로그인상태검증할 수 있음 

  local();
//   kakao();
};
//app.js에서 실행!