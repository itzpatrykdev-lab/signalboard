import { useMemo, useState } from 'react';
import DisplayTable from '../components/screens/DisplayTable';
import { playlists, screens } from '../data/mockSignageData';
import type { ScreenStatus } from '../types/signage';
import '../styles/screens.css';

type StatusFilter = 'all' | ScreenStatus;

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: 'All displays', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Warning', value: 'warning' },
  { label: 'Offline', value: 'offline' },
];

function ScreensPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredScreens = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return screens.filter((screen) => {
      const matchesSearch =
        screen.name.toLowerCase().includes(normalizedQuery) ||
        screen.location.toLowerCase().includes(normalizedQuery);

      const matchesStatus =
        statusFilter === 'all' || screen.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="screens-page">
      <section className="page-heading">
        <div>
          <p className="section-eyebrow">Display management</p>
          <h1>Displays</h1>
          <p className="page-heading__description">
            View screen health, assigned playlists, and recent player check-ins.
          </p>
        </div>

        <button className="primary-button" type="button">
          + Add display
        </button>
      </section>

      <section className="screens-toolbar" aria-label="Display filters">
        <label className="search-field">
          <span className="search-field__label">Search displays</span>
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name or location"
            type="search"
            value={searchQuery}
          />
        </label>

        <div className="status-filters" aria-label="Filter displays by status">
          {statusFilters.map((filter) => (
            <button
              className={`status-filter-button${
                statusFilter === filter.value
                  ? ' status-filter-button--active'
                  : ''
              }`}
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="screens-results">
        <div className="screens-results__header">
          <p>
            Showing <strong>{filteredScreens.length}</strong> of {screens.length} displays
          </p>
        </div>

        <DisplayTable playlists={playlists} screens={filteredScreens} />
      </section>
    </div>
  );
}

export default ScreensPage;