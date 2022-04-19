import {Router} from 'express';
import {getWords, getWord, createWord, updateWord, deleteWord} from '../controllers/words.controller';
import { body, validationResult } from 'express-validator';

const router = Router();
router.get('/', getWords);
router.get('/:id', getWord);
router.post('/', createWord);
router.put('/:id', updateWord);
router.delete('/:id', deleteWord);
router.all('*/', (req, res) => { res.status(404).json({ status: res.status , name: 'Not Found' }) });


export default router;