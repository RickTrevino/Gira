var  Taskdb = require('../model/model');

// create and save new task 
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"});
        return;
    }
    
    // new task 
    const task = new Taskdb({
        summary: req.body.summary,
        status: req.body.status,
        assignee: req.body.assignee,
        dueDate: req.body.dueDate,
        priority: req.body.priority
    });
    
    // save user to database
    task.save(task)
        .then(data => {
            res.redirect('/#');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while saving the new task to the database"});
        });
}

// retrieve and return all tasks or retrieve and return a single task.
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Taskdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:"Task id " + id + " was not found."});
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:"Error retrieving task " + id + "."});
        })
    }
    else{
    Taskdb.find()
        .then(task => {
            res.send(task)
        })
        .catch(err => {
            res.status(500).send({message:err.message || "An error occured while retrieving user information"});
        });
    }
}

// update a task by task id
exports.update = (req, res) => {
    // validate body
    if(!req.body){
        return res.status(400)    
    }

    const id = req.params.id;
    Taskdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message:`Cannot update task with the : ${id}. Task not found.`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:"Error updating task."});
        });
}

// delete a user by user id
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Taskdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(400).send({message:`Cannot delete the task with id: ${id}. Please double check the task id and try again.`});
            }
            else{
                res.send({message:"Task was deleted successfully."});
            }
        })
        .catch(err => {
            res.status(500).send({message:"Could not delete task with id: " + id});
        });
}