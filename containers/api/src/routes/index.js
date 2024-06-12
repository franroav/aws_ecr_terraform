const { Router } = require("express");
const subs = requiere("./subscription.js");
const router = Router();

router.use("/", subs);

module.exports = router;
