const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function test() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB (raw driver)');
    
    const db = client.db('devoteesworld');
    const user = await db.collection('users').findOne({ email: 'admin@devoteesworld.com' });
    
    console.log('\n📍 User found:', user ? 'YES' : 'NO');
    console.log('Password (full):', user.password);
    console.log('Password length:', user.password.length);
    
    const isValid = await bcrypt.compare('Admin@123', user.password);
    console.log('\n🔐 bcrypt.compare result:', isValid);
    
    if (isValid) {
      console.log('✅✅✅ LOGIN WORKS! ✅✅✅');
    }
  } finally {
    await client.close();
  }
}

test();
