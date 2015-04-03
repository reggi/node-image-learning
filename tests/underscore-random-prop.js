var _ = require("underscore")
var chai = require("chai")
var expect = chai.expect
var mixins = require("../underscore-mixins-learn")
_.mixin(mixins)

var meta = {
  "miles": {
    "min": 100,
    "max": 300
  },
  "acres": {
    "min": 0,
    "max": 100
  },
  "animals": {
    "min": 0,
    "max": 9000
  }
}

var data = _.applyRandom(meta)
console.log(data)
var data = _.applyRandomProp(data, meta)
console.log(data)
