# Autodidact

Automate the creation of vscode didact tutorials.

This code helps create didact tutorials from existing files.


## Example

To see this in action, consider this README file, to convert it to didact:

```
$ cd .autodidact;npm i
```
That installs the required dependencies, now you can convert the file:

```
$ ./convert.sh
```

## What's in scope

Single line commands and links in comments are converted.

<!--- [Click here to see a commented didact link](didact://?commandId=workbench.action.showCommands) --->

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

## Suggested configuration

1. Copy the contents of `.autodidact` to your project

2. Edit the `convert.sh` file to suit your repo. 
For example you might want to convert `project/test.md`, change the file to:

```
./markdown-commands.sh project/test
```

Notes:

* do not specify the suffix in this file
* note that this code example is not changed when you convert (because it does not start with `$`)

