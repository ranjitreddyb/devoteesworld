const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function testAdminLogin() {
  let connection = null;
  try {
    // Force new connection with explicit options
    const mongoUri = 'mongodb://localhost:27017/devoteesworld';
    console.log('📡 Connecting to:', mongoUri);
    
    connection = await mongoose.createConnection(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }).asPromise();
    
    console.log('✅ Connected to MongoDB');

    // Get the database
    const db = connection.getClient().db('devoteesworld');
    
    // Query the users collection
    console.log('\n🔍 Querying users collection...');
    const allUsers = await db.collection('users').find({}).toArray();
    console.log('Total users:', allUsers.length);
    
    // Find admin user
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
    console.log('  Password (full):', admin.password);
    console.log('  Password length:', admin.password.length);
    console.log('  Password type:', typeof admin.password);

    // Test bcrypt
    const testPassword = 'Admin@123';
    console.log('\n🔐 Testing bcrypt.compare:');
    console.log('  Password to test:', testPassword);
    
    const isValid = await bcrypt.compare(testPassword, admin.password);
    console.log('  Result:', isValid);

    if (!isValid) {
      console.log('\n❌ PASSWORD DOES NOT MATCH!');
      console.log('  Generating new hash for "Admin@123":');
      const newHash = await bcrypt.hash('Admin@123', 10);
      console.log('  New hash:', newHash);
      console.log('\n  Update MongoDB with:');
      console.log(`  db.users.updateOne({ email: "admin@devoteesworld.com" }, { $set: { password: "${newHash}" } })`);
    } else {
      console.log('\n✅ PASSWORD MATCHES! ✅');
    }

    await connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testAdminLogin();
