const Poem = require('../../models/PoemModel');
const uuidv1 = require('uuid/v1');
const path = require('path');
const fs = require('fs');

const Scraper = require('image-scraper');
var moment = require('moment');
const p = require('./ponly.js');

const regex = /(&nbsp;|<([^>]+)>)/gi;
// // http://localhost:4000/v1/uploadAllPoemsfromFile
const uploader = async (req, res, next) => {
  const pArray = Object.keys(p).map(e => p[e]);
  for (let index = 0; index < pArray.length; index++) {
    const e = pArray[index];
    const newPoem = new Poem({
      title: e.name,
      bodyText: e.body.replace(regex, ''),
      isDraft: false,
      photoURL: null,
      date: moment.unix(e.date).format(),
      handle: e.handle,
      user: e.uid
    });
    await newPoem.save();
  }
  return res.status(200).json('Done');
};

const scrape = async (req, res, next) => {
  const scraper = new Scraper('https://nos.twnsnd.co/');
  let i = 16;
  while (i < 21) {
    console.log(i);
    scraper.address = `https://nos.twnsnd.co/page/${i}`;
    scraper.scrape(image => {
      image.name = 'disnetjy-' + uuidv1();
      image.extention = 'png';
      image.saveTo = path.resolve(__dirname + '../../../img/');
      image.save();
    });
    i++;
  }
  return res.status(200).json('Done');
};
const getAllImages = async (req, res, next) => {
  const directoryPath = path.join(__dirname, '../../public/img');
  console.log(directoryPath);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      throw new Error(500, err);
    }
    return res.json(files);
  });
};

module.exports = {
  uploader,
  getAllImages,
  scrape
};
