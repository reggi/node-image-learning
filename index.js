var debug = require("debug")("machine-learning")
var math = require('mathjs')
var BlinkDiff = require("blink-diff")
var moment = require("moment")
var _ = require("underscore")
var path = require("path")
var Promise = require('bluebird')
var cv = require("opencv")
var MongoDB = Promise.promisifyAll(require('mongodb'))

cv.readImageAsync = Promise.promisify(cv.readImage)
var RED = [0, 0, 255]
var input = path.join(__dirname, "./images-raw/original.png")

var machineLearningOptions = require("./machine-learning-options")

var db
var collection

MongoDB.connectAsync(process.env.MONGO_URL).then(function(_db){
  db = _db
  collection = db.collection('settings')
  return collection.find().toArrayAsync().then(function(docs){
    var options = machineLearningOptions(docs)
    var optionsArr = _.map(options, function(value, key){
      value.type = key
      return value
    })
    debug("about to process %s different settings", optionsArr.length)
    return optionsArr
  }).map(function(data){
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
      data.name = './images-generated/output-'+moment().format("x")+'.png'
      im.save(data.name);
      return data.name;
    }).then(function(incombant){
      //debug("diffing %s", data.type)
      var diff = new BlinkDiff({
        imageAPath: incombant,
        imageBPath: path.join(__dirname, "./images-raw/desired.png"),
        thresholdType: BlinkDiff.THRESHOLD_PERCENT,
        threshold: 0.01,
      });
      diff.run = Promise.promisify(diff.run)
      return diff.run().then(function(result){
        return result.differences
      })
    }).then(function(diff){
      data.diff = diff
      data.date = new Date()
      debug("just finished processing %s with a diff of %s", data.type,  data.diff)
      return collection.insertAsync(data).then(function(){
        return diff
      })
    })
  }).then(function(diffs){
    debug("this run had an average of %s", _.average(diffs))
  })
}).then(function(){
  db.close()
}).catch(function(e){
  db.close()
  throw e
})
