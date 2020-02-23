const express = require('express');

const {
  uploader,
  scrape,
  getAllImages
} = require('../controllers/utilContoller');

const router = express.Router();

router.get('/uploadAllPoemsfromFile', uploader);

router.get('/scrapeImages', scrape);

router.get('/getAllImages', getAllImages);

module.exports = router;
