const router = require("express").Router();

const {submitAssignment, getSubmittedAssignments,getPendingAssignments,
    countSubmittedAssignments,countLateSubmissions} = require('../Controllers/submissionController')

router.post('/createSubission',submitAssignment)
router.get('/getSubmittedAssignments',getSubmittedAssignments)
router.get('/getPendingAssignments',getPendingAssignments)
router.get('/countSubmittedAssignments',countSubmittedAssignments)
router.get('/countLateSubmissions',countLateSubmissions)

module.exports=router