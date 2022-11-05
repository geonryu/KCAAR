const express = require('express');
const { isLoggedIn, isNotLoggedIn, isSuperAdmin } = require('./middlewares');
const { User, Post } = require('../models');
const Test = require('../models/request')
const path = require('path');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/', isLoggedIn , async (req, res, next) => {
  try {
    if(req.user.memberType === "super"){
      res.render('admin', { title: '회원가입 - NodeBird' });
    } else {
      res.send("<script>alert('접근권한이 없습니다.'); location.href='/'</script>");
    }
  } catch (err) {
    next(err);
  }
  // console.log(res.locals.user)
});

router.get('/memberAdmin', isLoggedIn, async (req, res) => {
  try {
    if(req.user.memberType === "super"){
      const members = await User.findAll({
        attributes: ['email', 'userName', 'memberType', 'phone', 'createdAt'],
        order: [['createdAt', 'DESC']],
      })
      res.render('memberAdmin', { 
        title: '회원가입 - NodeBird',
        members : members,
      });
    } else {
      res.send("<script>alert('접근권한이 없습니다.'); location.href='/'</script>");
    }
    
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/libraryAdmin', isLoggedIn, async (req, res) => {
  // res.render('libraryAdmin', { title: '회원가입 - NodeBird' });
  try {
    if(req.user.memberType === "super"){
      const libraries = await Post.findAll({
        attributes: ['id','author', 'category', 'title', 'attach1', 'attach2', 'attach3','createdAt', 'content'],
        order: [['createdAt', 'DESC']],
      })
      res.render('libraryAdmin', { 
        title: '회원가입 - NodeBird',
        libraries : libraries,
      });
    } else {
      res.send("<script>alert('접근권한이 없습니다.'); location.href='/'</script>");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/contactAdmin', isLoggedIn, async (req, res) => {
  try {
    if(req.user.memberType === "super"){
      const requests = await Test.findAll({
        attributes: [
          'id',
          'clientCompany',
          'clientBizNumber',
          'clientName',
          'clientPhone',
          'clientEmail',
          'deviceName',
          'softwareName',
        ],
        order: [['createdAt', 'DESC']],
      })
      res.render('contactAdmin', { 
        title: '회원가입 - NodeBird',
        requests : requests,
      });
    } else {
      res.send("<script>alert('접근권한이 없습니다.'); location.href='/'</script>");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/contactAdmin/preview/:id', async (req, res) => {
  try {
    console.log("Booom!!")
    if(req.user.memberType === "super"){
      const request = await Test.findOne({
        attributes: [
          'clientCompany',
          'clientBizNumber',
          'clientAddress',
          'clientName',
          'clientPhone',
          'clientEmail',
          'deviceName',
          'deviceMeasureHeight',
          'deviceMeasureWidth',
          'deviceMeasureDepth',
          'deviceDisplayOffset',
          'deviceDisplayWidth',
          'deviceDisplayHeight',
          'deviceControllerHeight',
          'deviceControllerOffset',
          'deviceControllerCounts',
          'softwareName',
          'softwareResolutionWidth',
          'softwareResolutionHeight',
          'softwarePages',
          'userMessage',
        ],
        where : {
          id:req.params.id
        }
      })
      res.render('contactPreview', { 
        title: '회원가입 - NodeBird',
        request : request,
      });
    } else {
      res.send("<script>alert('접근권한이 없습니다.'); location.href='/'</script>");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/postAdmin', (req, res) => {
  res.render('postAdmin', { title: '회원가입 - NodeBird' });
});

module.exports = router;