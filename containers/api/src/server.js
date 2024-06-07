// const express = require('express');
// const app = express();
// const port = 3000;
// const host = '0.0.0.0'

// // Route 1: GET /api/users
// app.get('/api/users', (req, res) => {
//   res.json([
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
//     { id: 3, name: 'Jim Brown', email: 'jim@example.com' }
//   ]);
// });

// // Route 2: GET /api/products
// app.get('/api/products', (req, res) => {
//   res.json([
//     { id: 1, name: 'Product 1', price: 10.99 },
//     { id: 2, name: 'Product 2', price: 19.99 },
//     { id: 3, name: 'Product 3', price: 29.99 }
//   ]);
// });

// // Route 3: GET /api/orders
// app.get('/api/orders', (req, res) => {
//   res.json([
//     { id: 1, user_id: 1, product_id: 2, quantity: 1 },
//     { id: 2, user_id: 3, product_id: 1, quantity: 4 },
//     { id: 3, user_id: 2, product_id: 3, quantity: 2 }
//   ]);
// });

// // Start the server
// app.listen(port, host);


'use strict';

const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';
const OS = require('os');
const ENV = 'DEV';

const app = express();

// Route 1: GET /api/users
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Jim Brown', email: 'jim@example.com' }
  ]);
});

// Route 2: GET /api/products
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 29.99 }
  ]);
});

// Route 3: GET /api/orders
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
  // res.send('Hello world \n');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

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

// console.log(`Running version 3 on http://${HOST}:${PORT}`);