


//  THIS IS TEMPLATE CODE
//    - VALIDATES THAT A TOKEN IS INCLUDED IN HEADER
//    - CONFIRMS THE TOKEN IS VALID AND RETURNS A USER
//    - USES A TESTING TOKEN WHEN IN TEST MODE

    console.log("====================")
    console.log("getAllPosts function")

    // check switch in ./utils/devToken to see if in test mode or not
    if (testStatus){ 
      // if we are in test mode
      var token = devToken
    } else {
      // must have a token in the header
      if( !req.headers.token) {
        return res.status(401)
        .json({msg: "un-authorized - missing or expired token in req header"})
      }
      let token = req.headers.token
    }

    // decode the token and return either a user or an error
    const user = decodeToken(token)
    if(user.valid){

      // 
      // insert controller stuff here
      // 
      
    } else {
      res.status(401).json({message: "UnAuthorized - invalid token"})
    }