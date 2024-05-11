const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["Student", "Teacher"],
    default:'Student'
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;