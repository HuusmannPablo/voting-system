import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Voting System API!');
});

// Connect to Database (Replace with your actual database connection code)

// Start the Express server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
