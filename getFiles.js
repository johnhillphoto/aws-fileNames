var fs = require('fs');
var path = require('path');
var dirPath = process.argv[2];  //directory path
var fileType = '.'+process.argv[3]; //file extension
var files = [];
fs.readdir(dirPath, function(err,list){
    if(err) throw err;
    for(var i=0; i<list.length; i++)
    {
        if(path.extname(list[i])===fileType)
        {
            files.push(list[i]); //store the file name into the array files
        }
    }
    console.log(files);
});

// node getFiles.js '/Volumes/Work on Server/Portfolio_Selects_Jpegs' jpg