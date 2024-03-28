import express from 'express';
import {
  getDuties,
  getDutyById,
  createDuty,
  updateDuty,
  deleteDutyById,
} from '../controllers/dutyController';

const router = express.Router();

router.get('/duties', getDuties);
router.get('/duty/:id', getDutyById);
router.post('/duty', createDuty);
router.put('/duty/:id', updateDuty);
router.delete('/duty/:id', deleteDutyById);

export default router;