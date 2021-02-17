//convert markdown comments to didact links
// <!--- didact-link -->

const replace = require('replace-in-file');

// get file to process
var file = process.argv[2];
console.log('processing: ' + file);


//set up the substitution
const options = {
  files: file,
  //  comment-start link comment-end
  from: /\/\/ (.*) didactlink/g,
  to: (...args) => {
    console.log('commented link: ' + args[1]);
    var commentedLink = args[1];
    return commentedLink;
  }
  ,
};


//perform the substitution

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}