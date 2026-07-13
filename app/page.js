import Script from "next/script";

export default function Page() {
  return (
    <>
      <main className="app-shell">
        <section className="workspace">
          <header className="app-header">
            <div>
              <p className="kicker">Ocean go / no-go</p>
              <h1>Launch Window</h1>
            </div>
            <div className="weekend-stepper" aria-label="Preview weekend">
              <button className="weekend-nav-button" type="button" data-weekend-nav="-1" aria-label="Previous preview weekend">‹</button>
              <div className="weekend-stepper-current">
                <span>Preview weekend</span>
                <strong data-weekend-choice>Loading...</strong>
              </div>
              <button className="weekend-nav-button" type="button" data-weekend-nav="1" aria-label="Next preview weekend">›</button>
            </div>
          </header>

          <nav className="mode-tabs" aria-label="Mission mode">
            <button className="mode-tab is-active" type="button" data-mode="crabbing">Crabbing</button>
            <button className="mode-tab" type="button" data-mode="spearfishing">Spearfishing</button>
            <button className="mode-tab" type="button" data-mode="clamming">Clamming</button>
          </nav>

          <div id="mode-content" className="mode-content" aria-live="polite"></div>
        </section>

        <aside className="side-panel">
          <section className="lock-preview" aria-label="Lock Screen preview">
            <div className="phone-frame">
              <div className="phone-status">
                <span className="lock-preview-label">Weekend preview</span>
                <span data-lock-weekend>Sat/Sun</span>
              </div>
              <div className="lock-widget" id="lock-widget"></div>
            </div>
          </section>

          <section className="notes-card">
            <h2>POC Behavior</h2>
            <p>
              Live public sources feed a conservative weekend mission plan. Missing or
              unverified safety/legal inputs block a confident GO instead of being filled in.
            </p>
            <ul>
              <li>Crabbing stays fixed to China Beach.</li>
              <li>Spearfishing beaches are ranked and selectable.</li>
              <li>Future weekends are previewable when source forecasts exist.</li>
            </ul>
          </section>
        </aside>
      </main>

      <footer className="disclaimer">
        Proof of concept only. Do not use this prototype for ocean decisions. Production version
        should harden NOAA/NWS marine forecasts, tide/current data, swell models, legal checks,
        and user-defined safety thresholds.
      </footer>

      <Script src="/script.js?v=20" strategy="afterInteractive" />
    </>
  );
}
