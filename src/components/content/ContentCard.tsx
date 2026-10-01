import type { ContentItem } from "../../types/signage";
import {
  contentTypeLabels,
  contentTypeSymbols,
} from "../../utils/contentPresentation";
import { useSignalBoard } from "../../context/SignalBoardContext";

interface ContentCardProps {
  item: ContentItem;
}

function ContentCard({ item }: ContentCardProps) {
  const { setContentStatus } = useSignalBoard();

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
        <button
          className="content-card__status-button"
          onClick={() =>
            setContentStatus(
              item.id,
              item.status === "published" ? "draft" : "published",
            )
          }
          type="button"
        >
          Mark as {item.status === "published" ? "draft" : "published"}
        </button>
      </div>
    </article>
  );
}

export default ContentCard;
