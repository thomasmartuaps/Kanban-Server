const { Task } = require('../models')

class TasksController {
    static create(req, res, next) {
        Task.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            UserId: req.user.id
        })
            .then(response => {
                return res.status(201).json(response)
            })
            .catch(err => next(err))
    }
    static read(req, res, next) {
        Task.findAll({ order: [['createdAt', 'DESC']] })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(err => next(err))
    }
    static update(req, res, next) {
        let { title, description, category } = req.body
        Task.update({
            title, description, category
        }, { where: { id: req.params.id }, returning: true })
            .then(response => {
                return res.status(200).json(response[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }
    static changeCategory(req, res, next) {
        let { category } = req.body
        Task.update({ category }, { where: { id: req.params.id }, returning: true })
            .then(response => {
                return res.status(200).json(response[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }
    static destroy(req, res, next) {
        Task.destroy({ where: { id: req.params.id }, returning: true })
            .then(response => {
                return res.status(200).json({ status: response, message: `Item id ${req.params.id} has been deleted` })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = TasksController