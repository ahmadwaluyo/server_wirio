const router = require('express').Router();
const StudentController = require('../controllers/student_controllers');

router.post('/', StudentController.addStudent);
router.get('/', StudentController.getStudents);
router.get('/:id', StudentController.getStudentById);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;
