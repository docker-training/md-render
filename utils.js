var path = require('path');

var utils = {};

utils.isFileExtensionMatch = function(filePath, fileExtensionArray){
    var match = false;
    fileExtensionArray.forEach(function(element) {
        if (path.extname(filePath).toLowerCase() === element){
            match = true;
        }
    }, this);
    return match;
}

module.exports = utils;
