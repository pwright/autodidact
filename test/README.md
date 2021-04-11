## What it does to Markdown files

If you have a command written with a codefence and using the `$` prompt, it is converted to a didact link.

If you create didact links, you can hide them in comments, eg

`<!--- [Click here to show command pallette](didact://?commandId=workbench.action.showCommands) --->`

## Example

To see this in action, consider this README file, to convert it to didact:

```
$ npm i 
```

That installs the required dependencies, now you can install autodidact as a global command:

```
$ npm i -g .
```


To convert the README.md file:

```
$ autodidact README.md
```

## What's in scope

Single line commands and links in comments are converted.

<!--- [Click here to show command pallette](didact://?commandId=workbench.action.showCommands) --->

A tutorial might consist of a number of commands, eg:

```
$ ls -al
```

Sometimes, you might want to format the commands as per https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/creating-and-highlighting-code-blocks

```bash
$ ls -al
```

The script assumes:

* prompt ($) is used for all commands
* each command is a single line

# What it does to AsciDoc files with `act.adoc` file suffix

* outputs files with 'didact.adoc' (avoiding double adoc)
* creates refresh link

* supports sql acting on csv files.

```bash
$ autodidact test/asciidoc.act.adoc
```

Note: Only works on *.act.adoc files.



