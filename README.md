# Jsramverk

This project was created during the course Jsramverk, autum 2021

## Kmom02

Created a basic Node.js Express API to create and update documents.

### How to start up the api locally
Begin with running ```npm init```
Run ```npm install```to install the dependencies from package.json
To start up the application run ```node api.js```
or ```npm start``` if you want to be able to edit the files
and not have to restart the server each time.

You will find the routes on http://localhost:1337
with the routes /, /docs and /list. With the route docs you can create a new document (post: ***name*** and ***content***) or update a document (put: ***name*** and new ***content***)