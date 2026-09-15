const documentRepository = require('../repositories/document.repository');

function uploadDocument(file, owner) {
  if (!file) {
    const error = new Error('Arquivo obrigatório.');
    error.statusCode = 400;
    throw error;
  }

  if (!owner || !String(owner).trim()) {
    const error = new Error('O campo owner é obrigatório.');
    error.statusCode = 400;
    throw error;
  }

  return documentRepository.create(file, owner);
}

function listDocuments() {
  return documentRepository.list();
}

function getDocumentById(id) {
  return documentRepository.findById(id);
}

module.exports = {
  uploadDocument,
  listDocuments,
  getDocumentById,
};
