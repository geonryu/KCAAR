const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Test = require('../models/request');
// const { User, Request } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/testRequest',
    async (req, res) => {
      try {
        console.log(req.body)
        await Test.create({
          clientCompany: req.body.clientCompany,
          clientBizNumber : req.body.clientBizNumber,
          clientAddress : req.body.clientAddress,
          clientName : req.body.clientName,
          clientPhone : req.body.clientPhone,
          clientEmail : req.body.clientEmail,
          deviceName : req.body.deviceName,
          deviceMeasureHeight : req.body.deviceMeasureHeight,
          deviceMeasureWidth : req.body.deviceMeasureWidth,
          deviceMeasureDepth : req.body.deviceMeasureDepth,
          deviceDisplayOffset : req.body.deviceDisplayOffset,
          deviceDisplayWidth : req.body.deviceDisplayWidth,
          deviceDisplayHeight : req.body.deviceDisplayHeight,
          deviceControllerHeight : req.body.deviceControllerHeight,
          deviceControllerOffset : req.body.deviceControllerOffset,
          deviceControllerCounts : req.body.deviceControllerCounts,
          softwareName : req.body.softwareName,
          softwareResolutionWidth : req.body.softwareResolutionWidth,
          softwareResolutionHeight : req.body.softwareResolutionHeight,
          softwarePages : req.body.softwarePages,
          userMessage : req.body.userMessage,
        });
        
        return res.redirect('/contact');
      } catch (error) {
        console.error(error);
        return next(error);
      }
       
    }
);


module.exports = router;
