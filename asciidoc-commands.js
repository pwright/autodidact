// converts single line markdown code examples to didact links

const replace = require('replace-in-file');

// get file to process
var file = process.argv[2];
console.log('processing: ' + file);


//set up the substitution
const options = {
  files: file,
  //  codefence meta nl prompt space command nl codefence
  from: /----(.*)\n\$ (.*)\n----/g,
  to: (...args) => {
    console.log('command: ' + args[2]);
    var meta = args[1] || 'bash';
    var command = args[2];
    var link = '+++<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=' + meta + '$$' + encodeURIComponent(command) + ' style="text-decoration:none">' + command + '</a></pre>+++';
    return link;
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