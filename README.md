[![Build Status](https://app.travis-ci.com/emeu17/jsramverk_backend.svg?branch=main)](https://app.travis-ci.com/emeu17/jsramverk_backend)

# Jsramverk

This project was created during the course Jsramverk, autumn 2021

## Kmom02

Created a basic Node.js Express API to create and update documents.

### How to start up the api locally
Run ```npm install```to install the dependencies from package.json
To start up the application run ```npm start```
or ```npm start_nm``` if you want to be able to edit the files
and not have to restart the server each time.

You will find the routes on http://localhost:1337
with the routes /, /docs and /list deployed. With the route ***docs*** you can list, create a new document (post) or update a document (put). With post or put you need to supply the document  ***name*** and (new) ***content***)

## Kmom03

Added tests using Mocha and Chai. Moved some of the code from the routes to model-files for easier maintenance and reusability.

## Kmom04

Added sockets, creating the possibility to edit the same document from multiple clients.

## Kmom05

Added authentication - registering and logging in users. Need to login to see documents.

## Kmom06

GraphQL added. Possible to query users and docs and the combination of both.

## Project

Added mailgun in order to send emails with invite to edit a specific document.
