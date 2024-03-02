import bodyParser from 'body-parser';
import express from 'express';
import mysql, { RowDataPacket } from 'mysql2/promise';

// Loading environment variables from .env file
require('dotenv').config();

// Create a new express application instance
const app = express();

// Middleware to parse request bodies as JSON
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes (endpoints for the API)
app.get('/', (req, res) => {
  res.send('Welcome to the Voting System API!');
});

// Define endpoint to handle form submissions
app.post('/submit-vote', async (req, res) => {
    try {
        // Extract form data from request body
        const { fullName, zipCode, selectedOption } = req.body;
    
        // Database connection settings
        const dbConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        };
    
        // Create MySQL connection pool
        const pool = await mysql.createPool(dbConfig);
    
        // Get a connection from the pool
        const connection = await pool.getConnection();
    
        // Query the database to check if the person exists and their voting status
        // RowDataPacket is used to define the type of the rows returned by the query (to satisfy Typescript type checking)
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM members_enrolled WHERE full_name = ? AND zip_code = ?',
            [fullName, zipCode]
        );
    
        // Handle query results
        if (rows.length === 0) {
            // Person not found in the database
            return res.status(404).json({ message: 'Person not found in the database' });
        }
    
        const { casted_vote } = rows[0];
    
        if (casted_vote) {
            // Person has already cast their vote
            return res.status(403).json({ message: 'You have already cast your vote' });
        }
    
        // Update the database to mark the person as having cast their vote
        await connection.query('UPDATE members_enrolled SET casted_vote = ?, option_voted = ? WHERE full_name = ? AND zip_code = ?',
            [true, selectedOption, fullName, zipCode]);
    
        // Release the connection back to the pool
        connection.release();
    
        // Send success response
        return res.status(200).json({ message: 'Vote submitted successfully' });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
// });

// pool.query('SELECT version() AS version', (error, results: mysql.RowDataPacket[], fields) => {
//     if (error) {
//       console.error('Error connecting to MySQL:', error);
//       return;
//     }
//     console.log('Connected to MySQL. Server version:', results[0].version);
//   });

// Start the Express server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
