const axios = require('axios');


exports.homeRoutes = (req, res) => {
    const hostname = req.headers.host;

    // Make a GET request to api/users
    axios.get(`http://${hostname}/api/tasks`)
        .then(function(response){
            res.render('index', {tasks: response.data  });
        })
        .catch(err => {
            res.send(err);
        })

}

exports.add_task = (req, res) => {
    res.render('add_task');
}

exports.update_task = (req, res) => {
    const hostname = req.headers.host;

    // Make a GET request to api/users
    axios.get(`http://${hostname}/api/tasks`, {params : {id : req.query.id}})
        .then(function(taskdata){
            res.render("update_task", {task: taskdata.data});
        })
        .catch(err => {
            res.send(err);
        });
}