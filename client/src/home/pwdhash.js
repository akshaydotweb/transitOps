const bcrypt = require('bcryptjs');

// Hash the admin password
bcrypt.hash('Akshay1001', 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Admin Password:', hashedPassword);
  // Now insert this hashed password into your MySQL database
});

// Hash the client password
bcrypt.hash('Akshay1001', 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Client Password:', hashedPassword);
  // Now insert this hashed password into your MySQL database
});
