import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import uploadRouter from './routes/upload.js';
import forgotPassRouter from './routes/forgotPass.js';

const app = express()

// Ensure the uploads directory exists
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}))

app.use(express.json())
app.use('/auth', authRouter) 
app.use('/upload', uploadRouter);
app.use('/auth',forgotPassRouter);

app.get('/', (req, res) => {
    console.log("req.body")
})

app.listen(process.env.PORT, () => {
    console.log("Server is Running")
})