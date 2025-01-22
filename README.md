# url_shorten_api
Shorten URL Project

Instructions to run this project 

install node.js and all other dependencies mentiond in package.json file

install mongodb 
install redis server using WSL(Windows SubSystem for Linux) fro Windows
run command mongod to run mongodb service
run redis-server to run redis server

run node src/app.js to check if it is working

Features 
-- there are folders mention with feature and activity they perform
config folder contains configuration for mongodb datagase and redis server

controlles folder contains code which shorten url and redirect url 
analyticsController.js contains url analytics for topic based means specific url and overall url 

authController.js contains authentication logic for google signin 

urlController.js contains logic for shorten url and redirect url

middleware folder contains file for token verification and Limiting request 

models folder contains database model for this project 

routes folder contains url routes for different routes like analytics routes and authroutes

utils folder contains url shortner file 

app.js is the main file this is the entry point for this API

swagger.json cntains documention for this API

