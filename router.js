var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var marked = require('marked')

var config = require('./config');
var utils = require('./utils');

router.get("*", function(req, res){

    //get path from uri
    var contentPath = req.url.match('^[^?]*')[0];

    //join root path to content to uri path
    var fullPath = path.join(config.contentRootPath, contentPath);
    console.log('GET: ' + fullPath);

    //use README.md as default document in path if one is not specified
    if(!path.extname(fullPath)){
        fullPath = path.join(fullPath, 'README.md')
    }

    //check if file exists
    if (!fs.existsSync(fullPath)) {
        return res.sendStatus(404);
    }

    //read file contents
    var file = fs.readFileSync(fullPath);

    //check file extension is markdown
    if (utils.isFileExtensionMatch(fullPath, config.markdownFileExtensions)){
        //if markdown, return html rendered markdown
        var data = marked(file.toString());
        return res.render('index', { markdown:data })
    } else if (utils.isFileExtensionMatch(fullPath, config.nativeRenderFileExtensions)){
        //if native file (e.g. pdf), render directly - TODO: fix pdf rendering
        return res.send(file)
    } else {
        //all other files, render as code block
        var fileName = path.basename(fullPath);
        var fileExt = path.extname(fullPath);
        var data = marked('```' + fileExt + '\n' + file.toString() + '```');
        return res.render('index', { title:fileName, markdown:data })
    }

    res.render
    
});

module.exports = router;
