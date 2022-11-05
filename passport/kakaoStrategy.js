const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID, //kakao측에
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => { // O-Auth2에서 사용
    //      토큰으로 요청하는 경우에 사용함.. 
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' }, //카카오로 가입한 사람이 있는지 먼저 확인부터 하고
      });           
      if (exUser) {//카카오로 가입한적 있으면
        done(null, exUser); // 성공
      } else { //없으면 가입시키기
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
