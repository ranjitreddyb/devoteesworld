const mongoose = require('mongoose');

async function createTestUser() {
  try {
    await mongoose.connect('mongodb://localhost:27017/devoteesworld');
    
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      phone: String,
      role: String,
      isVerified: Boolean,
      createdAt: Date
    });
    
    const User = mongoose.model('User', userSchema);
    
    // Check if user exists
    const existing = await User.findOne({ email: 'ranjit@devotee.com' });
    
    if (existing) {
      console.log('User already exists:', existing);
      console.log('Try logging in with this password (hashed)');
    } else {
      console.log('User not found. Check your User collection name and schema.');
      const allUsers = await User.find();
      console.log('All users in DB:', allUsers);
    }
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err);
  }
}

createTestUser();
