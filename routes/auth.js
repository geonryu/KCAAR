const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn, isSuperAdmin } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const response_key = req.body["g-recaptcha-response"];
  const recaptcha_key = process.env.RECAPTCHA_SECRET;
  const baseURL = `https://www.google.com/recaptcha/api/siteverify?=secret${recaptcha_key}&response=${response_key}`;

  const { email, userName, memberType, phone, password } = req.body;
  try {
    console.log(response_key, "??");
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.send("<script>alert('존재하는 이메일입니다.'); location.href='/join'</script>");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      userName,
      memberType,
      phone,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/');
  });
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
