// converts single line markdown code examples to didact links

const replace = require('replace-in-file');

// get file to process
var file = process.argv[2];
console.log('processing: ' + file);


//set up the substitution
const options = {
  files: file,
  //  codefence nl prompt space command nl
  from: /----\n\$ (.*)\n/g,
  to: (...args) => {
    console.log('command: ' + args[1]);
    
    var command = args[1];
    var link = '+++<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=$$' + encodeURIComponent(command) + ' style="text-decoration:none">' + command + '</a></pre>+++\n\nTypical output:\n----\n';
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