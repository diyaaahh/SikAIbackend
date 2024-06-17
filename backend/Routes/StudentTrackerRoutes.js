const Router = require('express').Router();
const { addStudentTracker, getStudentTracker, updateStudentTracker } = require('../Controllers/StudentTrackerController');

Router.post('/add', addStudentTracker);
Router.get('/:id/:courseId', getStudentTracker);
Router.put('/:id/:courseId', updateStudentTracker);

module.exports = Router;
