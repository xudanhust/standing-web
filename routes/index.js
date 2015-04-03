var controller = require('../controller');

module.exports = function(app){
    app.get('/', controller.index);
    app.post('/', controller.index);
    app.post('/addPerson', controller.addPerson);
    app.get('/viewPerson/:name', controller.viewPerson);
    app.get('/deletePerson/:name/confirm', controller.deletePerson);
    app.post('/addPoint', controller.addPoint);
    app.get('/deletePoint/:name/:id/confirm', controller.deletePoint);
    app.get('/editPoint/:name/:id', controller.editPoint);
    app.post('/updatePoint', controller.updatePoint);
};
