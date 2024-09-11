// DATABASE CONNECTION LOGIC IS DEFINED HERE

// this is how to import
const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = async () => {
  try {

    // WE ARE NOT TO WRITE THE MONGO LINK AND PASSWORD THING IN THE LINE BELOW HERE, BUT IN THE .env file
    // cont connect = await mongoose.connect(mongodb+srv://xcellerqp:<db_password>@cluster0.sq9w6.mongodb.net/) : this has been modified to the line below, immediately after this.
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`mongoDb connected successfully on : ${connect.connection.host}`);
    
  } catch (error) {
    throw new Error(`Error:${error.message}`)
  }

};








module.exports = connectDb