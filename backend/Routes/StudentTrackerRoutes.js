
const Router  = require('express').Router();
const {addStudentTracker, getStudentTracker, updateStudentTracker} = require('../Controllers/StudentTrackerController');
Router.post('/add', addStudentTracker);
Router.get('/:studentId', getStudentTracker);
Router.put('/:studentId', updateStudentTracker);
module.exports = Router;
