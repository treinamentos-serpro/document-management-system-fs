const fs = require('node:fs');
const path = require('node:path');

// Diretório único de armazenamento local de arquivos (restrição do projeto).
const STORAGE_DIR = path.resolve(__dirname, '../../storage');

// Garante que o diretório exista mesmo em ambientes recém-clonados/implantados.
fs.mkdirSync(STORAGE_DIR, { recursive: true });

module.exports = { STORAGE_DIR };
