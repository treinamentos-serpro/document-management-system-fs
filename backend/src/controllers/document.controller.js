const fs = require('node:fs');
const path = require('node:path');
const documentService = require('../services/document.service');
const { STORAGE_DIR } = require('../config/storage.config');

function uploadDocument(req, res, next) {
  try {
    const document = documentService.uploadDocument(req.file, req.body.owner);
    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
}

function listDocuments(req, res, next) {
  try {
    const documents = documentService.listDocuments();
    res.status(200).json(documents);
  } catch (error) {
    next(error);
  }
}

function downloadDocument(req, res, next) {
  try {
    const document = documentService.getDocumentById(req.params.id);

    if (!document) {
      res.status(404).json({ message: 'Documento não encontrado.' });
      return;
    }

    const filePath = path.join(STORAGE_DIR, document.storedName);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: 'Arquivo não encontrado no armazenamento.' });
      return;
    }

    res.download(filePath, document.originalName);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadDocument,
  listDocuments,
  downloadDocument,
};
