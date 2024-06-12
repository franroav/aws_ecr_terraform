const { Schema, model } = require("mongoose");
const TracesSchema = require("./traces");

const SubscriptionSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  invitation: {
    type: Number,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
  },
  traces: { type: Array, default: [TracesSchema] },
  created_at: {
    type: String,
    required: false,
  },
  updated_at: {
    type: String,
    required: false,
  },
});

module.exports = model("Subscription", SubscriptionSchema);
