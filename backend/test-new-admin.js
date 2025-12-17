const mongoose = require('mongoose');

async function test() {
  try {
    await mongoose.connect('mongodb://localhost:27017/devoteesworld');
    console.log('✅ Connected');
    
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: 'admin@devoteesworld.com' });
    
    console.log('\n📍 User found:', user ? 'YES' : 'NO');
    console.log('ObjectId:', user._id);
    console.log('Password:', user.password);
    console.log('Password length:', user.password.length);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
