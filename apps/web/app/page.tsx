const stories = [
  ['AI', 'The AI landscape is changing faster than ever. Here is what matters today.', 'A demo editorial story used to validate the publishing layout.'],
  ['Technology', 'The technology trends shaping the next generation of digital products', 'Context, practical impact and what to watch next.'],
  ['India', 'India today: the developments readers should understand', 'A demo story for the India section.'],
  ['World', 'The global story explained without the noise', 'A demo story for international affairs.'],
]

const categories = ['AI', 'Technology', 'India', 'World', 'Business', 'Science', 'Explainers', 'How-To']

function StoryCard({ story }: { story: string[] }) {
  return <article className="card"><div className="thumb" /><div className="card-body"><span className="kicker">{story[0]}</span><h3>{story[1]}</h3><p>{story[2]}</p></div></article>
}

function List({ items }: { items: string[] }) {
  return <div className="list">{items.map((item, i) => <article className="list-item" key={item}><span className="kicker">{String(i + 1).padStart(2, '0')}</span><h3>{item}</h3></article>)}</div>
}

export default function Home() {
  return <>
    <header className="site-header"><div className="container"><div className="header-main"><a className="brand" href="/">AI & WORLD <span>DAILY</span></a><a className="button" href="#newsletter">Subscribe</a></div><nav className="nav" aria-label="Primary navigation">{categories.map(c => <a key={c} href={`/${c.toLowerCase().replace(' ', '-')}`}>{c}</a>)}</nav></div></header>
    <main className="container">
      <section className="hero"><div className="hero-grid"><article className="hero-card"><span className="kicker">Top Story · Demo</span><h1>What matters in AI, India and the world today</h1><p>AI & World Daily brings together verified developments, useful context and original analysis in one clear daily briefing.</p><span className="button" style={{alignSelf:'flex-start'}}>Read the story →</span></article><aside className="side-card"><span className="kicker">The Daily Brief</span><h2>News with context, not noise.</h2><p>We are building a source-backed publication covering artificial intelligence, technology, India, international affairs and business.</p><p><strong>Editorial principle:</strong> facts first, sources visible, analysis clearly separated from reporting.</p></aside></div></section>
      <section className="section"><div className="section-head"><h2>🤖 Latest AI</h2><a href="/ai">View all →</a></div><div className="cards">{stories.map(s => <StoryCard key={s[1]} story={s} />)}</div></section>
      <section className="section"><div className="columns"><div><div className="section-head"><h2>🇮🇳 India</h2><a href="/india">View all →</a></div><List items={['India developments readers need to know today','Economic signals to watch this week','Technology and innovation across India','Current affairs explained simply']} /></div><div><div className="section-head"><h2>🌎 World</h2><a href="/world">View all →</a></div><List items={['The global story explained','International affairs and their impact','What changed in the world today','Five developments worth watching']} /></div></div></section>
      <section className="section"><div className="columns"><div><div className="section-head"><h2>💼 Business</h2></div><List items={['Markets, companies and startups','Business trends behind the headlines','AI and the future of work']} /></div><div><div className="section-head"><h2>🔥 Trending</h2></div><List items={['Most important story today','The AI topic everyone is discussing','India story gaining attention']} /></div></div></section>
      <section className="newsletter" id="newsletter"><h2>Get the Daily AI & World Brief</h2><p>One useful email every morning. No copied articles. No unnecessary noise.</p><form className="email"><input type="email" aria-label="Email address" placeholder="Your email address" /><button className="button" type="submit">Subscribe</button></form></section>
    </main>
    <footer className="footer"><div className="container"><strong>AI & WORLD DAILY</strong><div className="footer-links"><a href="/about">About</a><a href="/editorial-policy">Editorial Policy</a><a href="/corrections">Corrections</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/contact">Contact</a></div><p>© {new Date().getFullYear()} AI & World Daily. Demo foundation — automated publishing is not enabled.</p></div></footer>
  </>
}
