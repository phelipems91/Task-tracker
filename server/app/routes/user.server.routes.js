let userController = require('../controllers/user.server.controller');

module.exports = function(app){
    app.get('/api/auth/logout', userController.logoutUser);
    app.post('/api/auth/login', userController.loginUser);
    app.post('/api/auth/register', userController.registerUser);
}