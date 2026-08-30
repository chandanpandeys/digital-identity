"use client";

import { FormEvent, useMemo, useState } from "react";
import { evidenceNodes, evidencePrompts, type EvidenceNode } from "@/lib/evidence";

function scoreNode(query: string, node: EvidenceNode) {
  const normalized = query.toLowerCase();
  const words = normalized.split(/[^a-z0-9+.-]+/).filter((word) => word.length > 2);
  const haystack = `${node.title} ${node.answer} ${node.tags.join(" ")}`.toLowerCase();
  let score = node.tags.reduce((total, tag) => total + (normalized.includes(tag) ? 5 : 0), 0);
  score += words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
  return score;
}

export default function AskChandan() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("What AI infrastructure has Chandan built?");

  const results = useMemo(() => {
    const ranked = evidenceNodes
      .map((node) => ({ node, score: scoreNode(submitted, node) }))
      .sort((a, b) => b.score - a.score);
    const positive = ranked.filter((item) => item.score > 0).slice(0, 3);
    return positive.length ? positive.map((item) => item.node) : [evidenceNodes[0], evidenceNodes[5]];
  }, [submitted]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    setSubmitted(value);
  }

  function choosePrompt(value: string) {
    setQuery(value);
    setSubmitted(value);
  }

  return (
    <div className="ask-console">
      <div className="ask-status">
        <span><i /> EVIDENCE RETRIEVAL / V0.1</span>
        <small id="ask-help">No generative answer layer yet. Results resolve to curated evidence nodes.</small>
      </div>
      <form className="ask-form" onSubmit={submit}>
        <label htmlFor="ask-query">Ask about projects, research, experience, or public evidence.</label>
        <div>
          <input
            id="ask-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. What has Chandan built around LLM infrastructure?"
            autoComplete="off"
            aria-describedby="ask-help"
            aria-controls="ask-results"
          />
          <button type="submit" aria-controls="ask-results">Resolve →</button>
        </div>
      </form>
      <div className="ask-prompts" aria-label="Suggested questions">
        {evidencePrompts.map((prompt) => (
          <button key={prompt} type="button" aria-controls="ask-results" onClick={() => choosePrompt(prompt)}>{prompt}</button>
        ))}
      </div>
      <div className="ask-query-readout"><span>QUERY</span><strong>{submitted}</strong></div>
      <p className="sr-only" role="status" aria-live="polite">
        Showing {results.length} evidence {results.length === 1 ? "result" : "results"} for: {submitted}
      </p>
      <div className="ask-results" id="ask-results">
        {results.map((node, index) => (
          <article key={node.id}>
            <header><span>0{index + 1}</span><b className={`ask-strength ${node.strength.toLowerCase().replaceAll(" ", "-")}`}>{node.strength}</b></header>
            <h2>{node.title}</h2>
            <p>{node.answer}</p>
            <div className="ask-links">
              {node.links.map((link) => {
                const external = link.href.startsWith("http");
                return <a key={link.href} href={link.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{link.label} ↗</a>;
              })}
            </div>
          </article>
        ))}
      </div>
      <p className="ask-policy"><strong>WHY THIS VERSION IS DELIBERATELY LIMITED</strong> A portfolio assistant is only useful if it can distinguish public code, public professional records, and first-party project context. V0.1 proves that retrieval/evidence contract first. A model-backed synthesis layer can be added later without weakening provenance.</p>
    </div>
  );
}
