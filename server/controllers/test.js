    const user = decodeToken(devToken)
    if(user.valid){
      
      // insert controller stuff here
      
    } else {
      res.status(401).json({message: "UnAuthorized - invalid token"})
    }