"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  Check,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Filter,
  Gamepad2,
  Info,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CANDIDATES,
  PHASES,
  PRE_SWITCH_TITLE_STEPS,
  REDDIT_CALLOUTS,
  SOURCES,
  SPECIES_UNION_LEADERS,
  TITLE_STEPS,
  titleStepsFor,
  type PhaseId,
} from "./pokemon-data";

type ProgressState = Record<string, boolean>;

const STORAGE_KEY = "pokemon-title-atlas-progress-v2";
const SELECTED_KEY = "pokemon-title-atlas-selected-v2";
const DEADLINE = new Date("2027-02-26T03:00:00Z");
const phaseOrder: Array<"all" | PhaseId> = [
  "all",
  "orre",
  "gba-ds",
  "bank",
  "alola",
  "switch",
  "champions",
];

function progressKey(candidateId: string, titleId: string) {
  return `${candidateId}:${titleId}`;
}

function readStoredProgress(): ProgressState {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as ProgressState;
  } catch {
    return {};
  }
}

function readStoredSelected(): string | null {
  try {
    return window.localStorage.getItem(SELECTED_KEY);
  } catch {
    return null;
  }
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(CANDIDATES[0].id);
  const [query, setQuery] = useState("");
  const [generation, setGeneration] = useState("all");
  const [phase, setPhase] = useState<"all" | PhaseId>("all");
  const [bankOnly, setBankOnly] = useState(false);
  const [preSwitchOnly, setPreSwitchOnly] = useState(false);
  const [onlyPending, setOnlyPending] = useState(false);
  const [completed, setCompleted] = useState<ProgressState>({});
  const [ready, setReady] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const loadStoredState = window.setTimeout(() => {
      setCompleted(readStoredProgress());
      const storedSelected = readStoredSelected();
      if (storedSelected && CANDIDATES.some((item) => item.id === storedSelected)) {
        setSelectedId(storedSelected);
      }
      setDaysLeft(Math.max(0, Math.ceil((DEADLINE.getTime() - Date.now()) / 86_400_000)));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(loadStoredState);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      window.localStorage.setItem(SELECTED_KEY, selectedId);
    } catch {}
  }, [completed, ready, selectedId]);

  const selected = CANDIDATES.find((item) => item.id === selectedId) ?? CANDIDATES[0];
  const selectedTitles = titleStepsFor(selected);
  const selectedPreSwitchTitles = selectedTitles.filter((item) => item.phase !== "switch" && item.phase !== "champions");
  const filteredCandidates = useMemo(
    () =>
      CANDIDATES.filter((item) => {
        const matchesQuery = `${item.name} ${item.number} ${item.shadowBase} ${item.originGame}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
        return matchesQuery && (generation === "all" || String(item.generation) === generation);
      }),
    [generation, query],
  );
  const visibleTitles = selectedTitles.filter((item) => {
    if (phase !== "all" && item.phase !== phase) return false;
    if (preSwitchOnly && (item.phase === "switch" || item.phase === "champions")) return false;
    if (bankOnly && !item.bankCritical) return false;
    if (onlyPending && completed[progressKey(selected.id, item.id)]) return false;
    return true;
  });
  const done = selectedTitles.filter((item) => completed[progressKey(selected.id, item.id)]).length;
  const preSwitchDone = selectedPreSwitchTitles.filter((item) => completed[progressKey(selected.id, item.id)]).length;
  const percent = Math.round((done / selectedTitles.length) * 100);
  const bankCount = TITLE_STEPS.filter((item) => item.bankCritical).length;

  function toggle(titleId: string) {
    const key = progressKey(selected.id, titleId);
    setCompleted((current) => ({ ...current, [key]: !current[key] }));
  }

  function clearSelectedProgress() {
    setCompleted((current) => {
      const next = { ...current };
      selectedTitles.forEach((item) => delete next[progressKey(selected.id, item.id)]);
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Pokémon Title Atlas">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span><strong>Pokémon Title Atlas</strong><small>Generations I–IV</small></span>
        </a>
        <div className="header-status"><span className="status-dot" />Progress saved on this device</div>
      </header>

      <section className="dashboard" id="top">
        <div className="deadline-banner">
          <CalendarClock aria-hidden="true" />
          <strong>Bank → HOME transfers end Feb 26, 2027 at 03:00 UTC</strong>
          <span>{daysLeft ?? "—"} days remaining</span>
          <a href={SOURCES.bankDeadline} rel="noreferrer" target="_blank">Official source <ExternalLink aria-hidden="true" /></a>
        </div>

        <div className="intro-row">
          <div className="intro-copy-block">
            <p className="eyebrow">RIBBON MASTER PLANNER</p>
            <h1>Browse all {CANDIDATES.length} Pokémon from Generations I–IV.</h1>
            <p className="intro-copy">Search any Pokémon yourself, compare its documented pre-Switch route, and check off every obtainable title. Fully audited routes also retain their verified Switch and Champions steps.</p>
          </div>
          <div className="headline-score">
            <span>Highest audited ceiling*</span>
            <strong>47</strong>
            <small>42 Ribbon titles · up to 4 Marks · 1 Champions title</small>
          </div>
        </div>

        <div className="method-strip">
          <div><BadgeCheck aria-hidden="true" /><span><strong>{PRE_SWITCH_TITLE_STEPS.length}</strong> pre-Switch title slots in a complete Shadow route</span></div>
          <div><AlertTriangle aria-hidden="true" /><span><strong>{bankCount}</strong> titles are flagged Bank-critical (not the whole pre-Switch route)</span></div>
          <div><Info aria-hidden="true" /><span>*Derived count; excludes event distributions and historical tournament specimens that cannot be audited by individual.</span></div>
        </div>

        <div className="workspace">
          <aside className="candidate-panel" aria-label="Candidate Pokémon">
            <div className="panel-heading">
              <div><span className="step-label">01 · CHOOSE</span><h2>Pokémon roster</h2></div>
              <span className="count-badge">{filteredCandidates.length}</span>
            </div>
            <div className="candidate-filters">
              <label className="search-box"><Search aria-hidden="true" /><span className="sr-only">Search Pokémon</span><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pokémon or origin…" /></label>
              <Select value={generation} onValueChange={setGeneration}>
                <SelectTrigger aria-label="Filter by generation" className="generation-select"><SelectValue placeholder="Generation" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All generations</SelectItem>
                  <SelectItem value="1">Generation I</SelectItem><SelectItem value="2">Generation II</SelectItem>
                  <SelectItem value="3">Generation III</SelectItem><SelectItem value="4">Generation IV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="candidate-list">
              {filteredCandidates.map((item) => {
                const itemTitles = titleStepsFor(item);
                const itemDone = itemTitles.filter((title) => completed[progressKey(item.id, title.id)]).length;
                return (
                  <button className="candidate-card" data-active={item.id === selected.id} key={item.id} onClick={() => setSelectedId(item.id)} type="button">
                    <span className="sprite-frame"><Image alt={`${item.name} HeartGold and SoulSilver pixel-art sprite`} height={84} loading="lazy" src={item.sprite} unoptimized width={84} /></span>
                    <span className="candidate-copy">
                      <span className="candidate-meta">{item.number} · GEN {item.generation}</span>
                      <strong>{item.name}</strong>
                      <span>{item.shadowBase} · {item.originGame}</span>
                    </span>
                    <span className="candidate-score"><strong>{item.maxTitles}</strong><small>{item.scope === "pre-switch" ? "pre-Switch titles" : "max titles"}</small><span>{itemDone}/{itemTitles.length} tracked</span></span>
                    <ChevronRight className="candidate-arrow" aria-hidden="true" />
                  </button>
                );
              })}
              {filteredCandidates.length === 0 && <div className="empty-state">No candidate matches this filter.</div>}
            </div>
            <a className="sprite-credit" href={SOURCES.sprites} rel="noreferrer" target="_blank">HGSS pixel-art sprites: Pokémon Database <ArrowUpRight aria-hidden="true" /></a>
          </aside>

          <section className="journey-panel" aria-label={`${selected.name} journey`}>
            <div className="selected-hero">
              <div className="selected-identity">
                <a className="hero-sprite" href={selected.spritePage} rel="noreferrer" target="_blank"><Image alt={`${selected.name} HeartGold and SoulSilver pixel-art sprite`} height={128} priority src={selected.sprite} unoptimized width={128} /></a>
                <div>
                  <span className="step-label">02 · PLAN</span><h2>{selected.name}</h2>
                  <p>{selected.route}</p>
                  <div className="route-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </div>
              <div className="progress-card">
                <div className="progress-ring" style={{ "--progress": `${percent * 3.6}deg` } as React.CSSProperties}><span>{percent}%</span></div>
                <div><span>This journey</span><strong>{done} of {selectedTitles.length} titles</strong><small>{preSwitchDone} / {selectedPreSwitchTitles.length} pre-Switch</small><Progress aria-label={`${percent}% complete`} value={percent} /></div>
              </div>
            </div>

            {selected.auditNote && (
              <section className="scope-note" aria-label={selected.name + " audit scope"}>
                <Info aria-hidden="true" />
                <div><strong>Pre-Switch route shown</strong><p>{selected.auditNote}</p></div>
              </section>
            )}

            {selected.gaps.length > 0 && (
              <section className="gap-note" aria-label={`${selected.name} route gaps`}>
                <AlertTriangle aria-hidden="true" />
                <div>
                  <strong>{selected.maxTitles}-title {selected.scope === "pre-switch" ? "documented pre-Switch " : ""}ceiling for this individual</strong>
                  <p>This route is fully trackable, but the references document {selected.gaps.length} unavailable title{selected.gaps.length === 1 ? "" : "s"}:</p>
                  <ul>
                    {selected.gaps.map((gap) => {
                      const step = TITLE_STEPS.find((item) => item.id === gap.titleId);
                      return <li key={gap.titleId}><span>{step?.ribbon ?? gap.titleId}:</span> {gap.reason} <a href={gap.source} rel="noreferrer" target="_blank">Verify <ExternalLink aria-hidden="true" /></a></li>;
                    })}
                  </ul>
                </div>
              </section>
            )}

            <div className="title-toolbar">
              <div className="journey-heading"><span className="step-label">03 · TRACK</span><h3>Title route</h3></div>
              <div className="toolbar-actions">
                <label><Checkbox checked={preSwitchOnly} onCheckedChange={(value) => setPreSwitchOnly(Boolean(value))} />Pre-Switch only</label>
                <label><Checkbox checked={bankOnly} onCheckedChange={(value) => setBankOnly(Boolean(value))} />Bank-critical only</label>
                <label><Checkbox checked={onlyPending} onCheckedChange={(value) => setOnlyPending(Boolean(value))} />Pending only</label>
                <Button className="reset-button" onClick={clearSelectedProgress} size="sm" variant="ghost">Clear</Button>
              </div>
            </div>

            <nav className="phase-tabs" aria-label="Filter by route phase">
              {phaseOrder.map((phaseId) => (
                <Button aria-pressed={phase === phaseId} className="phase-button" data-active={phase === phaseId} key={phaseId} onClick={() => setPhase(phaseId)} size="sm" variant="outline">
                  {phaseId === "all" ? "All" : PHASES[phaseId].label}
                </Button>
              ))}
            </nav>

            <div className="results-line"><Filter aria-hidden="true" />{visibleTitles.length} titles shown</div>
            <div className="title-list">
              {visibleTitles.map((item) => {
                const checked = Boolean(completed[progressKey(selected.id, item.id)]);
                const ordinal = selectedTitles.findIndex((title) => title.id === item.id) + 1;
                return (
                  <article className="title-step" data-complete={checked} key={item.id}>
                    <div className="timeline-marker">{checked ? <Check aria-hidden="true" /> : String(ordinal).padStart(2, "0")}</div>
                    <div className="title-copy">
                      <div className="title-topline">
                        <div><span className="title-name">{item.title}</span>{item.bankCritical && <span className="bank-chip">BANK</span>}{item.conditional && <span className="chance-chip">CONDITIONAL</span>}</div>
                        <div className="context-chips">
                          <span className="game-chip" title="Game"><Gamepad2 aria-hidden="true" />{item.game}</span>
                          {item.location && <span className="location-chip" title="Facility or location"><MapPin aria-hidden="true" />{item.location}</span>}
                        </div>
                      </div>
                      <h4>{item.ribbon}</h4><p>{item.how}</p>
                      {item.detail && <p className="detail-note"><CircleHelp aria-hidden="true" />{item.detail}</p>}
                      <a className="source-link" href={item.source} rel="noreferrer" target="_blank">View reference <ExternalLink aria-hidden="true" /></a>
                    </div>
                    <label className="complete-control"><Checkbox aria-label={`Mark ${item.ribbon} complete`} checked={checked} onCheckedChange={() => toggle(item.id)} /><span>{checked ? "Complete" : "Check off"}</span></label>
                  </article>
                );
              })}
              {visibleTitles.length === 0 && <div className="empty-state wide">Nothing pending in this filter.</div>}
            </div>

            <section className="species-note">
              <Sparkles aria-hidden="true" />
              <div><strong>&ldquo;Maximum by species&rdquo; is a different question.</strong><p>Bulbapedia identifies {SPECIES_UNION_LEADERS.join(", ")} as covering every non-event Ribbon when multiple specimens of one species are combined. No single individual can achieve that union because the Partner Ribbon conflicts with the legacy route. This app ranks one individual.</p></div>
            </section>

            <details className="sources-panel">
              <summary>Method and sources</summary>
              <div>
                <p>The roster contains all 493 species documented in the Generation IV National Pokédex. Pre-Switch entries avoid asserting later-game availability until that species is checked against the relevant roster; the fully audited high-ceiling routes retain their verified Switch and Champions steps. Gamepad chips name actual games, while pin chips name the facility or location.</p>
                <ul>
                  <li><a href={SOURCES.reddit} rel="noreferrer" target="_blank">Pokémon Bank exclusives masterpost</a></li>
                  <li><a href={SOURCES.nationalDex} rel="noreferrer" target="_blank">Bulbapedia · Generation IV National Pokédex roster</a></li>
                  <li><a href={SOURCES.ribbons} rel="noreferrer" target="_blank">Bulbapedia · List of Ribbons</a></li>
                  <li><a href={SOURCES.shadow} rel="noreferrer" target="_blank">Bulbapedia · List of Shadow Pokémon</a></li>
                  <li><a href={SOURCES.originMarks} rel="noreferrer" target="_blank">Bulbapedia · Origin marks</a></li>
                  <li><a href={SOURCES.homeChallenges} rel="noreferrer" target="_blank">Bulbapedia · Pokémon HOME Challenges</a></li>
                  <li><a href={SOURCES.championsTitles} rel="noreferrer" target="_blank">Serebii · Pokémon Champions titles</a></li>
                  <li><a href={SOURCES.championsRoster} rel="noreferrer" target="_blank">Serebii · Pokémon Champions roster</a></li>
                </ul>
              </div>
            </details>
          </section>
        </div>

        <section className="reddit-callouts" aria-labelledby="reddit-callouts-title">
          <div className="reddit-heading">
            <div><span className="step-label">BANK MASTERPOST · COLLECTOR NOTES</span><h2 id="reddit-callouts-title">Callouts from the Reddit masterpost</h2></div>
            <p>These are provenance and collection goals, not extra title slots. Open the original post for the full caveats and update history.</p>
            <a href={SOURCES.reddit} rel="noreferrer" target="_blank">Open the full masterpost <ExternalLink aria-hidden="true" /></a>
          </div>
          <div className="reddit-callout-grid">
            {REDDIT_CALLOUTS.map((callout) => (
              <article className="reddit-card" key={callout.title}>
                <span className="reddit-card-label">{callout.label}</span>
                <h3>{callout.title}</h3>
                <p>{callout.summary}</p>
                <ul>{callout.items.map((item) => <li key={item}>{item}</li>)}</ul>
                {callout.note && <p className="reddit-note"><Info aria-hidden="true" />{callout.note}</p>}
                <a href={callout.source} rel="noreferrer" target="_blank">Source post <ExternalLink aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
