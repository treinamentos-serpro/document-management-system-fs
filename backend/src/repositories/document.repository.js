const { randomUUID } = require('node:crypto');

const documents = new Map();

function create(file, owner) {
  const document = {
    id: randomUUID(),
    originalName: file.originalname,
    storedName: file.filename,
    size: file.size,
    mimeType: file.mimetype || 'application/octet-stream',
    uploadedAt: new Date().toISOString(),
    owner: String(owner).trim(),
    storagePath: file.path,
  };

  documents.set(document.id, document);
  return document;
}

function list() {
  return Array.from(documents.values()).map((document) => ({
    id: document.id,
    originalName: document.originalName,
    storedName: document.storedName,
    size: document.size,
    mimeType: document.mimeType,
    uploadedAt: document.uploadedAt,
    owner: document.owner,
  }));
}

function findById(id) {
  return documents.get(id) || null;
}

module.exports = {
  create,
  list,
  findById,
};
