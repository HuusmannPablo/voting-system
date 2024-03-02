import express from 'express';
import { submitVote } from '../controllers/controllers';

const router = express.Router();

// Define routes
router.post('/api/submit-vote', submitVote);

export default router;
