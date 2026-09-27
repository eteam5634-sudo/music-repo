import { Music4 } from 'lucide-react';

export default function EmptyState({ title, message }) {
  return (
    <div className="empty-state" aria-live="polite">
      <Music4 size={36} style={{ margin: '0 auto 12px', color: 'var(--text-muted)' }} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
