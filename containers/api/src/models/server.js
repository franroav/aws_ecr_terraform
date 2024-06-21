const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const helmet = require("helmet");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
const config = require("../config/config").ENV;
const expressWinston = require('express-winston');
const { createLogger, format, transports } = require('winston');
const uuidv4 = require('uuid').v4;  // Correctly import uuid
/**
 * SERVER CLASS
 */
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT; // env variable
    this.subscriptionPath = process.env.SUBSCRIPTION_PATH; // env variable
    const db = this.connectionDB(); // Connection to DB
    this.middlewares(); // Middlewares
    this.routes(); // Routes
    this.swaggerConfig(this.app);

  }

  routes() {
    this.app.use(this.subscriptionPath, require("../routes/subscription"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }

  middlewares() {
    this.app.use(cors()); // CORS
    this.app.use(helmet()); // security
    this.app.use(express.urlencoded({ extended: false })); // parse application/json
    this.app.use(express.json()); // parses incoming requests with JSON payloads and is based on body-parser
    this.app.use(express.static("public")); //Public file from server output
  }

  async connectionDB() {
    await dbConnection();
  }

  async swaggerConfig(app){

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Express API',
      version: '1.0.0',
      description: 'API Documentation',
      contact: {
        name: 'Developer'
      },
      servers: [`http://${config.host}:${config.port}`]
    }
  },
  apis: ['./routes/subscription.js'] // Point to the file where API routes are defined
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Configure winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: '/var/log/app/app.log' }) // Adjust the path as needed
  ],
});

// Middleware to log requests and responses
app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: (req, res) => {
    const body = {
      uuid: uuidv4(),
      container: 'node-app',
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
      path: req.url,
      tiempo: res.responseTime + 'ms',
      estado: res.statusCode < 300 ? 'success' : 'error',
      request: {
        method: req.method,
        headers: req.headers,
        body: req.body
      },
    };
    return JSON.stringify(body);
  },
  meta: true,
  dynamicMeta: (req, res) => {
    return {
      userAgent: req.headers['user-agent'],
      remoteAddress: req.connection.remoteAddress,
      referer: req.headers['referer'] || '',
      containerName: 'node-app'
    };
  }
}));

console.log("swagger configurado!");

  }
}

module.exports = Server;



// const express = require("express");
// const cors = require("cors");
// const { dbConnection } = require("../database/config");
// const helmet = require("helmet");
// /**
//  * SERVER CLASS
//  */
// class Server {
//   constructor() {
//     this.app = express();
//     this.port = process.env.PORT; // env variable
//     this.subscriptionPath = process.env.SUBSCRIPTION_PATH; // env variable
//     const db = this.connectionDB(); // Connection to DB
//     this.middlewares(); // Middlewares
//     this.routes(); // Routes
//   }

//   routes() {
//     this.app.use(this.subscriptionPath, require("../routes/subscription"));
//   }

//   listen() {
//     this.app.listen(this.port, () => {
//       console.log("Servidor corriendo en el puerto", this.port);
//     });
//   }

//   middlewares() {
//     this.app.use(cors()); // CORS
//     this.app.use(helmet()); // security
//     this.app.use(express.urlencoded({ extended: false })); // parse application/json
//     this.app.use(express.json()); // parses incoming requests with JSON payloads and is based on body-parser
//     this.app.use(express.static("public")); //Public file from server output
//   }

//   async connectionDB() {
//     await dbConnection();
//   }
// }

// module.exports = Server;
