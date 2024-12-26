const dotenv = require('dotenv');
const app = require('./app'); // Your app.js file
const connectDatabase = require('./config/database');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDatabase();

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
