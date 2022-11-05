const express = require('express');
const { isLoggedIn, isNotLoggedIn, isSuperAdmin } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');///

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
 // res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/accessibilities', (req, res) => {
  res.render('accessibilities', { title: '회원가입 - NodeBird' });
});
router.get('/center', (req, res) => {
  res.render('center', { title: '회원가입 - NodeBird' });
});
router.get('/library', async (req, res) => {
  try {
    const libraries = await Post.findAll({
      attributes: ['author', 'category', 'title', 'attach1', 'attach2', 'attach3','createdAt', 'content', 'id'],
      order: [['createdAt', 'DESC']],
    })
    res.render('library', { 
      title: '회원가입 - NodeBird',
      libraries : libraries,
    });
   
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/library/:id', async (req, res) => {
  try {
    const thePost = await Post.findOne({
      attributes : ['id', 'author', 'category', 'title', 'content', 'attach1', 'attach2', 'attach3', 'createdAt'],
      where : {
        id:req.params.id
      }
    });
    res.render('post', { 
      title: '회원가입 - NodeBird',
      postData : thePost,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/contact', (req, res) => {
  res.render('contact', { title: '회원가입 - NodeBird' });
});
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', { title: '회원가입 - NodeBird' });
});
router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', async (req, res, next) => {
  res.render('main', {
    title: 'NodeBird',
  });
  // try {
  //   const posts = await Post.findAll({
  //     include: {
  //       model: User,
  //       attributes: ['id'],
  //     },
  //     order: [['createdAt', 'DESC']],
  //   });
  //   res.render('main', {
  //     title: 'NodeBird',
  //     // twits: posts,
  //   });
  // } catch (err) {
  //   next(err);
  // }
});

module.exports = router;