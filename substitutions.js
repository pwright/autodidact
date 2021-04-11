const { default: alasql } = require("alasql");

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

// converts queries to csv files and injects include statement
exports.adocQuery = function (file) {
  const replace = require("replace-in-file");
  const alasql = require("alasql");

  // get file to process

  console.log("processing query: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  query and resultant csv file name in []
    from: /query::(.*)\[(.*)\]/g,
    to: (...args) => {
      console.log("query: " + args[1]);
      var query = args[2];
      var file = args[1];
      // SELECT * INTO CSV('names.csv') FROM
      intoQuery = query.replace(/from/g,"into CSV('"+file+"') from");
      console.log(intoQuery);

      alasql(intoQuery);
      var includeCsv = '[format="csv", separator=";" options="header"]\n';
      var includeCsv = includeCsv + "|===\n" ;
      var includeCsv = includeCsv + "include::" + file + "[]\n";

      var includeCsv = includeCsv + "|===";
      return includeCsv;
    },
  };

  //perform the substitution

  try {
    const results = replace.sync(options);
    console.log("Query Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  // return
  return Date();
};

// removes comment from lines that match '// <adoc comments> didactlink'
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

// Creates refresh link from lines that match '// Refresh didactrefresh'
exports.adocRefresh = function (file) {
  const replace = require("replace-in-file");

  // get file to process
  console.log("processing: " + file);

  //set up the substitution
  const options = {
    files: file,
    //  comment-start link comment-end
    from: /\/\/ Refresh didactrefresh/g,
    to: (...args) => {
      console.log("commented refresh: " + args[1]);
      var filename = file.replace(/^.*[\\\/]/, '')
      var commentedLink = 'link:didact://?commandId=vscode.didact.startDidact&text=file://{docdir}/'+filename+'[Refresh]';
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

// converts code examples that start with '$ command' but also show output of command
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
