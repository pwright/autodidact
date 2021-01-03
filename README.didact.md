# autodidact

Automate the creation of vscode didact tutorials.

This code helps create didact tutorials from existing files.

To see this in action, consider this README file, to convert it to didact:

<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=bash$$npm%20i>npm i</a></pre>
That installs the required dependencies, now you can convert the file:

<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=bash$$.%2Fconvert.sh%20README>./convert.sh README</a></pre>


A tutorial might consist of a number of commands, eg:

<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=bash$$ls%20-al>ls -al</a></pre>

Sometimes, you might want to format the commands as per https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/creating-and-highlighting-code-blocks

<pre>$ <a href=didact://?commandId=vscode.didact.sendNamedTerminalAString&text=bash$$ls%20-al>ls -al</a></pre>

The script assumes:

* prompt ($) is used for all commands
* each command is a single line


