'use strict';
module.exports = (sequelize, DataTypes) => {
  class Task extends sequelize.Sequelize.Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 15],
          msg: 'Title must be between 1-15 chars long.'
        }
      }
    },
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(task, options) {
        if(!task.description || task.description === '') {
          task.description = 'No description added.'
        }
        if(!task.category || task.category === '') {
          task.description = 'Backlog'
        }
      }
    },
    sequelize
  });
  Task.associate = function(models) {
    Task.belongsTo(models.User)
    // associations can be defined here
  };
  return Task;
};