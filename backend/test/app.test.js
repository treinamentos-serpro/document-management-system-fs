const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../src/app');

async function withServer(testFn) {
  const server = app.listen(0);

  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const { port } = server.address();
    await testFn(port);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

test('o app backend é exportado', () => {
  assert.ok(app, 'o app deve estar definido');
  assert.strictEqual(typeof app, 'function', 'o app Express deve ser uma função');
});

test('deve fazer upload, listar e baixar um documento', async () => {
  await withServer(async (port) => {
    const filePath = path.join(__dirname, 'fixtures', 'sample.txt');
    const fileContent = 'conteúdo do documento';

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, fileContent);

    const formData = new FormData();
    formData.append('file', new Blob([fileContent], { type: 'text/plain' }), 'sample.txt');
    formData.append('owner', 'user-001');

    const uploadResponse = await fetch(`http://127.0.0.1:${port}/upload`, {
      method: 'POST',
      body: formData,
    });

    assert.strictEqual(uploadResponse.status, 201, 'upload deve criar o documento');
    const uploaded = await uploadResponse.json();
    assert.strictEqual(uploaded.originalName, 'sample.txt');
    assert.strictEqual(uploaded.owner, 'user-001');
    assert.ok(uploaded.id, 'deve haver um id');

    const listResponse = await fetch(`http://127.0.0.1:${port}/documents`);
    assert.strictEqual(listResponse.status, 200, 'listagem deve retornar 200');
    const documents = await listResponse.json();
    assert.ok(Array.isArray(documents), 'listagem deve retornar um array');
    assert.ok(documents.some((document) => document.id === uploaded.id), 'documento deve constar na listagem');

    const downloadResponse = await fetch(`http://127.0.0.1:${port}/documents/${uploaded.id}/download`);
    assert.strictEqual(downloadResponse.status, 200, 'download deve retornar 200');
    const downloaded = await downloadResponse.text();
    assert.strictEqual(downloaded, fileContent, 'conteúdo baixado deve ser igual ao enviado');
  });
});

test('deve retornar 404 ao tentar baixar um documento inexistente', async () => {
  await withServer(async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/documents/nao-existe/download`);
    assert.strictEqual(response.status, 404, 'download de documento inexistente deve falhar');
  });
});

test('deve rejeitar upload de tipo de arquivo não permitido', async () => {
  await withServer(async (port) => {
    const formData = new FormData();
    formData.append('file', new Blob(['echo oi'], { type: 'application/x-sh' }), 'script.sh');
    formData.append('owner', 'user-001');

    const uploadResponse = await fetch(`http://127.0.0.1:${port}/upload`, {
      method: 'POST',
      body: formData,
    });

    assert.strictEqual(uploadResponse.status, 400, 'tipo de arquivo não permitido deve ser rejeitado');
  });
});

test('deve rejeitar upload sem arquivo', async () => {
  await withServer(async (port) => {
    const formData = new FormData();
    formData.append('owner', 'user-001');

    const uploadResponse = await fetch(`http://127.0.0.1:${port}/upload`, {
      method: 'POST',
      body: formData,
    });

    assert.strictEqual(uploadResponse.status, 400, 'upload sem arquivo deve ser rejeitado');
  });
});

test('deve rejeitar upload sem owner', async () => {
  await withServer(async (port) => {
    const formData = new FormData();
    formData.append('file', new Blob(['conteúdo'], { type: 'text/plain' }), 'sem-owner.txt');

    const uploadResponse = await fetch(`http://127.0.0.1:${port}/upload`, {
      method: 'POST',
      body: formData,
    });

    assert.strictEqual(uploadResponse.status, 400, 'upload sem owner deve ser rejeitado');
  });
});

test('deve retornar lista vazia quando não há documentos para o owner informado', async () => {
  await withServer(async (port) => {
    const listResponse = await fetch(`http://127.0.0.1:${port}/documents?owner=owner-inexistente`);
    assert.strictEqual(listResponse.status, 200, 'listagem deve retornar 200');
    const documents = await listResponse.json();
    assert.deepStrictEqual(documents, [], 'listagem deve retornar array vazio para owner sem documentos');
  });
});

test('deve filtrar a listagem por owner quando informado', async () => {
  await withServer(async (port) => {
    const formData = new FormData();
    formData.append('file', new Blob(['conteúdo'], { type: 'text/plain' }), 'outro.txt');
    formData.append('owner', 'user-002');

    const uploadResponse = await fetch(`http://127.0.0.1:${port}/upload`, {
      method: 'POST',
      body: formData,
    });
    const uploaded = await uploadResponse.json();

    const listResponse = await fetch(`http://127.0.0.1:${port}/documents?owner=user-002`);
    const documents = await listResponse.json();

    assert.ok(documents.every((document) => document.owner === 'user-002'), 'listagem filtrada só deve conter o owner informado');
    assert.ok(documents.some((document) => document.id === uploaded.id), 'documento enviado deve constar na listagem filtrada');
  });
});
