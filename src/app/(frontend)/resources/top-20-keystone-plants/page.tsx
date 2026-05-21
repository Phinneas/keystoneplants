import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, DM_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Top 20 Keystone Plant Species for Wildlife",
  description:
    "The native plants that do the most ecological heavy lifting — ranked by caterpillar species supported, based on Doug Tallamy's research and NWF keystone data.",
};

const css = `
.kp-page {
  --ink: #1a1a14;
  --paper: #f5f0e8;
  --paper2: #ede7d4;
  --forest: #2d4a2d;
  --moss: #4a6741;
  --sage: #7a9a6b;
  --fern: #a8c496;
  --gold: #c8922a;
  --amber: #d4a843;
  --rust: #8b4513;
  --cream: #faf6ed;
  --border: rgba(45,74,45,0.18);
  --shadow: rgba(26,26,20,0.12);
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-source-serif), Georgia, serif;
  font-weight: 300;
  line-height: 1.75;
}
.kp-page * { box-sizing: border-box; }

.kp-page .hero {
  background: var(--forest);
  color: var(--fern);
  padding: 5rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.kp-page .hero::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent, transparent 40px,
    rgba(74,103,65,0.08) 40px, rgba(74,103,65,0.08) 41px
  );
}
.kp-page .hero-eyebrow {
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 1.5rem;
  opacity: 0.85;
  position: relative;
}
.kp-page .hero h1 {
  font-family: var(--font-playfair), serif;
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  color: var(--cream);
  margin-bottom: 0.5rem;
  position: relative;
}
.kp-page .hero h1 em {
  font-style: italic;
  color: var(--amber);
}
.kp-page .hero-sub {
  font-family: var(--font-source-serif), serif;
  font-style: italic;
  font-size: 1.15rem;
  color: var(--fern);
  margin-top: 1.5rem;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
  position: relative;
}
.kp-page .hero-divider {
  display: flex; align-items: center; justify-content: center; gap: 1rem;
  margin-top: 2.5rem; position: relative;
}
.kp-page .hero-divider span { font-size: 1.4rem; }
.kp-page .hero-divider::before, .kp-page .hero-divider::after {
  content: ''; flex: 1; max-width: 100px;
  height: 1px; background: rgba(168,196,150,0.35);
}

.kp-page .stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0;
  border-top: 2px solid var(--forest);
  border-bottom: 2px solid var(--forest);
  background: var(--cream);
}
.kp-page .stat-cell {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid var(--border);
  text-align: center;
}
.kp-page .stat-cell:last-child { border-right: none; }
.kp-page .stat-num {
  font-family: var(--font-playfair), serif;
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--forest);
  line-height: 1;
  display: block;
}
.kp-page .stat-num em { font-style: italic; color: var(--gold); }
.kp-page .stat-label {
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--moss);
  margin-top: 0.4rem;
  display: block;
}

.kp-page .lead-section {
  max-width: 760px;
  margin: 0 auto;
  padding: 3.5rem 2rem;
  border-bottom: 1px solid var(--border);
}
.kp-page .lead-section p {
  font-size: 1.15rem;
  color: #2a2a1e;
  margin-bottom: 1.25rem;
}
.kp-page .lead-section p:first-of-type::first-letter {
  font-family: var(--font-playfair), serif;
  font-size: 4.5rem;
  font-weight: 900;
  float: left;
  line-height: 0.78;
  margin-right: 0.12em;
  margin-top: 0.1em;
  color: var(--forest);
}
.kp-page .source-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--forest);
  color: var(--fern);
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.85rem;
  border-radius: 2px;
  margin-top: 1rem;
}
.kp-page .source-badge::before { content: '✦'; font-size: 0.6rem; }

.kp-page .main-wrap {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.kp-page .section-header {
  padding: 3.5rem 0 2rem;
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2.5rem;
}
.kp-page .section-num {
  font-family: var(--font-playfair), serif;
  font-size: 4rem;
  font-weight: 900;
  color: var(--fern);
  line-height: 1;
  flex-shrink: 0;
}
.kp-page .section-title-group h2 {
  font-family: var(--font-playfair), serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--forest);
  line-height: 1.2;
}
.kp-page .section-title-group p {
  font-size: 0.95rem;
  color: var(--moss);
  font-style: italic;
  margin-top: 0.3rem;
}

.kp-page .plant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}
.kp-page .plant-card {
  background: var(--cream);
  border: 1px solid var(--border);
  border-top: 3px solid transparent;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  animation: kpFadeUp 0.5s ease both;
}
.kp-page .plant-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px var(--shadow);
}
.kp-page .plant-card.woody { border-top-color: var(--forest); }
.kp-page .plant-card.herb { border-top-color: var(--gold); }

.kp-page .plant-card:nth-child(1)  { animation-delay: 0.05s; }
.kp-page .plant-card:nth-child(2)  { animation-delay: 0.1s; }
.kp-page .plant-card:nth-child(3)  { animation-delay: 0.15s; }
.kp-page .plant-card:nth-child(4)  { animation-delay: 0.2s; }
.kp-page .plant-card:nth-child(5)  { animation-delay: 0.25s; }
.kp-page .plant-card:nth-child(6)  { animation-delay: 0.3s; }
.kp-page .plant-card:nth-child(7)  { animation-delay: 0.35s; }
.kp-page .plant-card:nth-child(8)  { animation-delay: 0.4s; }
.kp-page .plant-card:nth-child(9)  { animation-delay: 0.45s; }
.kp-page .plant-card:nth-child(10) { animation-delay: 0.5s; }

.kp-page .card-rank {
  position: absolute;
  top: 1rem; right: 1rem;
  font-family: var(--font-playfair), serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: rgba(45,74,45,0.12);
  line-height: 1;
}
.kp-page .card-inner { padding: 1.5rem 1.5rem 1.25rem; }
.kp-page .card-genus {
  font-family: var(--font-playfair), serif;
  font-style: italic;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--forest);
  margin-bottom: 0.15rem;
}
.kp-page .card-common {
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--moss);
  margin-bottom: 1rem;
}
.kp-page .card-metric {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.6rem 0.85rem;
  background: rgba(45,74,45,0.06);
  border-left: 3px solid var(--sage);
}
.kp-page .metric-num {
  font-family: var(--font-playfair), serif;
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--forest);
  line-height: 1;
  min-width: 3ch;
}
.kp-page .metric-label {
  font-size: 0.78rem;
  color: var(--moss);
  line-height: 1.35;
}
.kp-page .metric-label strong {
  display: block;
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 2px;
}
.kp-page .card-desc {
  font-size: 0.88rem;
  color: #3a3a2e;
  line-height: 1.65;
  margin-bottom: 1rem;
}
.kp-page .card-species { list-style: none; margin-bottom: 0.5rem; }
.kp-page .card-species li {
  font-size: 0.8rem;
  font-style: italic;
  color: var(--rust);
  padding: 0.18rem 0;
  padding-left: 1.1rem;
  position: relative;
}
.kp-page .card-species li::before {
  content: '→';
  position: absolute; left: 0;
  color: var(--sage);
  font-style: normal;
  font-size: 0.7rem;
}
.kp-page .card-footer {
  padding: 0.75rem 1.5rem;
  background: rgba(45,74,45,0.04);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kp-page .type-badge {
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 1px;
}
.kp-page .type-badge.woody { background: var(--forest); color: var(--fern); }
.kp-page .type-badge.herb { background: var(--amber); color: var(--forest); }
.kp-page .region-tag {
  font-size: 0.75rem;
  color: var(--moss);
  font-style: italic;
}

.kp-page .shortlist-section {
  background: var(--forest);
  color: var(--cream);
  padding: 3.5rem 2rem;
}
.kp-page .shortlist-inner { max-width: 960px; margin: 0 auto; }
.kp-page .shortlist-section h2 {
  font-family: var(--font-playfair), serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--amber);
  margin-bottom: 0.5rem;
  font-style: italic;
}
.kp-page .shortlist-section > .shortlist-inner > p {
  color: var(--fern);
  font-size: 0.95rem;
  margin-bottom: 2rem;
  max-width: 600px;
}
.kp-page .shortlist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}
@media(max-width:640px) { .kp-page .shortlist-grid { grid-template-columns: 1fr; } }

.kp-page .shortlist-col h3 {
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(168,196,150,0.25);
}
.kp-page .shortlist-item {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(168,196,150,0.1);
}
.kp-page .shortlist-item:last-child { border-bottom: none; }
.kp-page .sl-num {
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.7rem;
  color: var(--sage);
  opacity: 0.7;
  min-width: 1.5rem;
  flex-shrink: 0;
}
.kp-page .sl-genus {
  font-family: var(--font-playfair), serif;
  font-style: italic;
  font-size: 1.05rem;
  color: var(--cream);
  flex: 1;
}
.kp-page .sl-common { font-size: 0.78rem; color: var(--fern); opacity: 0.8; }
.kp-page .sl-count {
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.72rem;
  color: var(--amber);
  flex-shrink: 0;
}

.kp-page .howto-section { background: var(--paper2); padding: 4rem 2rem; }
.kp-page .howto-inner { max-width: 860px; margin: 0 auto; }
.kp-page .howto-inner h2 {
  font-family: var(--font-playfair), serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--forest);
  margin-bottom: 2rem;
  font-style: italic;
}
.kp-page .steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}
.kp-page .step {
  padding: 1.75rem;
  background: var(--cream);
  border: 1px solid var(--border);
  border-left: 4px solid var(--moss);
}
.kp-page .step-num {
  font-family: var(--font-playfair), serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--sage);
  margin-bottom: 0.5rem;
}
.kp-page .step h3 {
  font-family: var(--font-playfair), serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--forest);
  margin-bottom: 0.6rem;
  line-height: 1.3;
}
.kp-page .step p { font-size: 0.88rem; color: #3a3a2e; line-height: 1.65; }
.kp-page .step a { color: var(--moss); }

.kp-page .kp-footer {
  background: var(--ink);
  color: rgba(245,240,232,0.55);
  padding: 2.5rem 2rem;
  text-align: center;
  font-family: var(--font-dm-mono), monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  line-height: 2;
}
.kp-page .kp-footer a { color: rgba(200,146,42,0.8); text-decoration: none; }
.kp-page .kp-footer strong { color: rgba(245,240,232,0.85); }

.kp-page .divider-leaf {
  text-align: center;
  padding: 2rem 0;
  color: var(--sage);
  font-size: 1.4rem;
  opacity: 0.6;
}

@keyframes kpFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@media(max-width:600px) {
  .kp-page .plant-grid { grid-template-columns: 1fr; }
  .kp-page .section-header { flex-direction: column; gap: 0.5rem; }
  .kp-page .section-num { font-size: 2.5rem; }
}
`;

