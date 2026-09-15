import DownloadButton from './DownloadButton';

export default function DocumentList({ documents, onDownload }) {
  if (!documents.length) {
    return (
      <section style={{ padding: '1.5rem', border: '1px solid #d9d9d9', borderRadius: '12px' }}>
        <h2>Documentos</h2>
        <p>Nenhum documento encontrado.</p>
      </section>
    );
  }

  return (
    <section style={{ padding: '1.5rem', border: '1px solid #d9d9d9', borderRadius: '12px' }}>
      <h2>Documentos</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #d9d9d9' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Nome</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Dono</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Tamanho</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Enviado em</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id} style={{ borderBottom: '1px solid #efefef' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}>{document.originalName}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{document.owner}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{formatBytes(document.size)}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{new Date(document.uploadedAt).toLocaleString('pt-BR')}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <DownloadButton document={document} onDownload={onDownload} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}
