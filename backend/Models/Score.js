const mongoose = require('mongoose')
const{Schema }= mongoose

const scoreSchema =  new Schema({
    userId :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    examId :{
        type: Schema.Types.ObjectId,
        ref: 'Exam'
    },
    score:{
        type: Number
    },
    status:{
        type:String,
        enum :['Pass', "Fail"],
        default:"Fail"
    }
})

module.exports = mongoose.model('Score', scoreSchema)