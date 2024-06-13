# Consideraciones:

La Collection de prueba en la colleción Subscriptions deben existir en la base de datos.
existe un archivo(seed) .json con la collection que se necesita insertar en base de datos

Aun falta me faltan hacer mas pruebas unitarias en el front 
aun falta verificar y comprobar si mi aplicacion en docker esta correctamente configurada y esta todo bien definidos los servicios que componen mi aplicación

# endPoints 

EndPoints:
```
subscription:

GET /api/subscription -> Retorna toda la lista con todos los suscriptor en un array.
GET /api/subscription/:id -> Retorna objeto con un suscriptor
PUT /api/subscription/:id -> Actualiza un suscriptor.
POST /api/subscription -> Añade un suscriptor.
POST /api/subscription/register -> Retorna un link promocional con un codigo de subscripción.
DELETE /api/subscription/:id -> Elimina un suscriptor.
```

## Pre-requisitos
_Para poder ejecutar el proyecto en tu máquina local debes tener pre-instaladas las siguientes herramientas:_
```
Node 14.x.x
Docker
Docker-compose
```

## Instalación
_Antes de ejecutar el proyecto debes instalar las dependencias que son necesarias para que se ejecute de manera correcta y lo hacemos de la siguiente forma:_
```shell
$ cd into root directory where is the package.json
$ npm install
```

## Test
_Este proyecto cuenta con pruebas unitarias realizadas con Mocha y Chai_
_Abrir 2 terminales, en una realizar la ejecución del proyecto y en la otra ejecutar lo siguiente:_
```shell
$ cd into root directory where is the package.json
$ npm run test
```
## Análisis estático de calidad de código
_para iniciar las pruebas de código con Sonarqube debemos seguir los siguientes pasos:_
```shell
$ docker pull sonarqube
$ docker run -d --name sonarqube -p 9000:9000 sonarqube
```
Luego abrir el navegador en localhost:9000, esperar a que cargue sonarqube
Te pedirá usuario y contraseña, ambas son 'admin', luego debes cambiar el password.

ahora vamos al proyecto al archivo 'sonar-project.properties' y vamos a poner el usuario y contraseña en las ultimas lineas:
```
sonar.login=<USER>
sonar.password=<PASSWORD>
```
luego ejecutamos el código:
```shell
$ npm run sonar
```
esperamos a que no existan errores y el proceso termine.
volvemos al navegador localhost:9000/projects y recargamos, tu proyecto aparecerá en unos instantes.

## Equipo
* **Francisco Roa Valenzuela** - *Desarrollador* -