const server = require('./server');
const database = require('./database');
const config = require('./config');

database.init()
    .then(server.init)
    .then(()=>{
        require('./resources')();
    })
    .then(()=>{

        console.log('All is well | on port: '+config.PORT);

    })
    .catch(function(err){

        console.log('Catch error:',err);

    });