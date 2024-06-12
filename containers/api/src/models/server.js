const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const helmet = require("helmet");
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
}

module.exports = Server;
