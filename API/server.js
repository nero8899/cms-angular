const express   = require('express');
const server    = express();
const bodyParser= require('body-parser');
const cors      = require('cors');
const PORT      = require('./config').PORT;

exports.server = server;

exports.init = function(){

    return new Promise(function(resolve, reject){

        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({extended:true}));
        server.use(cors());
        server.listen(PORT, function(){

            console.log('Server started');
            resolve();

        });

    });

};