/**
 * PRODUCTION CONFIGURATION / 
 * @param {*} config
 * @param {*} ENV
 * @param {*} SERVER
 * @returns {Object} // ALL OBJECT RESPONSES
 */

// require("dotenv").config();
// require("dotenv").config();
// const config = require("./config/config").ENV;
// global.ENV = config;
// global.node_env = process.env.NODE_ENV;

// const Server = require("./models/server");
// const server = new Server();

// server.listen();



/**
 * DEVELOPMENT CONFIGURATION / 
 * @param {*} PORT
 * @param {*} ENV
 * @param {*} HOST
 * @returns {Object} // ALL OBJECT RESPONSES
 */

'use strict';

const express = require('express');
const expressWinston = require('express-winston');
const { createLogger, format, transports } = require('winston');
const OS = require('os');
const uuidv4 = require('uuid').v4;  // Correctly import uuid
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = 3000;
const HOST = '0.0.0.0';
const ENV = 'DEV';

const app = express(); // Define Express app

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
      servers: [`http://${HOST}:${PORT}`]
    }
  },
  apis: ['./server.js'] // Point to the file where API routes are defined
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

// API Routes

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Jim Brown', email: 'jim@example.com' }
  ]);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 */
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 29.99 }
  ]);
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 */
app.get('/api/orders', (req, res) => {
  res.json([
    { id: 1, user_id: 1, product_id: 2, quantity: 1 },
    { id: 2, user_id: 3, product_id: 1, quantity: 4 },
    { id: 3, user_id: 2, product_id: 3, quantity: 2 }
  ]);
});

app.get('/', (req, res) => {
  res.statusCode = 200;
  const msg = 'Hello from /test Node!';
  res.send(getPage(msg));
});

app.listen(PORT, HOST, () => {
  logger.info(`Running on http://${HOST}:${PORT}`);
});

function getPage(message) {
  let body = "<!DOCTYPE html>\n"
    + "<html>\n"
    + "<style>\n"
    + "body, html {\n"
    + "  height: 100%;\n"
    + "  margin: 0;\n"
    + "}\n"
    + "\n"
    + ".bgimg {\n"
    + "  background-image: url('https://www.w3schools.com/w3images/forestbridge.jpg');\n"
    + "  height: 100%;\n"
    + "  background-position: center;\n"
    + "  background-size: cover;\n"
    + "  position: relative;\n"
    + "  color: white;\n"
    + "  font-family: \"Courier New\", Courier, monospace;\n"
    + "  font-size: 25px;\n"
    + "}\n"
    + "\n"
    + ".topleft {\n"
    + "  position: absolute;\n"
    + "  top: 0;\n"
    + "  left: 16px;\n"
    + "}\n"
    + "\n"
    + ".bottomleft {\n"
    + "  position: absolute;\n"
    + "  bottom: 0;\n"
    + "  left: 16px;\n"
    + "}\n"
    + "\n"
    + ".middle {\n"
    + "  position: absolute;\n"
    + "  top: 50%;\n"
    + "  left: 50%;\n"
    + "  transform: translate(-50%, -50%);\n"
    + "  text-align: center;\n"
    + "}\n"
    + "\n"
    + "hr {\n"
    + "  margin: auto;\n"
    + "  width: 40%;\n"
    + "}\n"
    + "</style>\n"
    + "<body>\n"
    + "\n"
    + "<div class=\"bgimg\">\n"
    + "  <div class=\"topleft\">\n"
    + "    <p>ENVIRONMENT: " + ENV + "</p>\n"
    + "  </div>\n"
    + "  <div class=\"middle\">\n"
    + "    <h1>Host/container name</h1>\n"
    + "    <hr>\n"
    + "    <p>" + OS.hostname() + "</p>\n"
    + "  </div>\n"
    + "  <div class=\"bottomleft\">\n"
    + "    <p>" + message + "</p>\n"
    + "  </div>\n"
    + "</div>\n"
    + "\n"
    + "</body>\n"
    + "</html>\n";
  return body;
}