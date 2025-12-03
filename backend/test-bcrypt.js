const bcrypt = require('bcryptjs');

async function test() {
  const password = 'Test@123';
  
  // Test 1: Hash and compare
  const hash1 = await bcrypt.hash(password, 10);
  console.log('Hash 1:', hash1);
  
  const match1 = await bcrypt.compare(password, hash1);
  console.log('Match 1 (should be true):', match1);
  
  // Test 2: Try with genSalt (old way)
  const salt = await bcrypt.genSalt(10);
  const hash2 = await bcrypt.hash(password, salt);
  console.log('\nHash 2 (genSalt):', hash2);
  
  const match2 = await bcrypt.compare(password, hash2);
  console.log('Match 2 (should be true):', match2);
}

test();
