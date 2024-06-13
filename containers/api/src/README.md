# Considerations:

The Test Collection in the Subscriptions collection must exist in the database.
There is a .json file (seed) with the example collection or following the insertion instructions to mongodb discussed above is enough to have data for the api

#endPoints 

EndPoints:
```
subscription:

GET /api/subscription -> Returns the entire list with all subscribers in an array.
GET /api/subscription/:id -> Returns object with a subscriber
PUT /api/subscription/:id -> Updates a subscriber.
POST /api/subscription -> Adds a subscriber.
POST /api/subscription/register -> Returns a promotional link with a subscription code.
DELETE /api/subscription/:id -> Delete a subscriber.
```

## Pre requirements
_In order to run the project on your local machine you must have the following tools pre-installed:_
```
Node 14.x.x
Docker
Docker-compose
```

## Facility
_Before running the project you must install the dependencies that are necessary for it to run correctly and we do it in the following way:_
```shell
$ cd into root directory where is the package.json
$npm install
```

##Test
_This project has unit tests carried out with Mocha and Chai_
_Open 2 terminals, in one execute the project and in the other execute the following:_
```shell
$ cd into root directory where is the package.json
$npm run test
```
##Static code quality analysis
_to start code testing with Sonarqube we must follow the following steps:_
```shell
$docker pull sonarqube
$ docker run -d --name sonarqube -p 9000:9000 sonarqube
```
Then open the browser at localhost:9000, wait for sonarqube to load
It will ask you for username and password, both are 'admin', then you must change the password.

Now we go to the project to the file 'sonar-project.properties' and we are going to put the username and password in the last lines:
```
sonar.login=<USER>
sonar.password=<PASSWORD>
```
then we execute the code:
```shell
$npm run sonar
```
We wait until there are no errors and the process ends.
We return to the browser localhost:9000/projects and reload, your project will appear in a few moments.

## Equipment
* **Francisco Roa Valenzuela** - *Developer* -