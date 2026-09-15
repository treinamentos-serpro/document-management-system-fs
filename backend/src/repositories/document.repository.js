const crypto = require('node:crypto');

// Metadados mantidos em memória nesta fase inicial do projeto.
const documents = [];

function create(file, owner) {
  const document = {
    id: crypto.randomUUID(),
    originalName: file.originalname,
    storedName: file.filename,
    size: file.size,
    mimeType: file.mimetype,
    owner: String(owner).trim(),
    uploadedAt: new Date().toISOString(),
  };

  documents.push(document);
  return document;
}

function list() {
  return [...documents];
}

function findById(id) {
  return documents.find((document) => document.id === id);
}

module.exports = {
  create,
  list,
  findById,
};
