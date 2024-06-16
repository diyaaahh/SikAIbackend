const router = require("express").Router();

const {createAssignment, editAssignment, getChapterAssignments} = require('../Controllers/assignmentController')

router.post('/createAssignment', createAssignment)
router.put('/editAssignment', editAssignment)
router.get('/getchapterassignments/:chapterId', getChapterAssignments)

module.exports=router