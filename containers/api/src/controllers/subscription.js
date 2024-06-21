const { response, request } = require("express");
const Subscription = require("../models/subscription");
const externalService = require("../service/subscriber.service");
const moment = require("moment"); // require


/**
 * SUBSCRIPTION
 * @param {*} req // REQUEST
 * @param {*} res // RESPONSE
 * @returns {Object} // GENERATE A REGISTER LINK
 */
const subscription = async (req, res = response) => {
  try {
    const { email } = req.body;
    const sub = await Subscription.findOne({
      email: email,
    });
    const code = await generateCode(); // code
    return res.status(200).json({
      subscription: `${process.env.SERVER}/register/invite/${code}`,
    });
  } catch (err) {
    console.log(err);
    throw res.status(500).json({
      msg: ` Error, aplicatión error!`,
    });
  }
};
/**
 * REGISTER
 * @param {*} req // REQUEST
 * @param {*} res // RESPONSE
 * @returns {Object} // GENERATE A REGISTER LINK
 */
const register = async (req, res = response) => {
  try {
    const { email } = req.body;
    const sub = await Subscription.findOne({
      email: email,
    });
    return res.status(200).json({
      subscription: `${process.env.SERVER}/register/invite/${sub.code}`,
    });
  } catch (err) {
    console.log(err);
    throw res.status(500).json({
      msg: ` Error, aplicatión error!`,
    });
  }
};

/**
 * GET / GETALL
 * @param {*} req
 * @param {*} res
 * @returns {Object} // ALL OBJECT SUBSCRIBER
 */
const getAll = async (req, res = response) => {
  try {
    const subscription = await Subscription.find();
    if (!subscription.length) {
      return res.status(204).json();
    }
    if (!subscription) {
      return res.status(404).json({ message: ` Error, Not Found` });
    }

    return res.status(200).json({
      subscription: subscription,
    });
  } catch (err) {
    console.log(err);
    throw res.status(500).json({
      msg: ` Error, aplicatión error!`,
    });
  }
};
/**
 * POST / CREATE
 * @param {*} req
 * @param {*} res
 * @returns
 */
const create = async (req, res = response) => {
  try {
    const body = req.body;
    const validationBody = await validateRequest(body);
    if (validationBody) {
      console.log({ newCode: req.body });
      const sub = await Subscription.findOne({
        code: req.body.code,
      });
      if (!sub) {
        return res.status(404).json({ message: ` Error, Not Found` });
      }
      if (sub) {
        console.log("si hay code");
        const updatePartners = Subscription.updateOne(
          { _id: sub._id },
          {
            $push: {
              traces: {
                email: req.body.email,
                name: req.body.name,
              },
            },
          },
          (err, subscriber) => {
            if (err) throw err;
            return subscriber;
          }
        );
        const sumInvitations = Number(sub.invitation) + 1;
        const updateInvitation = Subscription.updateOne(
          { _id: sub._id },
          { invitation: sumInvitations },
          (err, subscriber) => {
            if (err) throw err;
            return subscriber;
          }
        );
        const updateAmount = Subscription.updateOne(
          { _id: sub._id },
          { amount: Number(sub.amount) + 5000 },
          (err, subscriber) => {
            if (err) throw err;
            return subscriber;
          }
        );
      }
      const createSubsTemplate = await serviceTemplate(req.body); // service template
      let subscription = new Subscription(createSubsTemplate);
      const subs = await subscription.save(function (err) {
        if (err) {
          console.log(err);
          return;
        }
      });
      console.log({ subscription });
    } else {
      throw res.status(400).json({
        message: ` Error, Bad request`,
      });
    }
    return res.status(200).json(subscription);
  } catch (err) {
    console.log(err);
    throw res.status(500).json({
      msg: ` Error, aplicatión error!`,
    });
  }
};
/**
 * GET / GETONE
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getOne = async (req, res = response) => {
  try {
    const id = req.params.id;
    const sub = await Subscription.findOne({
      _id: id,
    });

    console.log(sub);
    if (sub === undefined || sub === null) {
      throw res.status(404).json({
        message: ` Error, Not Found`,
      });
    }
    return res.status(200).json({ subscription: sub });
  } catch (err) {
    console.log(err);
    throw res.status(500).json({
      msg: ` Error, aplicatión error!`,
    });
  }
};
/**
 * PUT / UPDATEONE
 * @param {*} req
 * @param {*} res
 * @returns
 */
const update = async (req, res = response) => {
  try {
    const id = req.params.id;
    const sub = await Subscription.findOne({
      _id: id,
    });
    if (!sub) {
      throw res.status(404).json({
        message: ` Error, Not Found`,
      });
    }
    const subscriptionUpdate = Subscription.findOneAndUpdate(
      { name: req.body.name },
      { email: req.body.email },
      { address: req.body.address },
      (err, subscriber) => {
        if (err) throw err;
        return subscriber;
      }
    );
    return res.status(200).json({
      message: `subscriptor correctamente actualizado!`,
    });
  } catch (err) {
    console.log(err);
    throw res.status(500).json({
      msg: ` Error, aplicatión error!`,
    });
  }
};
const deleteOne = async (req, res = response) => {
  try {
    const id = req.params.id;
    if (id === undefined || id === null) {
      throw res.status(400).json({
        message: ` Error, Bad Request`,
      });
    }
    const subscription = await Subscription.deleteOne({
      _id: id,
    });

    if (
      subscription.ok === 1 &&
      subscription.n === 1 &&
      subscription.deletedCount === 1
    ) {
      return res.status(200).json({
        message: `subscriptor correctamente eliminado!`,
      });
    } else {
      throw res.status(404).json({
        message: ` Error, Not Found`,
      });
    }
  } catch (err) {
    console.log(err);
    throw res.status(500).json({
      msg: ` Error, aplicatión error!`,
    });
  }
};

async function generateCode() {
  const code = Math.random()
    .toString(36)
    .substring(2, 8)
    .split("")
    .map((w, i) => (i <= 3 ? w.toUpperCase() : w.toLowerCase()))
    .reverse()
    .join("");
  return code;
}
async function validateRequest(body) {
  const emailValidation =
    body.email !== null && body.email !== undefined && body.email.length !== 0
      ? true
      : false;
  const nameValidation =
    body.name !== null && body.name !== undefined && body.name.length !== 0
      ? true
      : false;
  const genderValidation =
    body.gender !== null &&
    body.gender !== undefined &&
    body.gender.length !== 0
      ? true
      : false;
  const addressValidation =
    body.address !== null &&
    body.address !== undefined &&
    body.address.length !== 0
      ? true
      : false;

  const valid =
    emailValidation && nameValidation && genderValidation && addressValidation
      ? true
      : false;
  return valid;
}
async function serviceTemplate(subscription) {
  const code = await generateCode();
  const template = {
    ...subscription,
    invitation: 1,
    amount: 5000,
    code,
    traces: [],
    created_at: moment(new Date()).format(),
    updated_at: moment(new Date()).format(),
  };
  return template;
}

module.exports = {
  getAll,
  update,
  getOne,
  create,
  deleteOne,
  register,
  subscription,
};
