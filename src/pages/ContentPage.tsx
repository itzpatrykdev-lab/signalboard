import { useMemo, useState } from "react";
import ContentCard from "../components/content/ContentCard";
import { useSignalBoard } from "../context/SignalBoardContext";
import type { ContentType } from "../types/signage";
import "../styles/content.css";

type ContentFilter = "all" | ContentType;

const contentFilters: { label: string; value: ContentFilter }[] = [
  { label: "All content", value: "all" },
  { label: "Announcements", value: "announcement" },
  { label: "Images", value: "image" },
  { label: "Weather", value: "weather" },
  { label: "Calendar", value: "calendar" },
];

function ContentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ContentFilter>("all");

  const { contentItems } = useSignalBoard();

  const filteredContent = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return contentItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);

      const matchesType = typeFilter === "all" || item.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter, contentItems]);

  return (
    <div className="content-page">
      <section className="page-heading">
        <div>
          <p className="section-eyebrow">Content library</p>
          <h1>Content</h1>
          <p className="page-heading__description">
            Manage reusable content items for playlists and display campaigns.
          </p>
        </div>

        <button className="primary-button" type="button">
          + Add content
        </button>
      </section>

      <section className="content-toolbar" aria-label="Content filters">
        <label className="search-field">
          <span className="search-field__label">Search content</span>
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title or description"
            type="search"
            value={searchQuery}
          />
        </label>

        <div className="content-filters" aria-label="Filter content by type">
          {contentFilters.map((filter) => (
            <button
              className={`content-filter-button${
                typeFilter === filter.value
                  ? " content-filter-button--active"
                  : ""
              }`}
              key={filter.value}
              onClick={() => setTypeFilter(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Content items">
        {filteredContent.length > 0 ? (
          <div className="content-grid">
            {filteredContent.map((item) => (
              <ContentCard item={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state content-empty-state">
            <h2>No content found</h2>
            <p>Try a different search term or select another content type.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ContentPage;
