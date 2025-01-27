import express from 'express';
import multer from 'multer';
import path from 'path';
import { connectToDatabase } from '../lib/db.js';
import { fileURLToPath } from 'url';

const router = express.Router();

// Configure Multer to store files in the 'uploads' directory
const upload = multer({ dest: '../uploads/' });

// Serve static files from the 'uploads' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route to handle file upload
router.post('/', upload.single('photo'), async (req, res) => {
  console.log('File upload request received');
  
  if (req.file) {
    const fileInfo = {
      filename: req.file.originalname,
      filepath: req.file.path,
      uploadDate: new Date(),
    };

    try {
      const connection = await connectToDatabase();
      const query = 'INSERT INTO uploads (filename, filepath, uploadDate) VALUES (?, ?, ?)';
      const [result] = await connection.execute(query, [fileInfo.filename, fileInfo.filepath, fileInfo.uploadDate]);
      console.log('File uploaded successfully:', fileInfo);
      return res.status(200).json({ message: 'Photo is uploaded', fileInfo });
    
    } catch (err) {
      console.error('Database connection error:', err.message);
      res.status(500).json({ message: 'Database connection error', error: err.message });
    }
  } else {
    console.error('File upload failed');
    res.status(500).json({ message: 'File upload failed' });
  }
});

export default router;