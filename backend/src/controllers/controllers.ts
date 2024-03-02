import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';
import { pool } from '../db/db';

// Load environment variables from .env file
dotenv.config();

export const submitVote = async (req: Request, res: Response) => {
  try {
    // Extract form data from request body
    const { fullName, zipCode, selectedOption } = req.body;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Query the database to check if the person exists and their voting status
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
};
