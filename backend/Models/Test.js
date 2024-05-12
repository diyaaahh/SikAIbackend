const mongoose = require('mongoose')
const {Schema} = mongoose

const TestSchema = new Schema({

})
const testModel = mongoose.model("Test", TestSchema);
module.exports = testModel;