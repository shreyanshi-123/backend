const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Define the schema for the user
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'], // The name field is required
    },
    email: {
      type: String,
      required: [true, 'Please add an email'], // The email field is required
      unique: true, // Email should be unique
      lowercase: true, // Email will be saved in lowercase
    },
    password: {
      type: String,
      required: [true, 'Please add a password'], // The password field is required
      minlength: 6, // Password must be at least 6 characters
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Skip password hashing if the password hasn't been modified
  }

  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed with saving the user
  } catch (error) {
    next(error); // If there's an error during hashing, pass it to the next middleware
  }
});

// Method to check if the entered password matches the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model using the schema
module.exports = mongoose.model('User', userSchema);
