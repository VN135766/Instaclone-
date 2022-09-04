

module.exports = {
  update: function(array, userId) {
    // testing data
    userId = "63149cfc25f548a55ead66dc"
    // userId = "63149cfc25f548a55ead66de"
    array.push("63149cfc25f548a55ead66e0")
    array.push("63149cfc25f548a55ead66df")
    // array.push(userId)
    array.push("63149cfc25f548a55ead66dd")
    
    console.log("=======================")
    console.log("userId: ", userId)
    console.log("beginning array length", array.length)
    console.log("beginning 'likes' array: ", array)
    
    console.log("found: ", array.includes(userId))
    if(!array.includes(userId)){
      console.log("adding userId", userId)
      array.push(userId)
    } else {
      console.log("deleteing userId: ")
      array = array.filter((array) => array !== userId)
    }
    console.log("ending array length", array.length)
    console.log("ending 'likes' array", array)

  }
}