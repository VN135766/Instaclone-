const User = require("../models/User")
const connection = require("../config/connection")

const seedUsers = [
  { user_name: "Fat Albert", email: "fa@gmail.com", password: "fa123" },
  { user_name: "Brett Favre", email: "bf@gmail.com", password: "bf123" },
  { user_name: "Ben Dover", email: "bd@gmail.com", password: "bd123" },
  { user_name: "Ace Ventura", email: "av@gmail.com", password: "av123" },
  { user_name: "Cartman", email: "c@gmail.com", password: "c123" }
]

const seed = async () => {
  const queryFirst = await User.find({})
  if( queryFirst && queryFirst.length === 0 ){
    console.log("seeding users...")

    const seed = await Promise.all(seedUsers.map( async (user) => await User.create(user) ) )

    console.log("seeding done")
    process.exit()
  } else {
    console.log("no seeding needed")
    process.exit()
  }
}


seed();