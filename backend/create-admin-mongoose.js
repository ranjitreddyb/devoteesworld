const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/devoteesworld');
    console.log('✅ Connected');
    
    // Define schema
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
      name: String,
      role: { type: String, default: 'admin' },
      phone: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    
    const User = mongoose.model('User', userSchema);
    
    // Generate hash
    const hash = await bcrypt.hash('Admin@123', 10);
    console.log('Generated hash:', hash);
    
    // Delete if exists
    await User.deleteOne({ email: 'admin@devoteesworld.com' });
    console.log('Cleaned old record');
    
    // Insert
    const user = new User({
      email: 'admin@devoteesworld.com',
      password: hash,
      name: 'Admin',
      role: 'admin',
      phone: '+91-9999999999'
    });
    
    await user.save();
    console.log('✅ Inserted admin user');
    
    // Verify
    const found = await User.findOne({ email: 'admin@devoteesworld.com' });
    console.log('Password:', found.password);
    console.log('Length:', found.password.length);
    
    const isValid = await bcrypt.compare('Admin@123', found.password);
    console.log('bcrypt match:', isValid);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createAdmin();
