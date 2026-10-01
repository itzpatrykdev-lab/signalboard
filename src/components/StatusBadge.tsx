import type { ScreenStatus } from '../types/signage';

interface StatusBadgeProps {
  status: ScreenStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" />
      {label}
    </span>
  );
}

export default StatusBadge;