// converts single line markdown code examples to didact links
exports.mdCommands = function (file) {
  const replace = require("replace-in-file");

  // get file to process

  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  codefence meta nl prompt space command nl codefence
    from: /```(.*)\n\$ (.*)\n```/g,
    to: (...args) => {
      console.log("command: " + args[2]);
      var meta = args[1] || "bash";
      var command = args[2];
      var link =
        "<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=" +
        meta +
        "$$" +
        encodeURIComponent(command) +
        ">" +
        command +
        "</a></pre>";
      return link;
    },
  };

  //perform the substitution

  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  // return
  return Date();
};

// makes all markdown comments visible
exports.mdComments = function (file) {
  const replace = require("replace-in-file");

  // get file to process

  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  comment-start link comment-end
    from: /\<\!--- (.*) ---\>/g,
    to: (...args) => {
      console.log("commented link: " + args[1]);
      var commentedLink = args[1];
      return commentedLink;
    },
  };
  //perform the substitution

  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  // return
  return Date();
};

// converts single line asciidoc code examples to didact links
exports.adocCommands = function (file) {
  const replace = require("replace-in-file");

  // get file to process

  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  codefence nl prompt space <command> nl codefence
    from: /----\n\$ (.*)\n----/g,
    to: (...args) => {
      console.log("command: " + args[1]);
      var command = args[1];
      var link =
        "+++<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=$$" +
        encodeURIComponent(command) +
        ' style="text-decoration:none">' +
        command +
        "</a></pre>+++";
      return link;
    },
  };

  //perform the substitution

  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  // return
  return Date();
};

// removes comment from lines that match "// <adoc comments> didactlink"
exports.adocComments = function (file) {
  const replace = require("replace-in-file");

  // get file to process
  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  comment-start link comment-end
    from: /\/\/ (.*) didactlink/g,
    to: (...args) => {
      console.log("commented link: " + args[1]);
      var commentedLink = args[1];
      return commentedLink;
    },
  };

  //perform the substitution

  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  // return
  return Date();
};
// converts code examples that start with "$ command" but also show output of command
exports.adocCommandWithOutput = function (file) {
  const replace = require("replace-in-file");

  // get file to process
  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  codefence nl prompt space command nl
    from: /----\n\$ (.*)\n/g,
    to: (...args) => {
      console.log("command with output: " + args[1]);

      var command = args[1];
      var link =
        "+++<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=$$" +
        encodeURIComponent(command) +
        ' style="text-decoration:none">' +
        command +
        "</a></pre>+++\n\nTypical output:\n----\n";
      return link;
    },
  };

  //perform the substitution

  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  // return
  return Date();
};

// converts code examples and directs them to specified named terminal 
exports.adocCommandtoTerminalName = function (file) {
  const replace = require("replace-in-file");

  // get file to process
  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  codespec nl codefence nl prompt space command nl codefence
    from: /\[.*term=(.*)\]\n----\n\$ (.*)\n----/g,
    to: (...args) => {
      console.log("command for "+ args[1] +": " + args[2]);
      var termname = args[1];
      var command = args[2];
      var link =
        "+++<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=" + termname +"$$" +
        encodeURIComponent(command) +
        ' style="text-decoration:none">' +
        command +
        "</a></pre>+++\n";
      return link;
    },
  };

  //perform the substitution

  try {
    const results = replace.sync(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  // return
  return Date();
};
