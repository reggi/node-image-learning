
// generates completely random data based on min and max for argument
function randomData(){
  return _.mapObject(arguments, function(set, key){
    return _.random(set.min, set.max)
  })
}

// generates a random number based on given random number
function aggrigateData(data){
  return _.mapObject(arguments, function(set, key){
    var min = data[key] - Math.floor(set.max/5)
    var max = data[key] + Math.floor(set.max/5)
    if(min < set.min) min = set.min
    if(max > set.max) max = set.max
    return _.random(min, max)
  })
}

function closeRandom(value, minMax){
  var randMin = (value-Math.ceil(minMax.min/5))
  var randMax = (value-Math.ceil(minMax.max/5))
  return Math.abs(Math.ceil(_.random(randMin, randMax)))
}

function variate(docs){
  return _.chain(docs).mapObject(function(value, key){
    if(!arguments[key]) return false
    return closeRandom(value, arguments[key])
  }).pluck(function(value){
    return value
  }).value()
}

function orderDocs(docs){
  return _.chain(docs).sortBy(function(doc){
    return +doc.diff
  }).value()
}





function randomOneProp(set){

}

// random() -> doc # generates random numbers for each prop based on it's max and min
// variate(doc) -> doc # takes a doc gets the numbers and generates random based on it
// average(docs) -> doc # take docs and generates average based on docs
// randomXProp(doc, nProps) -> doc # takes a doc and randomny alters nProps
// variateXProp(doc, nProps) -> doc # takes a doc gets the numbers and generates nProps of random props

var learn = {}

learn.random = function(){
  return _.mapObject(dataMinMax, function(set, key){
    return _.random(set.min, set.max)
  })
}

learn.variate = function(doc){
  return _.mapObject(doc, function(value, key){
    if(!dataMinMax[key]) return value
    var randMin = (value-Math.ceil(dataMinMax[key].min/5))
    var randMax = (value-Math.ceil(dataMinMax[key].max/5))
    return Math.abs(Math.ceil(_.random(randMin, randMax)))
  })
}

learn.average = function(arr){
  return _.reduce(arr, function(memo, num) {
    return memo + num
  }, 0) / (arr.length === 0 ? 1 : arr.length)
}

learn.variate = function(docs){
  var allKeys = _.map(docs, function(doc){
    return _.keys(doc)
  })

  var keys = _.intersection.apply(_, allKeys)

  var keyedDocs = _.map(keys, function(key){

  })



  return _.mapObject(docs, function(doc){


    return _.mapObject(doc, function(value, key){

    })
  })
}




    // dump all methods for generating new args into an array and randomly pick from it
      // random-data
      // take wholeAverage
      // take topTenPercent average
      // take topTenPercent average random one prop
      // take topTenPercent variate
      // take topOne variate
      // take topOne variate random one prop
/*
    var newSet = []
    if(docs.length == 0){
      newSet.push(["random-data", randomData()])
    }else{
      if((docs.length % 10) == 0) newSet.push(["random-data", randomData()])
      if(variate(docs)) newSet.push(["random-data", randomData()])
    }
*/

    //iterate
    // get top and aggregate
    /*
    var topTenPercent = _.chain(docs).sortBy(function(doc){
      return +doc.diff
    }).map(function(doc){
      delete doc._id
      delete doc.diff
      delete doc.false
      return doc
    }).first(Math.ceil(docs.length/10)).value()

    var c = _.pluck(topTenPercent, "CANNY_THRESH_1")
    console.log(c)

    var aggregatedValues = _.chain(topTenPercent).map(function(setting, key){
      return [key, _.pluck(topTenPercent, key)]
    }).object().value()

    console.log(aggregatedValues)

    // get best and variate
    var best = _.chain(docs).sortBy(function(doc){
      return +doc.diff
    }).first(1).value()[0]

    var data = variate(best)

    return data
    */

/*
  }).then(function(data){

    return cv.readImageAsync(input)
      .then(function(im){
        if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
        return im
      }).then(function(im){
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
        return collection.insertAsync(data)
      })

    if(docs.length == 0) return randomData()

    var docs = _.filter(docs, function(doc){
      if(doc.diff == 69016) return false
      return doc
    })

    var orderedDocs = _.sortBy(docs, "diff")
    var topTen = _.firstPercent(orderedDocs, 10)
    var top = _.first(orderedDocs)

    var average = assembleAverage(topTen)
    var variateAverage = _.variate(average, meta)
    console.log(average)
    console.log(variateAverage)


*/

var _ = require("underscore")
var mixins = require("./underscore-mixins-learn")
_.mixin(mixins)

var x = _.average([1, 2, 3]) // 2
console.log(x)
var x = _.average([2, 2, 2]) // 2
console.log(x)
var x = _.average([2, 2, 2], [2, 2, 2]) // 2
console.log(x)
var x = _.average([300, 150, 150]) // 200
console.log(x)
var x = _.average(["300", "150", "150"]) // 200
console.log(x)


var x = _.averageObject([
  {
    speed: 100,
  },
  {
    speed: 100,
  },
  {
    speed: 100,
  }
]) /*{speed: 100}*/
console.log(x)
var x = _.averageObject([
  {
    speed: 25,
    distance: 0
  },
  {
    speed: 50,
    distance: 50
  },
  {
    speed: 75,
    distance: 100
  }
]) /*{speed: 50, distance: 50}*/
console.log(x)


var x = _.variate({
  "test": {
    "min": 1,
    "max": 10
  }
}, {
  "test": 5
}, 3)
console.log(x) // {"test": rand 2--9 }
