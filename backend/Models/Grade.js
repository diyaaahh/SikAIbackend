const mongoose = require('mongoose')
const {Schema} = mongoose

const GradeSchema = new Schema({
   
    assignmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Assignment',
        required: true
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    score:{
        type:Number,
        required:true
    },
    feedback:{
        type:String,
        default:""
    }
})
const gradeModel = mongoose.model("Grade", GradeSchema);
module.exports = gradeModel;