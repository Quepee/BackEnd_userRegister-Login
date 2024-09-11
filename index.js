const express = require("express")


const app = express()

const port = 5500



const connectDb = require("./database/db")



connectDb()



const userRoute = require("./routes/userRoutes")




app.use(express.json())

app.get("/api", (request, response) => {
response.json({message: "welcome to my server"})
}) 




app.use("/api/users", userRoute)





































app.listen(port, () => {
  console.log("server connected successfully");
  
})