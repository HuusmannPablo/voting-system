import express from 'express';
import { submitVote } from '../controllers/controllers';

const router = express.Router();

// Define routes
router.post('/submit-vote', submitVote);

export default router;
