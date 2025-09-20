import express, { json } from 'express';
import cors from "cors";
import dotenv from "dotenv";

import bookApi from './routes/book.route.js'
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
)


app.use("/api/books", bookApi)


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
