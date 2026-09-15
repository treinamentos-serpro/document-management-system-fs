import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments, downloadDocument } from './services/documentService';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');

  const loadDocuments = useCallback(async () => {
    try {
      setError('');
      const items = await listDocuments();
      setDocuments(items);
    } catch (loadError) {
      setError(loadError.message || 'Não foi possível carregar os documentos.');
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  async function handleDownload(documentItem) {
    try {
      await downloadDocument(documentItem.id, documentItem.originalName);
    } catch (downloadError) {
      setError(downloadError.message || 'Não foi possível baixar o documento.');
    }
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Document Management System</h1>
      <UploadComponent onUploadSuccess={loadDocuments} />

      {error ? (
        <p style={{ marginBottom: '1rem', color: '#b91c1c' }}>{error}</p>
      ) : null}

      <DocumentList documents={documents} onDownload={handleDownload} />
    </main>
  );
}
