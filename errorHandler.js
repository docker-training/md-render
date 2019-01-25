module.exports = function(req, res, next){
    console.log(res.statusCode);
    if (res.statusCode === 404){
        if (req.accepts('html')) {
            res.render('404');
            return;
        }

        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }

        return res.type('txt').send('Not found');
    }
    next();
};
