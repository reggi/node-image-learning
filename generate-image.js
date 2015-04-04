var moment = require("moment")
var path = require("path")
var Promise = require("bluebird")
var cv = require("opencv")
cv.readImageAsync = Promise.promisify(cv.readImage)
var _ = require("underscore")

var data = {
  "CANNY_THRESH_1" : 221,
  "CANNY_THRESH_2" : 213,
  "HOUGH_1" : 1,
  "HOUGH_2" : 0.10833078115826873,
  "HOUGH_3" : 214
}

var RED = [0, 0, 255]
var input = path.join(__dirname, "./images-raw/original.png")

//debug("starting to process %s", data.type)
return cv.readImageAsync(input).then(function(im){
  if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
  return im
}).then(function(im){
  //debug("starting to apply %s settings", data.type)
  var im_process = im.copy()
  im_process.canny(data.CANNY_THRESH_1, data.CANNY_THRESH_2)
  var res = im_process.houghLinesP(data.HOUGH_1, data.HOUGH_2, data.HOUGH_3)
  _.each(res, function(vector){
    im.line([vector[0], vector[1]], [vector[2], vector[3]], RED, 2)
  })
  data.name = './images-best/best-'+moment().format("x")+'.png'
  im.save(data.name);
  return data.name;
})
