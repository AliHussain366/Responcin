const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        loginMessage.textContent = "Both fields are required!";
        loginMessage.style.color = "red";
        return;
    }

    // Mock credentials for validation
    if (username === "student" && password === "1234") {
        loginMessage.textContent = "Login successful! Welcome, " + username + "!";
        loginMessage.style.color = "green";
        loginForm.reset();
    } else {
        loginMessage.textContent = "Invalid username or password!";
        loginMessage.style.color = "red";
    }
});
const toggleSwitch = document.getElementById('toggle-dark-mode');

toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('dark-mode');
    });
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// `User.js` file
const mongoose = require('mongoose');

// Define the schema for User (how user data will look in the database)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Username field
    password: { type: String, required: true },  // Password field
});

// Create a model using the schema
module.exports = mongoose.model('User', userSchema);
const User = require('./models/User');  // Import the User model

// Register a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;  // Extract username and password from the request

    try {
        // Create a new user object
        const newUser = new User({
            username,
            password,
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });  // Success response
    } catch (err) {
        res.status(400).json({ error: 'Error registering user!' });  // Error response
    }
});
// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;  // Extract username and password from the request

  try {
      // Check if the user exists in the database
      const user = await User.findOne({ username, password });

      // If user exists, login is successful
      if (user) {
          res.status(200).json({ message: 'Login successful!' });  // Success response
      } else {
          res.status(400).json({ error: 'Invalid credentials!' });  // Invalid username or password
      }
  } catch (err) {
      res.status(500).json({ error: 'Server error!' });  // If there is an error in the server
  }
});
app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
// Handle registration form submission
document.getElementById("register-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // Display success message
    } else {
      alert(result.error); // Display error message
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});
// Handle login form submission
document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // Display success message
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      alert(result.error); // Display error message
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});
