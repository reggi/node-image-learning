var _ = require("underscore")
var meta = require("./meta-data-set")
_.mixin(require("./underscore-mixins-learn"))

module.exports = function(docs){
  var random = _.chain(meta).applyRandom().applyPost(meta).value()
  if(!docs || docs.length == 0){
    return {
      "random": random
    }
  }

  docs = _.chain(docs).filter(function(doc){
    if(doc.diff == 69016) return false
    return doc
  }).sortBy("diff").value()

  var firstLevelOptions = {}
  var secondLevelOptions = {}
  var thirdLevelOptions = {}

  firstLevelOptions["top"] = _.chain(docs).first().withProps(_.keys(meta)).value()
  firstLevelOptions["fivePercentAverage"] = _.chain(docs).topPercent(5).applyAverage(meta).value()
  firstLevelOptions["tenPercentAverage"] = _.chain(docs).topPercent(10).applyAverage(meta).value()
  firstLevelOptions["twentyPercentAverage"] = _.chain(docs).topPercent(20).applyAverage(meta).value()

  _.each(firstLevelOptions, function(option, key){
    secondLevelOptions[key+"VaraitionFiveRadius"] = _.applyVariation(option, meta, 5)
    secondLevelOptions[key+"VaraitionTenRadius"] = _.applyVariation(option, meta, 10)
  })

  var together = _.extend.apply(_, [firstLevelOptions, secondLevelOptions])

  //originally was gona pluck one random
  //_.each(together, function(mainOption, key){
    //thirdLevelOptions[key+"RandomProp"] = _.applyRandomProp(mainOption, meta)
  //})

  _.each(together, function(mainOption, key){
    thirdLevelOptions[key+"RandomProps"] = _.applyRandomPropRecursive(mainOption, meta)
  })

  thirdLevelOptions = _.map(thirdLevelOptions, function(options, optionsKey){
    return _.chain(options).map(function(option, optionKey){
      return [optionsKey+optionKey, option]
    }).object().value()
  })

  thirdLevelOptions = _.extend.apply(_, thirdLevelOptions)

  var options = _.extend.apply(_, [firstLevelOptions, secondLevelOptions, thirdLevelOptions])

  options.random = random

  return options
}
