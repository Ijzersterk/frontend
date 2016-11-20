# Installation
Required: `nodejs` v6 or higher, `npm` and the UNIX tool `zip`.  
Install all the necessary dependencies with `npm install`  

# Development
You will need a static server. This can be accomplished with `npm run server` which uses browser-sync to start a static server. Or you can use `python -m SimpleHTTPServer`. Or whatever you prefer.

To compile the less files to a single css file use `npm run less`. It will auto compile on change.

# Deploy
Run `npm run zip` it will create a zip file with the files which are necessary and with the version number in it.  
If you are windows, check the `package.json` file which files need to be zipped and do it manually.
