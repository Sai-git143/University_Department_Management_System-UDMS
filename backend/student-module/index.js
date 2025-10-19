const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const listEndpoints = require('express-list-endpoints');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Define Routes
app.use('/api/student', require('./routes'));
const endpoints = listEndpoints(app);
console.table(endpoints);

// Routes
app.get('/', (req, res) => {
  res.send('Student Module Backend is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
