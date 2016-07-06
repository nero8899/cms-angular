const server    = require('../../server').server;
const mongoose  = require('mongoose');
const crypto    = require('crypto');
const mime      = require('mime');



module.exports = function(){



    server.get('/projects', function(req, res){

        const Project = mongoose.model('Project');

        Project.find(function(err, docs){

            if(err){
                res.status(400).send(err);
            }else {
                res.send(docs);
            }

        });

    });

    server.get('/project/search/:term', function(req, res){

        const term = req.params.term;
        const Project = mongoose.model('Project');

        console.log(term);git commit -m “Add Readme.txt”

        Project.find({title:{$regex: new RegExp(term,'i')}}, function(err, docs){

            if(err){
                res.status(400).send(err);
            }else {
                res.send(docs);
            }

        });

    });

    server.post('/project', (req,res)=>{

        const data = req.body;

        const Project = mongoose.model('Project');

        const newProject = new Project(data);

        newProject.save(function(err){

            if(err){
                console.log(err);
                res.status(400).send(err);
            }else{
                res.send(newProject);
            }


        });

    });

    server.delete('/project/:id', (req,res)=>{

        const projectId = req.params.id;

        const Project = mongoose.model('Project');

        Project.findByIdAndRemove(projectId, function(err, doc){

            if(!err) {
                res.send(doc);
            }else{
                res.status(400).send(err);
            }

        });

    });

    server.get('/project/:id', (req, res)=>{

        const projectId = req.params.id;

        const Project = mongoose.model('Project');

        Project.findById(projectId, (err, doc)=>{

            if(!err){
                res.send(doc);
            }else{
                res.status(400).send(err);
            }

        });

    });

    server.put('/project/:id', (req,res)=>{

        const projectId = req.params.id;
        const projectData = req.body;

        const Project = mongoose.model('Project');

        Project.findByIdAndUpdate(projectId, projectData, { new:true }, function(err, doc){

            if(!err) {
                res.send(doc);
            }else{
                res.status(400).send(err);
            }

        });

    });

};
