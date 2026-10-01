interface MetricCardProps {
  label: string;
  value: number;
  detail: string;
  tone: 'default' | 'success' | 'warning';
}

function MetricCard({ label, value, detail, tone }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <p className="metric-card__label">{label}</p>
      <p className="metric-card__value">{value}</p>
      <p className="metric-card__detail">{detail}</p>
    </article>
  );
}

export default MetricCard;