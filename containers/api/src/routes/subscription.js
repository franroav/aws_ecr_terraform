const { Router } = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  register,
  subscription,
} = require("../controllers/subscription");
const { check } = require("express-validator");
const { emailValidator } = require("../middlewares/validateEmail");
const { emailExist, emailNotExist } = require("../helpers/database-validator");

const router = Router();
router.post(
  "/register/invite/:code",
  [
    check(
      "email",
      "emailUser no se encontro en el cuerpo de la peticion"
    ).isEmail(),
    check("email").custom(emailExist),
    emailValidator,
  ],
  subscription
);
router.post(
  "/subscription/register",
  [
    check(
      "email",
      "emailUser no se encontro en el cuerpo de la peticion"
    ).isEmail(),
    check("email").custom(emailNotExist),
    emailValidator,
  ],
  register
);
router.get("/subscription", getAll);
router.post(
  "/subscription",
  [
    check(
      "email",
      "emailUser no se encontro en el cuerpo de la peticion"
    ).isEmail(),
    check("email").custom(emailExist),
    emailValidator,
  ],
  create
);
router.get("/subscription/:id", getOne);
router.put("/subscription/:id", update);
router.delete("/subscription/:id", deleteOne);

module.exports = router;
