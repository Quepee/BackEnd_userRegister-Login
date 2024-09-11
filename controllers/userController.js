// //  this is a folder that holds all our functions

// const User = require("../models/userModel")


// const registerUser = async (request, response) => {
//     // request is always going to come frome the front-end
//     const {firstName, lastName, email, phone, password} = request.body


//     const  userExists = await User.findOne({email})
//     if (userExists) {
//       return response.status(400).json({error : "user already exists..."})
//     } 

    
//     const newUser = await User.create({firstName, lastName, email, phone, password})

//     if (newUser) {
//       response.status(201).json({message : " user registered successfully"})
//     } else {
//       response.status(400).json({error : "invalid user data"})
//     }



// }




// module.exports = {registerUser}


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register function (your existing one)
const registerUser = async (request, response) => {
  const { firstName, lastName, email, phone, password } = request.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return response.status(400).json({ error: "User already exists..." });
  }

  // Hash the password before saving the user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });

  if (newUser) {
    response.status(201).json({ message: "User registered successfully" });
  } else {
    response.status(400).json({ error: "Invalid user data" });
  }
};

// Login function
const loginUser = async (request, response) => {
  const { email, password } = request.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return response.status(400).json({ error: "Invalid email or password" });
  }

  // Check if the password matches
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return response.status(400).json({ error: "Invalid email or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
    expiresIn: "1h",
  });

  // Return token and user info
  response.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });
};

module.exports = { registerUser, loginUser };
