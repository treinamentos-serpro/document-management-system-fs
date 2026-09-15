const documentRepository = require('../repositories/document.repository');
const { createHttpError } = require('../utils/http-error');

// Validação dos dados de entrada do upload, isolada da orquestração da regra de negócio.
function validateUploadInput(file, owner) {
  if (!file) {
    throw createHttpError('Arquivo obrigatório.', 400);
  }

  if (!owner || !String(owner).trim()) {
    throw createHttpError('O campo owner é obrigatório.', 400);
  }
}

// Busca o documento e garante que ele existe, tanto nos metadados quanto no disco.
function getExistingDocument(id) {
  const document = documentRepository.findById(id);

  if (!document) {
    throw createHttpError('Documento não encontrado.', 404);
  }

  if (!documentRepository.fileExists(document)) {
    throw createHttpError('Arquivo não encontrado no armazenamento.', 404);
  }

  return document;
}

function uploadDocument(file, owner) {
  validateUploadInput(file, owner);
  return documentRepository.create(file, owner);
}

function listDocuments(owner) {
  return documentRepository.list(owner);
}

// Reúne a resolução do arquivo em disco para o download, mantendo o controller sem acesso a fs.
function getDownloadTarget(id) {
  const document = getExistingDocument(id);

  return {
    filePath: documentRepository.resolveStoragePath(document),
    originalName: document.originalName,
  };
}

module.exports = {
  uploadDocument,
  listDocuments,
  getDownloadTarget,
};
