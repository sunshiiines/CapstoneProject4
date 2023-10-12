app.listen(PORT, function () {
    console.log('App starting on port', PORT);
  });
   Alpine.data('doctorsList', () => ({
          doctors: [
              { name: 'Dr One', address: '453 Doctor\'s street, Dr Town, Durban', phone: '031 245 7658' },
              { name: 'Dr Two', address: '453 Doctor Ave, Dr City, Johannesburg', phone: '011 245 7658' },
              { name: 'Dr Three', address: '453 DR lane, Doctorsburg, Cape Town', phone: '021 245 7658' },
      
          ],
          appointmentModal: false,
          selectedDoctor: null,
      }));
  
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const fs = require('fs');

// const app = express();
// const port = 8080;
// const secret = 'some-secret-key';

// app.use(express.json());

// app.post('/users/login', (req, res) => {
//   const { email, password } = req.body;
//   // validate input
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Missing email or password' });
//   }
//   // read user data from json file
//   fs.readFile('users.json', (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Server error' });
//     }
//     const users = JSON.parse(data);
//     // find user by email
//     const user = users.find(u => u.email === email);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // compare password with hashed password
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: 'Server error' });
//       }
//       if (!result) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }
//       // generate token with user id and email
//       const token = jwt.sign({ id: user.id, email: user.email }, secret);
//       // send token as response
//       res.json({ token });
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// //  Alpine.data('doctorsList', () => ({
// //         doctors: [
// //             { name: 'Dr One', address: '453 Doctor\'s street, Dr Town, Durban', phone: '031 245 7658' },
// //             { name: 'Dr Two', address: '453 Doctor Ave, Dr City, Johannesburg', phone: '011 245 7658' },
// //             { name: 'Dr Three', address: '453 DR lane, Doctorsburg, Cape Town', phone: '021 245 7658' },
    
// //         ],
// //         appointmentModal: false,
// //         selectedDoctor: null,
// //     }));
