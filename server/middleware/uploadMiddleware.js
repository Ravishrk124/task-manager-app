### server/middleware/uploadMiddleware.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the path for uploads
const uploadDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists, create it if it doesn't
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename to prevent overwriting files with the same name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter to allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Initialize multer with the storage, file filter, and limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter: fileFilter,
});

// Export middleware to handle up to 3 files from a field named 'documents'
module.exports = upload.array('documents', 3);