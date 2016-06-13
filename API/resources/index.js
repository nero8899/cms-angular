

module.exports = function(){

    require('./article/model');
    require('./article/routes')();

    require('./project/model');
    require('./project/routes')();

};