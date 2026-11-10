import { FormEvent, useState } from "react";

const assets = "/assets";

const services = [
  {
    number: "01",
    title: "Humans in the loop",
    body: "Experts review, correct and teach the model. Every decision leaves a trail you can read.",
    icon: `${assets}/eb5b4.svg`,
    color: "#8fbfe7",
  },
  {
    number: "02",
    title: "Grounded models",
    body: "Built on your data and your domain, not the whole internet. Fewer hallucinations, more answers.",
    icon: `${assets}/9c41d.svg`,
    color: "#ff7277",
  },
  {
    number: "03",
    title: "Runs where you work",
    body: "In your tools, on your servers, at the edge. Sure-footed on any terrain, like a goat.",
    icon: `${assets}/398b9.svg`,
    color: "#f7b269",
  },
];

const posts = [
  {
    image: `${assets}/ce52f.png`,
    tag: "Research",
    meta: "Oct 2026 · 8 min read",
    title: "Why the best models still need a shepherd",
  },
  {
    image: `${assets}/7c554.png`,
    tag: "Product",
    meta: "Sep 2026 · 4 min read",
    title: "Mycelium: how our agents share what they learn",
  },
  {
    tag: "Culture",
    meta: "Aug 2026 · 5 min read",
    title: "Small team, steep slopes: how we build GoatAI",
  },
];

function GoatMark() {
  return (
    <span className="goat-mark" aria-hidden="true">
      <img className="mark-a" src={`${assets}/36f75.svg`} alt="" />
      <img className="mark-b" src={`${assets}/21617.svg`} alt="" />
      <img className="mark-c" src={`${assets}/05904.svg`} alt="" />
      <img className="mark-d" src={`${assets}/6fef3.svg`} alt="" />
    </span>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="GoatAI home">
      <GoatMark />
      <span>GoatAI</span>
    </a>
  );
}

export default function App() {
  const [question, setQuestion] = useState("");
  const [sentQuestion, setSentQuestion] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function submitQuestion(event: FormEvent) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    setSentQuestion(trimmed);
    setQuestion("");
  }

  return (
    <main id="top">
      <nav className="nav shell" aria-label="Main navigation">
        <Brand />
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </a>
          <a href="#research" onClick={() => setMenuOpen(false)}>
            Research
          </a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>
            Blog
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </div>
        <a className="button button-dark nav-cta" href="#ask">
          Talk to us
        </a>
      </nav>

      <section className="hero shell">
        <h1>
          <span>Artificial Intelligence</span>
          <em>powered by humans.</em>
        </h1>
        <p>Based in Modena, we build AI solutions tailored for our clients needs.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#ask">
            Start building with us
          </a>
          <a className="button button-light" href="#services">
            How it works
          </a>
        </div>
      </section>

      <section className="hero-visual shell" aria-label="GoatAI capabilities">
        <img src={`${assets}/98941.svg`} alt="" />
        <span className="capability capability-one">Anomaly Detection</span>
        <span className="capability capability-two">Tailored Models</span>
        <span className="capability capability-three">AI consulting</span>
        <span className="capability capability-four">LLM Inference</span>
        <span className="capability capability-five">Computer Vision</span>
      </section>

      <section className="companies shell" aria-label="Clients">
        <p>Trusted by teams who still believe in people</p>
        <div className="logos">
          <strong>Northfield</strong>
          <strong>alpenlab</strong>
          <em>Corteccia</em>
          <strong>MOSSWORK</strong>
          <strong>Halden</strong>
          <strong>kiln.</strong>
        </div>
      </section>

      <section className="section shell" id="services">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">WHAT WE DO</p>
            <h2>
              Machine precision.
              <br />
              Human know-how.
            </h2>
          </div>
          <p className="section-copy">
            Every model is shaped by the experts who use it.
            <br />
            No black boxes, no noise — just tools that earn trust.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article
              className="service-card"
              key={service.title}
              style={{ "--accent": service.color } as React.CSSProperties}
            >
              <div className="card-topline">
                <span className="icon-badge">
                  <img src={service.icon} alt="" />
                </span>
                <span className="card-number">{service.number}</span>
              </div>
              <div className="card-text">
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
              <span className="card-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" id="journal">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">FIELD NOTES</p>
            <h2>From the pasture.</h2>
          </div>
          <a className="all-posts" href="#journal">
            All posts <img src={`${assets}/ab594.svg`} alt="" />
          </a>
        </div>
        <div className="post-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.title}>
              {post.image ? (
                <div className="post-image">
                  <img src={post.image} alt="" />
                </div>
              ) : (
                <div className="post-image post-placeholder" aria-hidden="true">
                  <span className="ridge ridge-one" />
                  <span className="ridge ridge-two" />
                  <span className="sun" />
                </div>
              )}
              <div className="post-meta">
                <span>{post.tag}</span>
                <p>{post.meta}</p>
              </div>
              <h3>{post.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="ask-wrap shell" id="ask">
        <div className="ask-panel">
          <div className="ask-halo" aria-hidden="true" />
          <div className="ask-dots" aria-hidden="true" />
          <div className="ask-content">
            <h2>
              Ask the goat <em>anything.</em>
            </h2>
            <p>Tell us what you’re working on. A human will read it, the goat will help.</p>
            <form className="chat-box" onSubmit={submitQuestion}>
              <label htmlFor="goat-question" className="sr-only">
                Ask GoatAI a question
              </label>
              <input
                id="goat-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="How could GoatAI help my team this quarter?"
              />
              <div className="chat-toolbar">
                <div className="chat-status">
                  <button className="add-button" type="button" aria-label="Add attachment">
                    <img src={`${assets}/029c5.svg`} alt="" />
                  </button>
                  <span>
                    <i />
                    Human review on
                  </span>
                </div>
                <button className="send-button" type="submit" aria-label="Send question">
                  <img src={`${assets}/ab7a5.svg`} alt="" />
                </button>
              </div>
            </form>
            <div className="suggestions">
              {["Audit my workflow", "Build a custom model", "Talk to a human"].map(
                (suggestion) => (
                  <button type="button" key={suggestion} onClick={() => setQuestion(suggestion)}>
                    {suggestion}
                  </button>
                ),
              )}
            </div>
            {sentQuestion && (
              <div className="sent-message" role="status">
                <span>Received</span>
                <p>“{sentQuestion}” — the herd will be in touch.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer shell" id="about">
        <div className="footer-row">
          <div>
            <Brand />
            <p className="footer-tagline">
              Artificial Intelligence, <em>powered by humans.</em>
            </p>
          </div>
          <div className="footer-columns">
            <div>
              <strong>Product</strong>
              <a href="#services">Models</a>
              <a href="#services">Agents</a>
              <a href="#ask">Pricing</a>
            </div>
            <div>
              <strong>Company</strong>
              <a href="#about">About</a>
              <a href="#journal">Blog</a>
              <a href="#ask">Careers</a>
            </div>
            <div>
              <strong>Contact</strong>
              <a href="mailto:info@goat.ai">info@goat.ai</a>
              <span>Mountain time, everywhere</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 GoatAI.</div>
      </footer>
    </main>
  );
}
