const mongoose = require("mongoose");
const { Schema } = mongoose;

const MaterialSchema = new Schema({
  fileNameUrl: {
    type: String,
    required: true,
  },
  summary: {
    type: [String],
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});
const materialModel = mongoose.model("Material", MaterialSchema);
module.exports = materialModel;
