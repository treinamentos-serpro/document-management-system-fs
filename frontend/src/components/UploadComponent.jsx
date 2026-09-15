import { useState } from 'react';
import { uploadDocument } from '../services/documentService';

export default function UploadComponent({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [owner, setOwner] = useState('user-001');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setError('Selecione um arquivo para enviar.');
      return;
    }

    try {
      setError('');
      setIsSubmitting(true);
      await uploadDocument(file, owner);
      setFile(null);
      event.target.reset();
      onUploadSuccess?.();
    } catch (submitError) {
      setError(submitError.message || 'Não foi possível enviar o arquivo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #d9d9d9', borderRadius: '12px' }}>
      <h2>Upload de documento</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '1rem', maxWidth: '480px' }}>
          <label>
            <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Arquivo</span>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
          </label>

          <label>
            <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Dono</span>
            <input
              type="text"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              placeholder="Informe o dono do documento"
              style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #cfcfcf' }}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: 'fit-content',
              padding: '0.7rem 1.2rem',
              border: 'none',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#fff',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar documento'}
          </button>
        </div>
      </form>

      {error ? <p style={{ color: '#b91c1c', marginTop: '1rem' }}>{error}</p> : null}
    </section>
  );
}
