const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    summary:{
        type: String,
        require: true,
    },
    status: String,
    assignee: String,
    dueDate: Date,
    priority: String 
});

const Taskdb = mongoose.model('taskdb', schema);

module.exports = Taskdb;