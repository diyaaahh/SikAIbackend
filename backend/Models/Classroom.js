const mongoose = require('mongoose')
const {Schema}= mongoose

const ClassroomSchema =({
    courses: [{ 
        type: Schema.Types.ObjectId,
         ref: 'Course' }],
    students: [{ type: Schema.Types.ObjectId,
         ref: 'User' }]
})

const classroomModel = mongoose.model("Classroom", ClassroomSchema);
module.exports = classroomModel;