export default function Top20KeystonePlantsPage() {
  return (
    <div className={`kp-page ${playfair.variable} ${sourceSerif.variable} ${dmMono.variable}`}>
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <p className="hero-eyebrow">Doug Tallamy Research · NWF Keystone Data · U.S. Wildlife Habitat</p>
        <h1>Top 20 <em>Keystone</em><br />Plant Species<br />for Wildlife</h1>
        <p className="hero-sub">The native plants that do the most ecological heavy lifting — ranked by caterpillar species supported</p>
        <div className="hero-divider"><span>🌿</span></div>
      </header>

      {/* STATS */}
      <div className="stat-row">
        <div className="stat-cell">
          <span className="stat-num"><em>534</em></span>
          <span className="stat-label">Lepidoptera spp.<br />supported by oaks</span>
        </div>
        <div className="stat-cell">
          <span className="stat-num">20</span>
          <span className="stat-label">keystone genera<br />ranked here</span>
        </div>
        <div className="stat-cell">
          <span className="stat-num"><em>96%</em></span>
          <span className="stat-label">of terrestrial birds<br />feed on caterpillars</span>
        </div>
        <div className="stat-cell">
          <span className="stat-num">10×</span>
          <span className="stat-label">more wildlife value<br />vs. ornamentals</span>
        </div>
      </div>

      {/* LEAD */}
      <section className="lead-section">
        <p>Not all native plants are created equal. A small number of plant genera — called <strong>keystone plants</strong> — support a disproportionately large share of the insects, birds, and wildlife in any given ecosystem. Remove them and entire food webs collapse. Plant them, and life returns.</p>
        <p>The rankings below are drawn from ecologist Doug Tallamy&apos;s landmark research, which counts the number of butterfly and moth (Lepidoptera) caterpillar species each genus supports — because caterpillars are the single most important food source for breeding birds. One clutch of chickadees requires 6,000–9,000 caterpillars before fledging.</p>
        <p>These are not exotic rarities. They are the oaks, cherries, willows, goldenrods, and asters that shaped North American ecosystems over millions of years — and still want to grow where you live.</p>
        <div className="source-badge">Source: Tallamy / Lancaster Conservancy · NWF Keystone Plants by Ecoregion · MGNV</div>
      </section>

      {/* MAIN */}
      <main className="main-wrap">
        <div className="section-header">
          <div className="section-num">01</div>
          <div className="section-title-group">
            <h2>Top 10 Woody Keystone Plants</h2>
            <p>Trees &amp; large shrubs — the backbone of any wildlife habitat</p>
          </div>
        </div>

        <div className="plant-grid">
          <div className="plant-card woody">
            <div className="card-rank">1</div>
            <div className="card-inner">
              <div className="card-genus">Quercus</div>
              <div className="card-common">Oaks</div>
              <div className="card-metric">
                <div className="metric-num">534</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>The undisputed champion of wildlife habitat</div>
              </div>
              <p className="card-desc">No other plant genus comes close. Oaks have co-evolved with North American wildlife for millions of years, hosting more caterpillar species than any other tree — making them the single most important planting decision you can make.</p>
              <ul className="card-species">
                <li>Quercus alba — white oak (East &amp; Midwest)</li>
                <li>Quercus rubra — northern red oak</li>
                <li>Quercus lobata — valley oak (California)</li>
                <li>Quercus virginiana — live oak (Southeast)</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">Nationwide</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">2</div>
            <div className="card-inner">
              <div className="card-genus">Prunus</div>
              <div className="card-common">Cherries &amp; Plums</div>
              <div className="card-metric">
                <div className="metric-num">456</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Second most valuable woody genus in North America</div>
              </div>
              <p className="card-desc">Black cherry alone may be the most ecologically important tree in the eastern U.S. outside oaks. A prolific fruit producer in fall, providing food for over 40 species of birds. The early spring blooms fuel pollinators when little else is flowering.</p>
              <ul className="card-species">
                <li>Prunus serotina — black cherry (keystone)</li>
                <li>Prunus americana — American plum</li>
                <li>Prunus virginiana — chokecherry</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">East &amp; Midwest</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">3</div>
            <div className="card-inner">
              <div className="card-genus">Salix</div>
              <div className="card-common">Willows</div>
              <div className="card-metric">
                <div className="metric-num">455</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Critical for wetland and riparian corridors</div>
              </div>
              <p className="card-desc">Willows leaf out earlier than almost any other woody plant, providing crucial early-season caterpillars for migrating birds arriving in spring. Their catkins are also an essential early nectar and pollen source for native bees.</p>
              <ul className="card-species">
                <li>Salix nigra — black willow</li>
                <li>Salix discolor — pussy willow</li>
                <li>Various shrub willows by region</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">Nationwide (riparian)</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">4</div>
            <div className="card-inner">
              <div className="card-genus">Betula</div>
              <div className="card-common">Birches</div>
              <div className="card-metric">
                <div className="metric-num">413</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Essential for seed-eating birds through winter</div>
              </div>
              <p className="card-desc">Birches support an enormous array of lepidopteran larvae while also producing abundant small seeds eaten by finches, redpolls, and chickadees in winter. River birch is especially adaptable to disturbed urban conditions.</p>
              <ul className="card-species">
                <li>Betula nigra — river birch</li>
                <li>Betula papyrifera — paper birch</li>
                <li>Betula lenta — sweet/cherry birch</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">East &amp; North</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">5</div>
            <div className="card-inner">
              <div className="card-genus">Populus</div>
              <div className="card-common">Poplars, Cottonwoods &amp; Aspens</div>
              <div className="card-metric">
                <div className="metric-num">368</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Fast-growing pioneer trees for young habitat</div>
              </div>
              <p className="card-desc">Cottonwoods are the dominant trees of floodplain ecosystems. Quaking aspen forms clonal groves that support some of the richest wildlife communities in North America. Both leaf out rapidly to provide early-season caterpillar food.</p>
              <ul className="card-species">
                <li>Populus deltoides — eastern cottonwood</li>
                <li>Populus tremuloides — quaking aspen</li>
                <li>Populus fremontii — Fremont cottonwood (West)</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">Nationwide</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">6</div>
            <div className="card-inner">
              <div className="card-genus">Malus</div>
              <div className="card-common">Crabapples</div>
              <div className="card-metric">
                <div className="metric-num">311</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Small trees ideal for suburban lots</div>
              </div>
              <p className="card-desc">Native crabapples are powerhouse wildlife plants at a manageable scale. Their persistent small fruits feed waxwings, robins, and thrushes through winter. Spring bloom is exceptionally valuable for early pollinators. Use straight native species, not sterile horticultural selections.</p>
              <ul className="card-species">
                <li>Malus coronaria — sweet crabapple</li>
                <li>Malus ioensis — prairie crabapple</li>
                <li>Malus fusca — Pacific crabapple (West)</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">East, Midwest &amp; West</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">7</div>
            <div className="card-inner">
              <div className="card-genus">Vaccinium</div>
              <div className="card-common">Blueberries &amp; Bilberries</div>
              <div className="card-metric">
                <div className="metric-num">288</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Plus abundant fruit for birds and mammals</div>
              </div>
              <p className="card-desc">Beyond caterpillar support, blueberries produce the most nutritious, lipid-rich fruit of any native shrub — critical for fueling fall bird migration. They also require native specialist bees for proper pollination, supporting a distinct pollinator community.</p>
              <ul className="card-species">
                <li>Vaccinium corymbosum — highbush blueberry</li>
                <li>Vaccinium angustifolium — lowbush blueberry</li>
                <li>Vaccinium stamineum — deerberry</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">East &amp; North</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">8</div>
            <div className="card-inner">
              <div className="card-genus">Acer</div>
              <div className="card-common">Maples</div>
              <div className="card-metric">
                <div className="metric-num">285</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Common, adaptable, and ecologically essential</div>
              </div>
              <p className="card-desc">Maples are among the earliest bloomers, providing critical pollen before most other trees open. Their winged seeds (samaras) feed numerous birds in spring and summer. Red maple is particularly adaptable and important across a wide range of conditions.</p>
              <ul className="card-species">
                <li>Acer rubrum — red maple</li>
                <li>Acer saccharum — sugar maple</li>
                <li>Acer negundo — box elder (fast pioneer)</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">East &amp; Midwest</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">9</div>
            <div className="card-inner">
              <div className="card-genus">Carya</div>
              <div className="card-common">Hickories</div>
              <div className="card-metric">
                <div className="metric-num">200</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Long-lived mast trees for large mammals &amp; birds</div>
              </div>
              <p className="card-desc">Hickory nuts are among the most nutritious and calorie-dense mast crops in eastern forests, critical for squirrels, deer, bears, and wood ducks. These slow-growing trees are a multi-generational investment in habitat that pays off for centuries.</p>
              <ul className="card-species">
                <li>Carya glabra — pignut hickory</li>
                <li>Carya ovata — shagbark hickory</li>
                <li>Carya illinoinensis — pecan (South)</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">East &amp; South</span>
            </div>
          </div>

          <div className="plant-card woody">
            <div className="card-rank">10</div>
            <div className="card-inner">
              <div className="card-genus">Ulmus · Alnus · Tilia</div>
              <div className="card-common">Elms, Alders &amp; Basswoods</div>
              <div className="card-metric">
                <div className="metric-num">213<span style={{ fontSize: "1rem", color: "var(--sage)" }}>+</span></div>
                <div className="metric-label"><strong>Lepidoptera species (elms)</strong>Three keystone genera, one ecological tier</div>
              </div>
              <p className="card-desc">Elms support 213 species; alders and basswoods each support 150+. These three genera round out the top-tier woody keystones. Alders are nitrogen-fixers critical for riparian restoration. Basswood blooms attract more bumblebees per tree than almost anything else.</p>
              <ul className="card-species">
                <li>Ulmus americana — American elm</li>
                <li>Alnus serrulata — hazel alder (East)</li>
                <li>Tilia americana — American basswood</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge woody">Woody</span>
              <span className="region-tag">East &amp; Midwest</span>
            </div>
          </div>
        </div>

        <div className="divider-leaf">✦ ✦ ✦</div>

        <div className="section-header">
          <div className="section-num">02</div>
          <div className="section-title-group">
            <h2>Top 10 Herbaceous Keystone Plants</h2>
            <p>Perennial wildflowers, grasses &amp; sedges — for meadows, beds &amp; understories</p>
          </div>
        </div>

        <div className="plant-grid">
          <div className="plant-card herb">
            <div className="card-rank">11</div>
            <div className="card-inner">
              <div className="card-genus">Solidago</div>
              <div className="card-common">Goldenrods</div>
              <div className="card-metric">
                <div className="metric-num">115</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Most ecologically valuable perennial genus</div>
              </div>
              <p className="card-desc">Goldenrod is unjustly maligned (blamed for hay fever caused by ragweed, which blooms simultaneously). In reality, it is one of the most important fall-blooming plants on the continent — feeding hundreds of specialist bees, monarchs, and dozens of caterpillar species simultaneously.</p>
              <ul className="card-species">
                <li>Solidago canadensis — Canada goldenrod</li>
                <li>Solidago rugosa — wrinkleleaf goldenrod</li>
                <li>Solidago nemoralis — gray goldenrod</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">Nationwide</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">12</div>
            <div className="card-inner">
              <div className="card-genus">Symphyotrichum</div>
              <div className="card-common">Native Asters</div>
              <div className="card-metric">
                <div className="metric-num">112</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Critical late-season pollinator fuel</div>
              </div>
              <p className="card-desc">Native asters bloom just as goldenrods are fading, creating a seamless corridor of late-season nutrition. They are the last major nectar source before winter for monarch butterflies fueling up for migration, and host dozens of specialist bees found nowhere else.</p>
              <ul className="card-species">
                <li>Symphyotrichum novae-angliae — New England aster</li>
                <li>Symphyotrichum laeve — smooth aster</li>
                <li>Eurybia divaricata — white wood aster</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">Nationwide</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">13</div>
            <div className="card-inner">
              <div className="card-genus">Helianthus</div>
              <div className="card-common">Native Sunflowers</div>
              <div className="card-metric">
                <div className="metric-num">73</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Massive seed crop for songbirds in fall</div>
              </div>
              <p className="card-desc">Native perennial sunflowers feed goldfinches, chickadees, and siskins through fall. The pollen is essential for specialist sunflower bees (Andrena, Melissodes) that can&apos;t survive without it. Far more wildlife-valuable than the annual cultivated sunflower.</p>
              <ul className="card-species">
                <li>Helianthus maximiliani — Maximilian sunflower</li>
                <li>Helianthus angustifolius — swamp sunflower</li>
                <li>Helianthus divaricatus — woodland sunflower</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">Prairie &amp; East</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">14</div>
            <div className="card-inner">
              <div className="card-genus">Eupatorium / Eutrochium</div>
              <div className="card-common">Joe-Pye Weeds &amp; Bonesets</div>
              <div className="card-metric">
                <div className="metric-num">42</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>August butterfly magnet &amp; caterpillar host</div>
              </div>
              <p className="card-desc">Joe-Pye weed&apos;s towering late-summer blooms are a magnet for swallowtails, fritillaries, and monarchs. These plants bridge the midsummer pollinator gap when many spring plants have finished and fall asters haven&apos;t yet opened.</p>
              <ul className="card-species">
                <li>Eutrochium maculatum — spotted Joe-Pye weed</li>
                <li>Eupatorium perfoliatum — common boneset</li>
                <li>Eupatorium serotinum — late boneset</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">East &amp; Midwest</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">15</div>
            <div className="card-inner">
              <div className="card-genus">Rudbeckia</div>
              <div className="card-common">Black-Eyed Susans</div>
              <div className="card-metric">
                <div className="metric-num">17</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Plus specialist bees &amp; abundant seed</div>
              </div>
              <p className="card-desc">One of the most recognizable wildflowers in North America. Beloved by specialist bees and butterflies in midsummer, then producing persistent seed heads that feed goldfinches and sparrows through winter. Extremely adaptable and easy to establish.</p>
              <ul className="card-species">
                <li>Rudbeckia hirta — black-eyed Susan</li>
                <li>Rudbeckia laciniata — cutleaf coneflower</li>
                <li>Rudbeckia fulgida — orange coneflower</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">Nationwide</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">16</div>
            <div className="card-inner">
              <div className="card-genus">Asclepias</div>
              <div className="card-common">Milkweeds</div>
              <div className="card-metric">
                <div className="metric-num">12</div>
                <div className="metric-label"><strong>Lepidoptera species (incl. monarch)</strong>Non-negotiable monarch conservation plant</div>
              </div>
              <p className="card-desc">The sole larval host plant for monarch butterflies, whose population has declined over 80% partly due to milkweed loss. Also supports specialist milkweed bugs, beetles, and pollinators. Each species has a native range — choose the right one for your region.</p>
              <ul className="card-species">
                <li>Asclepias tuberosa — butterfly weed</li>
                <li>Asclepias incarnata — swamp milkweed</li>
                <li>Asclepias speciosa — showy milkweed (West)</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">Nationwide (by species)</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">17</div>
            <div className="card-inner">
              <div className="card-genus">Viola</div>
              <div className="card-common">Native Violets</div>
              <div className="card-metric">
                <div className="metric-num">29</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Sole larval host for all fritillary butterflies</div>
              </div>
              <p className="card-desc">All fritillary butterflies — great spangled, regal, meadow, Diana — can only lay their eggs on violets. Without violets in the landscape, these spectacular butterflies simply cannot reproduce. An often-overlooked &quot;weed&quot; that anchors an entire butterfly guild.</p>
              <ul className="card-species">
                <li>Viola sororia — common blue violet</li>
                <li>Viola pubescens — downy yellow violet</li>
                <li>Viola pedata — bird&apos;s-foot violet</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">East &amp; Midwest</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">18</div>
            <div className="card-inner">
              <div className="card-genus">Lupinus</div>
              <div className="card-common">Native Lupines</div>
              <div className="card-metric">
                <div className="metric-num">33</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Critical for Karner blue &amp; other rare butterflies</div>
              </div>
              <p className="card-desc">Wild lupine is the sole larval host for the federally endangered Karner blue butterfly. Many lupine species are critical for specialist solitary bees and bumblebee queens in spring. A nitrogen-fixing plant that improves soil while feeding wildlife.</p>
              <ul className="card-species">
                <li>Lupinus perennis — wild blue lupine (East)</li>
                <li>Lupinus polyphyllus — large-leaved lupine</li>
                <li>Lupinus argenteus — silvery lupine (West)</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">East, Prairie &amp; West</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">19</div>
            <div className="card-inner">
              <div className="card-genus">Carex</div>
              <div className="card-common">Native Sedges</div>
              <div className="card-metric">
                <div className="metric-num">36</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Foundation layer for shade &amp; wet areas</div>
              </div>
              <p className="card-desc">Sedges are the unsung heroes of native groundcover. They fill ecological roles that no other plant can fill — providing structure in wet and shaded areas, food for waterfowl and sparrows, and larval habitat for dozens of skipper butterflies that specialize on grasses and sedges.</p>
              <ul className="card-species">
                <li>Carex pensylvanica — Pennsylvania sedge</li>
                <li>Carex stricta — tussock sedge</li>
                <li>Carex lupulina — hop sedge</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">Nationwide</span>
            </div>
          </div>

          <div className="plant-card herb">
            <div className="card-rank">20</div>
            <div className="card-inner">
              <div className="card-genus">Schizachyrium</div>
              <div className="card-common">Little Bluestem</div>
              <div className="card-metric">
                <div className="metric-num">6</div>
                <div className="metric-label"><strong>Lepidoptera species</strong>Essential warm-season grass for prairie birds</div>
              </div>
              <p className="card-desc">The signature grass of the American tallgrass prairie. Its fluffy silver seed heads persist through winter, feeding juncos, sparrows, and finches when little else is available. The dense clumping growth provides nesting cover for ground-nesting birds and overwintering insects.</p>
              <ul className="card-species">
                <li>Schizachyrium scoparium — little bluestem</li>
                <li>Various regional ecotypes available</li>
              </ul>
            </div>
            <div className="card-footer">
              <span className="type-badge herb">Herbaceous</span>
              <span className="region-tag">Nationwide (prairie)</span>
            </div>
          </div>
        </div>
      </main>

      {/* SHORTLIST */}
      <section className="shortlist-section">
        <div className="shortlist-inner">
          <h2>The Essential Shortlist</h2>
          <p>A quick-reference summary of all 20 keystone genera, with caterpillar counts from Tallamy&apos;s research. For maximum wildlife impact, start with oaks, cherries, willows, goldenrods, and asters.</p>
          <div className="shortlist-grid">
            <div className="shortlist-col">
              <h3>Woody Plants — Trees &amp; Shrubs</h3>
              <div className="shortlist-item"><span className="sl-num">01</span><span className="sl-genus">Quercus</span><span className="sl-common">Oaks</span><span className="sl-count">534 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">02</span><span className="sl-genus">Prunus</span><span className="sl-common">Cherries &amp; plums</span><span className="sl-count">456 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">03</span><span className="sl-genus">Salix</span><span className="sl-common">Willows</span><span className="sl-count">455 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">04</span><span className="sl-genus">Betula</span><span className="sl-common">Birches</span><span className="sl-count">413 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">05</span><span className="sl-genus">Populus</span><span className="sl-common">Poplars &amp; aspens</span><span className="sl-count">368 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">06</span><span className="sl-genus">Malus</span><span className="sl-common">Crabapples</span><span className="sl-count">311 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">07</span><span className="sl-genus">Vaccinium</span><span className="sl-common">Blueberries</span><span className="sl-count">288 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">08</span><span className="sl-genus">Acer</span><span className="sl-common">Maples</span><span className="sl-count">285 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">09</span><span className="sl-genus">Carya</span><span className="sl-common">Hickories</span><span className="sl-count">200 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">10</span><span className="sl-genus">Ulmus · Alnus · Tilia</span><span className="sl-common">Elms, alders, basswoods</span><span className="sl-count">150–213</span></div>
            </div>
            <div className="shortlist-col">
              <h3>Herbaceous Plants — Perennials &amp; Grasses</h3>
              <div className="shortlist-item"><span className="sl-num">11</span><span className="sl-genus">Solidago</span><span className="sl-common">Goldenrods</span><span className="sl-count">115 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">12</span><span className="sl-genus">Symphyotrichum</span><span className="sl-common">Native asters</span><span className="sl-count">112 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">13</span><span className="sl-genus">Helianthus</span><span className="sl-common">Native sunflowers</span><span className="sl-count">73 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">14</span><span className="sl-genus">Eutrochium</span><span className="sl-common">Joe-Pye weeds</span><span className="sl-count">42 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">15</span><span className="sl-genus">Rudbeckia</span><span className="sl-common">Black-eyed Susans</span><span className="sl-count">17 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">16</span><span className="sl-genus">Asclepias</span><span className="sl-common">Milkweeds</span><span className="sl-count">12 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">17</span><span className="sl-genus">Viola</span><span className="sl-common">Native violets</span><span className="sl-count">29 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">18</span><span className="sl-genus">Lupinus</span><span className="sl-common">Wild lupines</span><span className="sl-count">33 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">19</span><span className="sl-genus">Carex</span><span className="sl-common">Native sedges</span><span className="sl-count">36 spp.</span></div>
              <div className="shortlist-item"><span className="sl-num">20</span><span className="sl-genus">Schizachyrium</span><span className="sl-common">Little bluestem</span><span className="sl-count">6 spp.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="howto-section">
        <div className="howto-inner">
          <h2>How to Use This List Where You Live</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">Step 01</div>
              <h3>Find your ecoregion</h3>
              <p>Keystone value varies by region. Use the NWF&apos;s <a href="https://www.nwf.org/Native-Plant-Habitats/Plant-Native/Why-Native/Keystone-Plants-by-Ecoregion" target="_blank" rel="noopener noreferrer">Keystone Plants by Ecoregion</a> page to download a PDF ranking the top 30 genera for your specific area.</p>
            </div>
            <div className="step">
              <div className="step-num">Step 02</div>
              <h3>Look up species by zip code</h3>
              <p>NWF&apos;s <a href="https://www.nwf.org/NativePlantFinder/" target="_blank" rel="noopener noreferrer">Native Plant Finder</a> generates a ranked list of native plants by zip code, showing exactly how many Lepidoptera species each supports near you.</p>
            </div>
            <div className="step">
              <div className="step-num">Step 03</div>
              <h3>Start with the top tier</h3>
              <p>If you can only plant a few things: one native oak, one native cherry or willow, a patch of goldenrods, and a patch of native asters will outperform dozens of ornamentals for wildlife value.</p>
            </div>
            <div className="step">
              <div className="step-num">Step 04</div>
              <h3>Choose true native species</h3>
              <p>Avoid non-native cultivars (doubles, sterile types, heavily-bred varieties) — they often lack the pollen, nectar, and leaf chemistry that caterpillars and specialist bees need. Ask for straight species at native plant nurseries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="kp-footer">
        <p><strong>Sources</strong></p>
        <p>Tallamy, D. (2021) · <a href="https://www.lancasterconservancy.org/wp-content/uploads/2023/09/20-Most-Valuable-Woody-and-Perennial-Native-Plant-Genera-Dr.-Doug-Tallamy.pdf">20 Most Valuable Native Plant Genera — Lancaster Conservancy</a></p>
        <p><a href="https://www.nwf.org/Native-Plant-Habitats/Plant-Native/Why-Native/Keystone-Plants-by-Ecoregion">National Wildlife Federation: Keystone Plants by Ecoregion</a></p>
        <p><a href="https://mgnv.org/restoring-nature/restoring-nature-action-3-identify-and-add-keystone-plants/">Master Gardeners of Northern Virginia: Keystone Plants</a></p>
        <p><a href="https://homegrownnationalpark.org/keystone-plants/">Homegrown National Park: Keystone Plant Finder</a></p>
        <p style={{ marginTop: "1rem", opacity: 0.5 }}>Caterpillar host counts are for the Mid-Atlantic region and will vary by ecoregion. Rankings consistent across cited sources.</p>
      </div>
    </div>
  );
}
