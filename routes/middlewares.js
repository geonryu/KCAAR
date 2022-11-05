// const { User } = require('../models');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("<script>alert('로그인 페이지로 이동합니다.'); location.href='/login'</script>");
    // res.send("<script>window.location='/login'</script>");
  }
};

exports.isSuperAdmin = (req, res, next) => {
  if (true) {
    next();
  } else {
    res.send("<script>alert('접근 권한이 없습니다.'); location.href='/login'</script>");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
