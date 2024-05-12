const mongoose = require('mongoose')
const {Schema} = mongoose

const MaterialSchema = new Schema({
  content:{
    type:String,
    required:true
  },
    classroomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Classroom',
        required: true
    },
    uploadDate:{
        type:Date,
        default:Date.now
    }
})
const materialModel = mongoose.model("Material", MaterialSchema);
module.exports = materialModel;