const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  title: { type: String, required: true },
  nation: { type: String, required: true },
  date: { type: Date, required: true },
  team: { type: Object, required: true },
});

module.exports = mongoose.model("Sport", sportSchema);
