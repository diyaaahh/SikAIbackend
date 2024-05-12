const mongoose = require('mongoose')
const {Schema} = mongoose

const AssignmentSchema = new Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required: true
    },
    CreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    assignmentTile:{
        type:String,
        required:true
    },//assignment as picture
    description:{
        type:String,
        default:""
    },
    deadline:{
        type:Date,
        required:true,
    },
    totalPoints:{
        type:Number,
        required:true,
    },
    publishedAt:{
        type:Date,
        default:Date.now
    }

})
const assignmentModel = mongoose.model("Assignment", AssignmentSchema);
module.exports = assignmentModel;