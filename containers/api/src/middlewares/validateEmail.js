const { validationResult } = require("express-validator");
//const User = require('../models/user');
//const Shop = require('../models/shop');

const emailValidator = (req, res, next) => {
  console.log(`Hola soy el correo ${req.body.email}`);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  emailValidator,
};
