const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    taskId:{
        type: String,
        require: true,
        unique: true
    },
    summary:{
        type: String,
        require: true,
    },
    status: String,
    assignee: String,
    dueDate: Date,
    priority: String 
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;