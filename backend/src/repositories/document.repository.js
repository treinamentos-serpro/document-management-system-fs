const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { STORAGE_DIR } = require('../config/storage.config');

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
  return { ...document };
}

function list(owner) {
  const filtered = owner ? documents.filter((document) => document.owner === owner) : documents;
  return filtered.map((document) => ({ ...document }));
}

function findById(id) {
  const document = documents.find((document) => document.id === id);
  return document ? { ...document } : undefined;
}

// Caminho absoluto do arquivo no armazenamento local; só o repository conhece o STORAGE_DIR.
function resolveStoragePath(document) {
  return path.join(STORAGE_DIR, document.storedName);
}

function fileExists(document) {
  return fs.existsSync(resolveStoragePath(document));
}

module.exports = {
  create,
  list,
  findById,
  resolveStoragePath,
  fileExists,
};
