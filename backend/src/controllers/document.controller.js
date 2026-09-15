const documentService = require('../services/document.service');

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
    const documents = documentService.listDocuments(req.query.owner);
    res.status(200).json(documents);
  } catch (error) {
    next(error);
  }
}

function downloadDocument(req, res, next) {
  try {
    const { filePath, originalName } = documentService.getDownloadTarget(req.params.id);
    res.download(filePath, originalName);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadDocument,
  listDocuments,
  downloadDocument,
};
