const mongoose = require("mongoose");
/*Users can be shopowners or they can be disabled persons as well  */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true } //// to get created at and updated at timestams automatically 
);

module.exports = mongoose.model("User", UserSchema);
