const router = require("express").Router();

const {createAssignment, editAssignment} = require('../Controllers/assignmentController')

router.post('/createAssignment', createAssignment)
router.put('/editAssignment', editAssignment)

module.exports=router