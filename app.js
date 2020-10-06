const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRoutes = require('./app/routes/users_routes');
const authRoutes = require('./app/routes/auth_routes');
const postRoutes = require('./app/routes/posts_routes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);

module.exports = app;
