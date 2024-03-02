import express from 'express';
import routes from './routes/routes';
import cors from 'cors';

// Loading environment variables from .env file
require('dotenv').config();

// Create a new express application instance
const app = express();

// Middleware to parse request bodies as JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Routes (endpoints for the API)
app.use(routes);

// Start the Express server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
