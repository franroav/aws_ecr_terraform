const { Schema, model } = require("mongoose");

const TracesSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: Number,
    required: true,
  },
});

module.exports = model("Traces", TracesSchema);
