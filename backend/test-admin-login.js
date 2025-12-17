const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/devoteesworld';

async function testAdminLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Get the devoteesworld database
    const db = mongoose.connection.db;
    
    // Query the users collection directly
    const admin = await db.collection('users').findOne({ email: 'admin@devoteesworld.com' });
    console.log('\n📍 Admin user found:', admin ? 'YES' : 'NO');
    
    if (!admin) {
      console.log('❌ Admin not in database');
      process.exit(1);
    }

    console.log('\n👤 Admin record:');
    console.log('  Email:', admin.email);
    console.log('  Name:', admin.name);
    console.log('  Role:', admin.role);
    console.log('  Password hash (first 40 chars):', admin.password.substring(0, 40));
    console.log('  Password hash length:', admin.password.length);
    console.log('  Password hash type:', typeof admin.password);

    // Test bcrypt
    const testPassword = 'Admin@123';
    console.log('\n🔐 Testing bcrypt.compare:');
    console.log('  Testing password:', testPassword);
    
    const isValid = await bcrypt.compare(testPassword, admin.password);
    console.log('  Result:', isValid);

    if (!isValid) {
      console.log('\n❌ PASSWORD DOES NOT MATCH!');
      console.log('  This means the hash in the database does NOT correspond to "Admin@123"');
      console.log('\n  Generating new hash for "Admin@123":');
      const newHash = await bcrypt.hash('Admin@123', 10);
      console.log('  New hash:', newHash);
    } else {
      console.log('\n✅ PASSWORD MATCHES!');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testAdminLogin();
