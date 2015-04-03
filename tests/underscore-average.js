var _ = require("underscore")
var chai = require("chai")
var expect = chai.expect
var mixins = require("../underscore-mixins-learn")
_.mixin(mixins)

var options = [
  {
    "arguments": [
      [1, 2, 3],
      [2, 2, 2],
      [2, 2, 2, 2, 2, 2],
      [[1, 2, 3]],
      [[2, 2, 2], [2, 2, 2]]
    ],
    "expected": 2
  },
  {
    "arguments": [
      [300, 150, 150],
      ["300", "150", "150"],
      [[300, 150, 150]],
      [["300", "150", "150"]]
    ],
    "expected": 200
  },
  {
    "argument":[
      {
        speed: 100,
      },
      {
        speed: 100,
      },
      {
        speed: 100,
      }
    ],
    "expected": {
      speed: 100
    }
  },
  {
    "argument":[
      {
        distance: 300,
      },
      {
        distance: 200,
      },
      {
        distance: 100,
      }
    ],
    "expected": {
      distance: 200
    }
  },
  {
    "argument":[
      {
        distance: 300,
        speed: 100
      },
      {
        distance: 200,
        speed: 100
      },
      {
        distance: 100,
        speed: 100
      }
    ],
    "expected": {
      distance: 200,
      speed: 100
    }
  },
  {
    "argument": {
      distance: 300,
      speed: 100
    },
    "expected":200
  },
  {
    "argument": {
      distance: 300,
      speed: 100,
      gas: [
        20,
        300,
      ]
    },
    "expected": 180,
  }
]

describe("average", function() {
  _.each(options, function(option){
    if(option.arguments){
      _.each(option.arguments, function(argument){
        it("should get average / "+ JSON.stringify(argument), function() {
          var avg = _.average.apply(_, argument)
          expect(JSON.stringify(avg)).to.equal(JSON.stringify(option.expected));
        })
      })
    }else if(option.argument){
      it("should get average / "+ JSON.stringify(option.argument), function() {
        var avg = _.average(option.argument)
        expect(JSON.stringify(avg)).to.equal(JSON.stringify(option.expected));
      })
    }
  })
})
