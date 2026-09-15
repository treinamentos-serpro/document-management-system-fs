export default function DownloadButton({ documentItem, onDownload }) {
  return (
    <button
      type="button"
      onClick={() => onDownload(documentItem)}
      style={{
        padding: '0.5rem 0.8rem',
        border: 'none',
        borderRadius: '8px',
        background: '#16a34a',
        color: '#fff',
        cursor: 'pointer',
      }}
    >
      Baixar
    </button>
  );
}
