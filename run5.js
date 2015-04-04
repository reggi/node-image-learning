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
  return collection.find().sort({ date: -1 }).limit(1).toArrayAsync().map(function(doc){
    //console.log(docs.length)
    console.log(doc.date)
    var d = moment(doc.date).format("YYYY-MM-DD hh:mm a")
    console.log(d)
  })
}).then(function(){
  db.close()
}).catch(function(e){
  db.close()
  throw e
})
