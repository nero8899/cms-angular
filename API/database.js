const mongoose = require('mongoose');

exports.init = function(){

    return new Promise(function(resolve, reject){

        mongoose.connect('mongodb://localhost/cms-nermin');

        mongoose.connection.on('error', function(err){

            reject(err);

        });

        mongoose.connection.once('open', function(){

            console.log('Connection open');
            resolve();

        });

    });

};