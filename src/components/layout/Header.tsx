function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">SIGNALBOARD COMMAND CENTER</p>
        <p className="app-header__status">
          <span className="app-header__status-dot" />
          System health: Nominal
        </p>
      </div>

      <button className="app-header__profile" type="button">
        AP
      </button>
    </header>
  );
}

export default Header;