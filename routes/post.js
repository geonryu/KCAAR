const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');//업로드폴더 생성
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      let fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')
      const ext = path.extname(fileName);//확장자추출
      cb(null, path.basename(fileName, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload', isLoggedIn,
    upload.fields([{ name: 'attach1'}, { name: 'attach2' }, { name: 'attach3' }]), // 배열 객체를 넣는다.
    async (req, res) => {
      try {
        // console.log(`
        //   작성자 : ${req.user.userName}, 카테고리 : ${category}, 제목 : ${title}, 본문 : ${content}, 첨부파일1 : ${req.files[0]}, 첨부파일2 : ${req.files[1]}
        // `);

        let file1 = req.files.attach1 ? req.files.attach1[0].path : null;
        let file2 = req.files.attach2 ? req.files.attach2[0].path : null;
        let file3 = req.files.attach3 ? req.files.attach3[0].path : null;
        let now = new Date();
        let year = now.getFullYear()
        let month = now.getMonth()  < 10 ? "0" + now.getMonth() + 1 : now.getMonth() + 1;
        let _date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
        let hours = now.getHours();
        let mins = now.getMinutes();
        let secs = now.getSeconds();
        await Post.create({
          author : req.user.userName,
          category : req.body.category,
          title : req.body.title,
          content : req.body.content,
          attach1 : file1,
          attach2 : file2,
          attach3 : file3,
          createdAt : `${year}-${month}-${_date}-${hours}${mins}${secs}`
        });
        
        return res.redirect('/admin/libraryAdmin');
      } catch (error) {
        console.error(error);
        return next(error);
      }
       
    }
);

module.exports = router;
