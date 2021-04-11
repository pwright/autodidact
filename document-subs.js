#!/usr/bin/env node

var fs = require('fs');


 const replace = require("replace-in-file");

var file = './substitutions.js'
  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    dry: true,
    quiet: true,

    //  tet
    from: /\/\/(.*)\nexports(.*) =/g,
    to: (...args) => {
      var comment = args[1];
      var command = args[2];
      
      console.log(command + ', "' + comment + '"');
      fs.appendFileSync('test/substitutions.csv', command + ', "' + comment + '"\n');

    }
  };

    //perform the substitution

    try {
      const results = replace.sync(options);
      console.log("Replacement results:", results);
    } catch (error) {
      console.error("Error occurred:", error);
    }

