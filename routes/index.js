const router = require('express').Router()
const UserController = require('../controllers/user')
const TasksController = require('../controllers/tasks')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', UserController.googleSignIn)

router.get('/tasks', TasksController.read)

//Require authentication
router.use(authentication)
router.post('/tasks', TasksController.create)
router.put('/tasks/:id', authorization, TasksController.update)
router.patch('/tasks/:id', authorization, TasksController.changeCategory)
router.delete('/tasks/:id', authorization, TasksController.destroy)

module.exports = router