const multer = require('multer');
const path = require('node:path');
const { STORAGE_DIR } = require('./storage.config');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, STORAGE_DIR);
  },
  filename: (_req, file, callback) => {
    const safeOriginalName = file.originalname
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');

    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const baseName = safeOriginalName || 'document';
    const name = `${timestamp}-${baseName}`;

    callback(null, `${name}${extension && !baseName.endsWith(extension) ? extension : ''}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

module.exports = upload;
