var debug = require("debug")("machine-learning")
var _ = require("underscore")
_.mixin(require("./underscore-mixins-learn"))
var Promise = require("bluebird")
var fs = Promise.promisifyAll(require("fs"))

var file = "./documenting/run6.md"

fs.readFileAsync(file, "utf-8").then(function(contents){
  lines = contents.split("\n")
  return _.chain(lines).map(function(line){
    var potentialType = line.match(/processing \w+/)
    var potentialDiff = line.match(/with a diff of \d+/)
    if(!potentialType) return false
    if(!potentialDiff) return false
    return {
      "type": potentialType[0].replace("processing ", ""),
      "diff": parseInt(potentialDiff[0].replace("with a diff of ", ""))
    }
  }).without(false).value()
}).then(function(data){
  var diffs = _.pluck(data, "diff")
  var sorted = _.sortBy(data, "diff")
  debug("this run had an average of %s", _.average(diffs))
  _.each(sorted, function(set){
    debug("ranked %s with %s", set.type, set.diff)
  })
})
