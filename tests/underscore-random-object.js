var _ = require("underscore")
var chai = require("chai")
var expect = chai.expect
var mixins = require("../underscore-mixins-learn")
_.mixin(mixins)

function testRandom(results, argument){
  var condition = _.chain(results).mapObject(function(result, key){
    console.log(result)
    return (result >= argument[key].min && result <= argument[key].max)
  }).values().without(true).value()
  if(condition.length == 0 ) return true
  return false
}

var options = [
  {
    "argument": {
      temperature:{
        "min": 0,
        "max": 30
      }
    }
  },
  {
    "argument": {
      temperature:{
        "min": 0,
        "max": 20
      },
      bingo:{
        "min": 0,
        "max": 300
      }
    }
  }
]

describe("random object", function() {
  _.each(options, function(option){
    it("should generate random / "+ JSON.stringify(option.argument), function() {
      var results = _.randomObject(option.argument)
      var test = testRandom(results, option.argument)
      expect(test).to.equal(true)
    })
  })
})
