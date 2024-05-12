const mongoose = require('mongoose')
const {Schema} = mongoose

const SubmissionSchema = new Schema({
    submissionDate:{
        type:Date,
        default:Date.now
    },
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
    content:{
        type:String,
        required:true,
    }
})
const submissionModel = mongoose.model("Submission", SubmissionSchema);
module.exports = submissionModel;