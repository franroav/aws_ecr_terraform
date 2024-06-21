const Subscription = require("../models/subscription");
//const Shop = require("../models/shop");

const emailNotExist = async (emailUser = "") => {
  console.log({ email: emailUser });
  const subscription = await Subscription.findOne({ email: emailUser });
  console.log({ subscription });
  // !subscription.hasOwnProperty("email")
  if (!subscription) {
    throw new Error(
      `El usuario con email ${emailUser} no existe en la base de datos!`
    );
  }
};

const emailExist = async (emailUser = "") => {
  const subscription = await Subscription.findOne({ email: emailUser });
  if (subscription) {
    throw new Error(
      `El usuario con email ${emailUser} ya existe en la base de datos!`
    );
  }
};


module.exports = {
  emailExist,
  emailNotExist,
};
