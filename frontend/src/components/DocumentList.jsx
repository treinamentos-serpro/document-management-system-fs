import DownloadButton from './DownloadButton';

export default function DocumentList({ documents, onDownload }) {
  if (!documents || documents.length === 0) {
    return <p>Nenhum documento enviado ainda.</p>;
  }

  return (
    <section>
      <h2>Documentos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #d9d9d9', padding: '0.5rem' }}>Nome</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #d9d9d9', padding: '0.5rem' }}>Dono</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #d9d9d9', padding: '0.5rem' }}>Tamanho</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #d9d9d9', padding: '0.5rem' }}>Enviado em</th>
            <th style={{ borderBottom: '1px solid #d9d9d9', padding: '0.5rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((documentItem) => (
            <tr key={documentItem.id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{documentItem.originalName}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{documentItem.owner}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{formatSize(documentItem.size)}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{formatDate(documentItem.uploadedAt)}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>
                <DownloadButton documentItem={documentItem} onDownload={onDownload} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function formatSize(bytes) {
  if (!Number.isFinite(bytes)) {
    return '-';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(1)} ${units[unitIndex]}`;
}

function formatDate(isoDate) {
  if (!isoDate) {
    return '-';
  }

  return new Date(isoDate).toLocaleString('pt-BR');
}
