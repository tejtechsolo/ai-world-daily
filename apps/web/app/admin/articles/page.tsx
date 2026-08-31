const states = ["DRAFT", "FACT_CHECK", "SEO_REVIEW", "APPROVED", "SCHEDULED", "PUBLISHED"];

export default function ArticlesPage() {
  return <div><div className="admin-header"><div><span className="eyebrow">CONTENT</span><h1>Articles</h1><p>Review and manage the publication pipeline.</p></div><a className="primary-button" href="/admin/articles/new">Create article</a></div><div className="filter-row">{states.map(s => <span className="filter-chip" key={s}>{s}</span>)}</div><div className="empty-state"><h2>No articles yet</h2><p>Create the first article, then the research and verification pipeline can be connected.</p><a href="/admin/articles/new">Create your first article →</a></div></div>;
}
