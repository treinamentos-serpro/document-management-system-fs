const path = require('node:path');

// Diretório único de armazenamento local de arquivos (restrição do projeto).
const STORAGE_DIR = path.resolve(__dirname, '../../storage');

module.exports = { STORAGE_DIR };
