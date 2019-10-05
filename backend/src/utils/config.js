require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let IPADDRESS = process.env.IPADDRESS

module.exports = {
  MONGODB_URI,
  PORT,
  IPADDRESS
}