const express = require('express');
const upload = require('../config/upload.config');
const {
  uploadDocument,
  listDocuments,
  downloadDocument,
} = require('../controllers/document.controller');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/documents', listDocuments);
router.get('/documents/:id/download', downloadDocument);

module.exports = router;
