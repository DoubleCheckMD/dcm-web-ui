import express from 'express';
import multer from 'multer';
import path from 'path';
import { connectToDatabase } from '../lib/db.js';
import { fileURLToPath } from 'url';
import verifyToken  from '../middleware/auth.js';

const router = express.Router();

// Configure Multer to store files in the 'uploads' directory
const upload = multer({ dest: '../uploads/' });

// Serve static files from the 'uploads' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route to handle file upload
router.post('/', verifyToken, upload.array('photos', 10), async (req, res) => {
  console.log('File upload request received');
  console.log('User ID:', req.userId); // Debug log to check userId
 
  if (req.files && req.files.length > 0) {
    if (!req.userId) {
      console.error('User ID is undefined');
      return res.status(400).json({ message: 'User ID is required' });
    }
    try {
      const connection = await connectToDatabase();
      const [userRows] = await connection.execute('SELECT id FROM users WHERE id = ?', [req.userId]);
      if (userRows.length === 0) {
        console.error('User ID does not exist');
        return res.status(400).json({ message: 'User ID does not exist' });
      }

      const query = 'INSERT INTO uploads (filename, filepath, uploadDate, userId) VALUES (?, ?, ?, ?)';
      for (const file of req.files) {
        const fileInfo = {
          filename: file.originalname,
          filepath: file.path,
          uploadDate: new Date(),
          userId: req.userId
        };

        await connection.execute(query, [fileInfo.filename, fileInfo.filepath, fileInfo.uploadDate, fileInfo.userId]);
      

      console.log('Files uploaded successfully:', fileInfo);
      }
      return res.status(200).json({ message: 'Photos are uploaded' });

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