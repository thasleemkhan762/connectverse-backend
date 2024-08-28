const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Pre-save middleware to hash the user's password before saving it to the database
UserSchema.pre('save', async function(next) {
    // If the password field has not been modified, skip hashing
  if (!this.isModified('password')) {
    next();
  }
  // Generate a salt with 10 rounds and hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare a given password with the hashed password stored in the database
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
