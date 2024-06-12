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

/*const nameExist = async (shop = "") => {
  const shopExist = await Shop.findOne({ name: shop });
  if (!shopExist) {
    throw new Error(
      `La tienda con nombre ${shop} no existe en la base de datos!`
    );
  }
};

const nameNotExist = async (shop = "") => {
  const shopExist = await Shop.findOne({ name: shop });
  if (shopExist) {
    throw new Error(
      `La tienda con nombre ${shop} ya existe en la base de datos!`
    );
  }
};*/

module.exports = {
  emailExist,
  emailNotExist,
};
