const fs = require('node:fs');
const documentService = require('../services/document.service');

function uploadDocument(req, res) {
  try {
    const document = documentService.uploadDocument(req.file, req.body.owner);
    return res.status(201).json(document);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      message: error.message || 'Erro ao processar o upload.',
    });
  }
}

function listDocuments(_req, res) {
  try {
    const documents = documentService.listDocuments();
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Erro ao listar os documentos.',
    });
  }
}

function downloadDocument(req, res) {
  try {
    const { id } = req.params;
    const document = documentService.getDocumentById(id);

    if (!document) {
      return res.status(404).json({ message: 'Documento não encontrado.' });
    }

    if (!fs.existsSync(document.storagePath)) {
      return res.status(404).json({ message: 'Arquivo não encontrado no armazenamento.' });
    }

    return res.download(document.storagePath, document.originalName);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Erro ao baixar o documento.',
    });
  }
}

module.exports = {
  uploadDocument,
  listDocuments,
  downloadDocument,
};
