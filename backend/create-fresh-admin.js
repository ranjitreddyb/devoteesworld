const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

async function createAdmin() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('devoteesworld');
    
    // Create fresh hash
    const hash = await bcrypt.hash('Admin@123', 10);
    console.log('Generated hash:', hash);
    console.log('Hash length:', hash.length);
    
    // Insert directly
    const result = await db.collection('users').insertOne({
      email: 'admin@devoteesworld.com',
      password: hash,
      name: 'Admin',
      role: 'admin',
      phone: '+91-9999999999',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('✅ Inserted with ID:', result.insertedId);
    
    // Verify immediately
    const user = await db.collection('users').findOne({ email: 'admin@devoteesworld.com' });
    console.log('\n✅ Retrieved from DB:');
    console.log('Password:', user.password);
    console.log('Length:', user.password.length);
    
    // Test bcrypt
    const isValid = await bcrypt.compare('Admin@123', user.password);
    console.log('bcrypt match:', isValid);
    
  } finally {
    await client.close();
  }
}

createAdmin();
