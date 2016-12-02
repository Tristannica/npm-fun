const {capture: cap} = require('imagesnapjs');
const {createAnimatedGifFromPngImages: gif} = require('gif-creation-service');

module.exports = {
  cap,
  gif,
  fs: require('fs'),
  uploader: require('imgur-uploader'),
  del: require('del'),
  wall: require('./client')
};
