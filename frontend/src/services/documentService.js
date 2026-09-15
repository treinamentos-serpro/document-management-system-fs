// Lança um erro com a mensagem vinda da API (ou uma mensagem padrão) quando a resposta falha.
async function ensureOk(response, fallbackMessage) {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || fallbackMessage);
  }
}

export async function uploadDocument(file, owner) {
  if (!file) {
    throw new Error('Selecione um arquivo antes de enviar.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('owner', owner || 'anonymous');

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  await ensureOk(response, 'Erro ao enviar o documento.');
  return response.json();
}

export async function listDocuments() {
  const response = await fetch('/api/documents');

  await ensureOk(response, 'Erro ao listar os documentos.');
  return response.json();
}

export async function downloadDocument(documentId, fileName) {
  const response = await fetch(`/api/documents/${documentId}/download`);

  await ensureOk(response, 'Erro ao baixar o documento.');

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = objectUrl;
  anchor.download = fileName || 'document';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(objectUrl);
}
