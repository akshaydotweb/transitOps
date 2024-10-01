# Welcome to TransitOps Backend Server
# This is a platform where the admin can login, modify, monitor and report the Database

## This is the file Structure 
backend/
├── config/
│   ├── db.js
│   └── redisClient.js
├── controllers/
│   ├── userController.js
│   ├── trainController.js
│   ├── bookingController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   └── ...other middleware
├── models/
│   ├── userModel.js
│   ├── trainModel.js
│   ├── bookingModel.js
│   └── ...other models
├── routes/
│   ├── users.js
│   ├── trains.js
│   ├── bookings.js
│   └── admin.js
├── utils/
│   └── ...utility functions
├── app.js
├── package.json
└── .env
