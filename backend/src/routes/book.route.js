import express from 'express';
import { getBooks, getSpecificBook } from '../controller/book.controller.js';

const router = express.Router();

//get all books
router.get('/', getBooks);

//get books with id
router.get('/:id', getSpecificBook);

export default router;