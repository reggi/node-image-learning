var _ = require("underscore")

module.exports = {
  averageArray: function() {
    var arg = _.chain(arguments).toArray().flatten().value()
    return _.reduce(arg, function(memo, num) {
      if(_.isString(num)) num = parseInt(num, 10)
      return memo + num
    }, 0) / (arg.length === 0 ? 1 : arg.length)
  },
  averageCollection: function(){
    var arg = _.chain(arguments).toArray().flatten().value()
    var allKeys = _.map(arg, function(collection){
      return _.keys(collection)
    })
    var keys = _.intersection.apply(_, allKeys)
    var keyedDocs = _.chain(keys).map(function(key){
      return [key, _.pluck(arg, key)]
    }).object().value()
    return _.mapObject(keyedDocs, function(keyedDoc){
      return _.average(keyedDoc)
    })
  },
  average: function(){
    var arg = _.chain(arguments).toArray().flatten().value()
    if(_.isObject(arg[0]) & arg.length == 1) return _.averageArray(_.values(arg[0]))
    if(_.isObject(arg[0]) ) return _.averageCollection(arg)
    return _.averageArray(arg)
  },
  variation: function(obj, meta, radius){
    if(!radius) radius = 5
    return _.mapObject(obj, function(value, key){
      if(typeof meta == "undefined") return value
      if(typeof meta[key] == "undefined") return value
      if(typeof meta[key].min == "undefined") return value
      if(typeof meta[key].max == "undefined") return value
      var percentageOfMax = (meta[key].max / radius)
      var randMin = (value - Math.floor(percentageOfMax))
      var randMax = (value + Math.ceil(percentageOfMax))
      if(randMin < meta[key].min) randMin = meta[key].min
      if(randMax > meta[key].max) randMax = meta[key].max
      return _.random(randMin, randMax)
    })
  },
  applyRandom: function(meta){
    return _.mapObject(meta, function(value, key){
      return _.random(value.min, value.max)
    })
  },
  applySubfunctionObj: function(obj, meta, subfunction){
    return _.mapObject(obj, function(value, key){
      return (meta[key] && meta[key][subfunction]) ? meta[key][subfunction](value) : value
    })
  },
  applySubfunctionCollection: function(collection, meta, subfunction){
    return _.map(collection, function(obj){
      return _.applySubfunctionObj(obj, meta, subfunction)
    })
  },
  applySubfunction: function(objOrCollection, meta, subfunction){
    if(_.isArray(objOrCollection)) return _.applySubfunctionCollection(objOrCollection, meta, subfunction)
    return _.applySubfunctionObj(objOrCollection, meta, subfunction)
  },
  applyPre: function(collection, meta){
    return _.applySubfunction(collection, meta, "pre")
  },
  applyPost: function(collection, meta){
    return _.applySubfunction(collection, meta, "post")
  },
  applyVariation: function(collection, meta, radius){
    if(!radius) radius = 5
    return _.chain(collection)
      .withProps(_.keys(meta))
      .applyPre(meta)
      .variation(meta, radius)
      .applyPost(meta)
      .value()
  },
  withoutPropsObj: function(obj, withoutoutArr){
    return _.pick(obj, function(value, key){
      return !_.contains(withoutoutArr, key)
    })
  },
  withoutPropsCollection: function(collection, withoutoutArr){
    return _.map(collection, function(obj){
      return _.withoutPropsObj(obj, withoutoutArr)
    })
  },
  withoutProps: function(objOrCollection, withoutoutArr){
    if(_.isArray(objOrCollection)) return _.withoutPropsCollection(objOrCollection, withoutoutArr)
    return _.withoutPropsObj(objOrCollection, withoutoutArr)
  },
  withPropsObj: function(obj, withoutArr){
    return _.pick(obj, function(value, key){
      return _.contains(withoutArr, key)
    })
  },
  withPropsCollection: function(collection, withoutArr){
    return _.map(collection, function(obj){
      return _.withPropsObj(obj, withoutArr)
    })
  },
  withProps: function(objOrCollection, withoutArr){
    if(_.isArray(objOrCollection)) return _.withPropsCollection(objOrCollection, withoutArr)
    return _.withPropsObj(objOrCollection, withoutArr)
  },
  applyAverage: function(collection, meta){
    return _.chain(collection)
      .withProps(_.keys(meta))
      .applyPre(meta)
      .average()
      .applyPost(meta)
      .value()
  },
  topPercent: function(collection, percent){
    return _.first(collection, Math.ceil(collection.length / percent))
  },
  applyRandomProp: function(obj, meta, prop){
    prop = (!prop) ? _.keys(obj)[_.random(0, _.size(obj)-1)] : prop
    var theProp = _.pick(obj, prop)
    var randomProp = _.chain(theProp).mapObject(function(value, key){
      return (meta[key]) ? _.random(meta[key].min, meta[key].max) : 0
    }).applyPost(meta).value()
    return _.chain(obj).clone().extend(randomProp).value()
  },
  applyRandomPropRecursive: function(obj, meta, prepend){
    // returns a object with copy of array with one property random
    // if passed obj has 5 properties will return object of objects
    // where top-level object prop is `random{Property}`
    return _.chain(obj).map(function(value, key){
      var theKey = (prepend) ? prepend+key : key
      return [theKey, _.applyRandomProp(obj, meta, key)]
    }).object().value()
  }
}
