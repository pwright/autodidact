#!/usr/bin/env node
var autosubs = require("./substitutions");
const exec = require("child_process").execSync;
var greeting = "";

const argv = require("yargs").command(
  "$0 <source file> [mockdown]",
  "mockdown only applies to adoc files, requires asciidoctor, and creates html with a didact.md suffix that didact can display",
  () => {},
  function ({ sourcefile, mockdown }) {
    console.log({ sourcefile, mockdown });

    //destinationfile =md translates as *.adoc converts to *.didact.md (displaying html)
    var ext = sourcefile.substring(sourcefile.indexOf("."));
    switch (ext) {
      case ".md":
        greeting = `Converting Markdown ${sourcefile}!`;
        console.log(greeting);

        exec(`cp ${sourcefile} ${sourcefile}.didact.md`, {});
        autosubs.mdCommands(`${sourcefile}.didact.md`);
        autosubs.mdComments(`${sourcefile}.didact.md`);
        break;

      case ".adoc":
        greeting = `Converting  filename AsciiDoc (${sourcefile})! `;

        console.log(greeting);
        console.log(" ");

        var destinationfile = sourcefile.replace(/.adoc$/, ".didact.adoc");
        console.log("Mockdown  " + destinationfile);
        exec(`cp ${sourcefile} ${destinationfile}`, {});

        // order of substitutions
        autosubs.adocQuery(`${destinationfile}`);
        autosubs.adocCommandtoTerminalName(`${destinationfile}`);
        autosubs.adocCommands(`${destinationfile}`);
        autosubs.adocComments(`${destinationfile}`);
        autosubs.adocRefresh(`${destinationfile}`);

        autosubs.adocCommandWithOutput(`${destinationfile}`);

        if (mockdown=='mockdown') {
          var mockdownfile = destinationfile.replace(/.adoc$/, ".md");
          exec(`asciidoctor ${destinationfile} -o $(mockdownfile)`, {});
          exec(`rm ${destinationfile}`, {});

        }
        break;

      default:
        greeting = `Cannot convert ${sourcefile}!`;
        console.log(greeting);
    }
  }
).argv;
