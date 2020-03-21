const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


userSchema.plugin(encrypt, {secret: process.env.DB_SECRET, encryptedFields: ["password"]});

const User = mongoose.model("User", userSchema);

module.exports = User;