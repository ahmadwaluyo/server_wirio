const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./app/middlewares/error');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).json({ message: "Hello World" });
});

const studentRoutes = require('./app/routes/student_routes');
const userRoutes = require('./app/routes/users_routes');
const authRoutes = require('./app/routes/auth_routes');
const postRoutes = require('./app/routes/posts_routes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/students', studentRoutes);

app.use(errorHandler);

module.exports = app;
