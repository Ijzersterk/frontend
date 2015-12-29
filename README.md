# Installation
Required: `nodejs`, `npm`  
Install globally: `npm install -g gulp`  
Install all the necessary dependencies with `npm install`  

# Gulp
[Gulp](http://gulpjs.com/) is a build system. 
Use `gulp watch` to start the front-end, it will then auto-watch all the style and script files for changes and execute the build system accordingly.

# Deploy
To deploy the website: `gulp build`.
It will create a `dist` directory  which is deployable and be can run independant.  
You can also use `gulp deploy` that will create only a zip file which is deployable.
