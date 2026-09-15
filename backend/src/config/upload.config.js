const multer = require('multer');
const crypto = require('node:crypto');
const path = require('node:path');
const { STORAGE_DIR } = require('./storage.config');

// Extensões aceitas para upload (mitiga unrestricted file upload).
const ALLOWED_EXTENSIONS = new Set([
  '.pdf', '.doc', '.docx', '.odt', '.txt', '.csv',
  '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg', '.gif', '.zip',
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, STORAGE_DIR);
  },
  filename: (_req, file, callback) => {
    // O nome em disco nunca depende do nome enviado pelo usuário (evita path traversal).
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

function fileFilter(_req, file, callback) {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    const error = new Error('Tipo de arquivo não permitido.');
    error.statusCode = 400;
    callback(error);
    return;
  }

  callback(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

module.exports = upload;
