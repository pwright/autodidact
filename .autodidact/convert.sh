# the script below copies the markdown to a .didact.md file and replaces all commands
./markdown-commands.sh ../README

# no need to copy the file, just run the js to process comments
node ./markdown-comments.js ../README