# Dictate it!

![Build Status](https://travis-ci.org/SpenGietz/dictate-it.svg?branch=master)

### Overview

* This Full-Stack application provides the necessary back-end infrastructure and user interface to create, read, update and destroy dictations created by the user by converting speech to text.

* Considering the fact that transcribing is extremely difficult, there isn't incredible accuracy within transcribing API's. This leads to our goal of allowing users to live edit dictations in order to save their most accurate version.

* The purpose of our application and supporting infrastructure is to provide a user friendly way for users to trascribe speech and text, especially users who are hearing impaired.

### The Current Version (0.0.1)

* The current version of this program is designed to create, read, update, and destroy dictations that are recorded and edited by the user.

* This API is designed to be versatile so that anyone can browse past dictations and have the ability to create a user in order to create new new dictations.

### Contributions

* Reporting bugs:
  * open an issue through this github repository and select 'bug' as the label.


* Recommended enhancements or updates:
  * open an issue through this github repository and select 'enhancement' as the label.


* Issues will be reviewed by a moderator weekly.

### Architecture

* This application is structured in a MERN architecture pattern. We used the React.js library to build the user interface and the frameworks we used were express.js (middleware, node.js web application framework), node.js (JS runtime built on Chromes V8 JS engine), and mongodb(open source document database for querying and indexing).

### Middleware

* The express router middleware provides us with a base routing capability.

  * The handle-errors module implements and extends the http-errors npm middleware package.

  * An auth middleware module leverages two npm modules (jsonwebtoken, bcrypt) and the node.crypto module to provide user sign-up and user login functionality in addition to session authorization and authentication(using basic auth and bearer auth).

  * The mongoose npm module (that has the worlds worst docs) is used to interact with the mongo database.

### Lib

* This directory holds all of our middleware files that we created as well as our server, including:

  * basic auth middleware(authorization)

  * bearer auth middleware(authentication)

  * error middleware(basic)

  * s3 upload middleware(streaming multer storage engine for AWS s3)

### Model

* This directory holds our three models:

  * **Dictation** - contains a mongoose model Schema with properties related to our dictations.

  * **User** - contains a mongoose model Schema with properties required for a user.

    * The user Schema has methods attached to it for creating a user, creating a token, creating a tokenSeed, hashing a password, and password hash compare.


#### Front-end

##### Views
    - The views are handled in a component architecture.

##### Redux
     - Redux.js is a predictable state container that requires *actions* (plain objects) to be dispatched in order to change the application state.  The state cannot be modified directly.  This provides predictability, i.e. the same actions in the same order will produce the same results.



#### Back-end

##### RESTful API Routes – All data is returned as JSON


### POST /api/signup
&nbsp;

* This POST route requires the user to provide a username, password, and email, and basic auth gives them a tokenSeed.

  * This route will create a new user by providing a username, password, and email address in the body of the request.

  * Creating a new user is required to store and access data later.
  * This request must be completed before attempting to use the api/signup route.

`{"username":"User123", "password":"iDictate!2115", "email":"dictate.it@gmail.com"}`

* A token will be returned that will only be used for the api/login route.

  * After signing in you will receive a new token that will be a reference for all future routes.

### POST /dictations/create
&nbsp;

* This POST route is a route that can be created by a User.

  * This route will create and return a new dictation by providing all of the required properties of the dictation model.

  * Once a users userID are authenticated with Bearer auth they will be allowed to create a new dictation.

### GET /api/login
&nbsp;

* This GET route requires an Authorization header, and the user to provide a username and password.

  * The Authorization header needs to include the username:password of the specific user to be authenticated.

  * Logging in will return a brand new token that will be used for future user ID reference.

### GET /dictations/:id
&nbsp;

* This GET route requires a userID and a dictationID.

  * This route will return a view of a dictation posting on the site, with all of the properties the dictation model requires.

  * Once a users token is verified by Bearer auth they will be allowed to view create a dictation.

### PUT /dictations/:id
&nbsp;

* This PUT route requires a dictationID in order to update a dictation.

  * This route will return an updated dictation posting with the required properties of the dictation model.

  * The user must be authenticated by Bearer auth in order to update a dictation, and in order to be authenticated they need a userID.

  * Once a user has been authenticated by Bearer auth, they will be allowed to update an existing dictation post.


### DELETE /dictations/:id
&nbsp;

* This PUT route requires a userID in order to delete a dictation from the site.

  * This route will return a view that the dictation has been successfully deleted from the database and website.

  * The user must be authenticated by Bearer auth in order to delete a dictation, and in order to be authenticated they need a userID.

  * Once a user has been authenticated by Bearer auth they will be allowed to delete a dictation.

###
&nbsp;


&copy; Dictate it!  
