const User = require("../models/User")
const connection = require("../config/connection")

const seedUsers = [
  { fname: "Mary", lname: "Smith", email: "msmith@gmail.com", password: "msmith", title: "President", salary: 145000 },
  { fname: "John", lname: "Doe", email: "jdoe@gmail.com", password: "jdoe", title: "VP", salary: 120000 },
  { fname: "Ralph", lname: "Jones", email: "rjones@gmail.com", password: "rjones", title: "Asst VP", salary: 105000 },
  { fname: "Harriet", lname: "Miles", email: "hmiles@gmail.com", password: "hmiles", title: "Sales Mgr", salary: 90000 },
  { fname: "Bre", lname: "Schmidt", email: "bschmidt@gmail.com", password: "bschmidt", title: "Bottle Washer", salary: 5000 }
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