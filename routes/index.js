const router = require('express').Router()
const UserController = require('../controllers/user')
const TasksController = require('../controllers/tasks')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', UserController.googleSignIn)

router.post('/tasks', UserController.read)

//Require authentication
router.post('/tasks', TasksController.create)
router.put('/tasks/:id', TasksController.update)
router.patch('/tasks/:id', TasksController.changeCategory)
router.delete('/tasks/:id', TasksController.destroy)

module.exports = router