let taskController = require('../controllers/task.server.controller.js');

module.exports = function(app){
    app.get('/api/get/tasks/all/:owner', taskController.getAllTasks);
    app.get('/api/get/tasks/active/:owner', taskController.getActiveTasks);
    app.get('/api/get/task/:id', taskController.getTask);
    app.post('/api/post/task/:id', taskController.editTask);
    app.delete('/api/get/tasks/:id', taskController.deleteTask);
    app.post('/api/post/task', taskController.createTask);
}