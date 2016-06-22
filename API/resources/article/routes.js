const server = require('../../server').server;

module.exports = function(){

    server.get('/articles', function(req, res){

        res.send('Hello world articles');

    });

};

server.post('/article', (req, res)=> {

    const data = req.body;

    const Article = mongoose.model('Article');

    const newArticle = new Article(data);

    newArticle.save(function () {
        res.send(newArticle);
    