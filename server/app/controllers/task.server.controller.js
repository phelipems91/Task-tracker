let Task = require('../models/task.server.model');

exports.getAllTasks = function(req, res, next){
    let owner = req.params.owner;
    
    try{
        Task.find({"owner": owner}, (err, tasks) => {
            if(err){
                res.json(err);
                return next(err);
            }else {
                res.json(tasks);
            }
        }).sort({"date":1})
    }catch(error){
        res.json(error);
        next(error);
    }
}

exports.getActiveTasks = function(req, res, next){
    let owner = req.params.owner;
    let currentDate = new Date().toLocaleDateString('en-CA');
    
    try{
        Task.find({"owner": owner, "date": { $gte: currentDate }}, (err, tasks) => {
            if(err){
                res.json(err);
                return next(err);
            }else {
                res.json(tasks);
            }
        }).sort({"date":1})
    }catch(error){
        res.json(error);
        next(error);
    }
}

exports.getTask = function(req, res, next){
    let id = req.params.id;
    
    try{
        Task.find({"_id": id}, (err, tasks) => {
            if(err){
                res.json(err);
                return next(err);
            }else {
                res.json(tasks);
            }
        })
    }catch(error){
        res.json(error);
        next(error);
    }
}

exports.editTask = function(req, res, next){
    let id = req.params.id;

    let newTask = Task({
        "_id": id,
        "text": req.body.text,
        "date": req.body.date,
        "owner": req.body.owner
    });

    Task.updateOne({_id: id}, newTask, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {   
            res.status(200);
        }
    });
}

exports.deleteTask = function(req, res){
    let id = req.params.id;

    Task.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
        }
    });
}

exports.createTask = function(req, res){
    Task.create(req.body, (err, task) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.status(200);
        }
    });
}