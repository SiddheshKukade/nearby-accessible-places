const express = require("express"); // library to create a web server
const app = express(); // creating an express app
const mongoose = require("mongoose"); // library for handling mongodb connections & schemas
const dotenv = require("dotenv"); // to enable using environment varaibles in the project
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());
//connecting to the Databse
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(" 😃 MongoDB connected!"))
  .catch((err) => consolen.log(err));

app.use("/api/users", userRoute); //
app.use("/api/pins", pinRoute); //enabling pins routes in the app 

app.listen(8800, () => {
  console.log(" 😊 Backend server is running!");
}); // starting app on Port 8800
