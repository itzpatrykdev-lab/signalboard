import type { ContentItem } from "../../types/signage";
import {
  contentTypeLabels,
  contentTypeSymbols,
} from "../../utils/contentPresentation";

interface ContentCardProps {
  item: ContentItem;
}

function ContentCard({ item }: ContentCardProps) {
  return (
    <article className="content-card">
      <div
        className={`content-card__preview content-card__preview--${item.type}`}
        style={{ backgroundColor: item.accentColor }}
      >
        <span className="content-card__type-symbol" aria-hidden="true">
          {contentTypeSymbols[item.type]}
        </span>

        <span className="content-card__type-label">
          {contentTypeLabels[item.type]}
        </span>
      </div>

      <div className="content-card__body">
        <div className="content-card__header">
          <h2>{item.title}</h2>

          <span
            className={`content-card__status content-card__status--${item.status}`}
          >
            {item.status}
          </span>
        </div>

        <p className="content-card__description">{item.description}</p>

        <div className="content-card__metadata">
          <span>{item.durationSeconds}s duration</span>
          <span>{item.updatedAtLabel}</span>
        </div>
      </div>
    </article>
  );
}

export default ContentCard;
