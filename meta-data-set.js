module.exports = {
  CANNY_THRESH_1: {
    min: 0,
    max: 225,
    post: function(number){
      return Math.ceil(number)
    }
  },
  CANNY_THRESH_2: {
    min: 0,
    max: 225,
    post: function(number){
      return Math.ceil(number)
    }
  },
  HOUGH_1: {
    min: 1,
    max: 4,
    post: function(number){
      return Math.ceil(number)
    }
  },
  HOUGH_2: {
    min: 0,
    max: 360,
    pre: function(number){
      return Math.ceil(Math.PI / number)
    },
    post: function(number){
      return Math.PI / number
    }
  },
  HOUGH_3: {
    min: 0,
    max: 225,
    post: function(number){
      return Math.ceil(number)
    }
  }
}
