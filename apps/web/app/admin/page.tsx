const cards = [
  ["Content queue", "0", "Stories waiting for editorial action"],
  ["Drafts", "0", "AI-assisted drafts awaiting review"],
  ["Scheduled", "0", "Approved stories queued to publish"],
  ["Published", "0", "Live articles"],
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="admin-header">
        <div><span className="eyebrow">ADMIN</span><h1>Editorial dashboard</h1><p>Control content, verification, SEO and automation from one place.</p></div>
        <a className="primary-button" href="/admin/articles/new">New article</a>
      </div>
      <section className="stat-grid">
        {cards.map(([title, value, note]) => <div className="stat-card" key={title}><span>{title}</span><strong>{value}</strong><small>{note}</small></div>)}
      </section>
      <section className="admin-panel">
        <div className="panel-heading"><h2>Editorial workflow</h2><span className="status-pill">AUTO-PUBLISH OFF</span></div>
        <div className="workflow"><span>Discovery</span><b>→</b><span>Research</span><b>→</b><span>Draft</span><b>→</b><span>Fact check</span><b>→</b><span>SEO</span><b>→</b><span>Approval</span><b>→</b><span>Publish</span></div>
      </section>
      <section className="admin-panel"><div className="panel-heading"><h2>Next milestones</h2></div><ul className="check-list"><li>Connect PostgreSQL</li><li>Seed editorial categories</li><li>Connect Google OAuth</li><li>Build article editor</li><li>Enable research and verification jobs</li></ul></section>
    </div>
  );
}
