"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowUp,
  ChatCircle,
  Stop,
  Lightning,
  Trash,
} from "@phosphor-icons/react";
import { verticals, type Intent } from "@/lib/verticals";
import { evidencePrompts, type EvidenceNode } from "@/lib/evidence";
import {
  retrieve,
  evidenceAnswer,
  synthesisPrompt,
  parseSynthesis,
  type ChatTurn,
} from "@/lib/ask";
import type { MLCEngineInterface } from "@mlc-ai/web-llm";
type Reply = {
  question: string;
  answer: string;
  sources: EvidenceNode[];
  mode: string;
  notice?: string;
};
export default function AskChandan({
  intent: initial = "complete",
}: {
  intent?: Intent;
}) {
  const [intent, setIntent] = useState<Intent>(initial),
    [question, setQuestion] = useState(""),
    [replies, setReplies] = useState<Reply[]>([]),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [hosted, setHosted] = useState(false),
    [useHosted, setUseHosted] = useState(false),
    [modelState, setModelState] = useState<
      "off" | "loading" | "ready" | "unavailable"
    >("off"),
    [progress, setProgress] = useState("");
  const engine = useRef<MLCEngineInterface | null>(null),
    alive = useRef(true),
    abort = useRef<AbortController | null>(null),
    end = useRef<HTMLDivElement>(null),
    job = useRef(0);
  useEffect(() => {
    alive.current = true;
    const controller = new AbortController();
    fetch("/api/ask", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (alive.current) setHosted(d.hosted === true);
      })
      .catch(() => {});
    if (!("gpu" in navigator)) setModelState("unavailable");
    return () => {
      alive.current = false;
      job.current++;
      controller.abort();
      abort.current?.abort();
      engine.current?.interruptGenerate();
      void engine.current?.unload();
    };
  }, []);
  useEffect(() => {
    if (replies.length)
      end.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "nearest",
      });
  }, [replies, busy]);
  async function loadModel() {
    const current = ++job.current;
    setModelState("loading");
    setProgress("Preparing a free model for this browser…");
    setError("");
    try {
      const { MLCEngine } = await import("@mlc-ai/web-llm");
      if (!alive.current || current !== job.current) return;
      const local = new MLCEngine({
        initProgressCallback: (p) => {
          if (alive.current && current === job.current) setProgress(p.text);
        },
      });
      engine.current = local;
      await local.reload("Qwen2.5-0.5B-Instruct-q4f32_1-MLC", {
        context_window_size: 4096,
      });
      if (alive.current && current === job.current) {
        setModelState("ready");
        setProgress("");
        setUseHosted(false);
      } else await local.unload();
    } catch {
      if (alive.current && current === job.current) {
        setModelState("unavailable");
        setError(
          "This browser could not load the AI model. You can still explore the source records below.",
        );
      }
    }
  }
  async function ask(value: string) {
    if (busy || !value.trim()) return;
    const query = value.trim().slice(0, 700);
    setQuestion("");
    setError("");
    setBusy(true);
    const current = ++job.current;
    const history: ChatTurn[] = replies.slice(-3).flatMap((r) => [
      { role: "user" as const, content: r.question },
      { role: "assistant" as const, content: r.answer },
    ]);
    const nodes = retrieve(query, intent, history);
    let result: Reply = {
      question: query,
      answer: evidenceAnswer(nodes),
      sources: nodes,
      mode: "evidence",
      notice: "From the curated portfolio record.",
    };
    const turnIndex = replies.length;
    setReplies((r) => [...r, result]);
    try {
      if (
        modelState === "ready" &&
        engine.current &&
        nodes.length &&
        !useHosted
      ) {
        const localSources = nodes.slice(0, 2);
        let deadline: ReturnType<typeof setTimeout> | undefined;
        const local = engine.current;
        const generation = (async () => {
          // WebLLM's streaming path resets its interrupt flag for each request.
          const stream = await local.chat.completions.create({
          stream: true,
          messages: [
            {
              role: "user",
              content: synthesisPrompt(query, intent, localSources, history),
            },
          ],
          temperature: 0.15,
          max_tokens: 180,
          response_format: {
            type: "json_object",
            schema: JSON.stringify({
              type: "object",
              properties: {
                answer: { type: "string" },
                sources: { type: "array", items: { type: "string", enum: localSources.map((n) => n.id) }, minItems: 1 },
              },
              required: ["answer", "sources"],
              additionalProperties: false,
            }),
          },
          });
          let content = "";
          for await (const chunk of stream) {
            content += chunk.choices[0]?.delta.content ?? "";
          }
          return content;
        })();
        const generated = await Promise.race([
          generation,
          new Promise<never>((_, reject) => {
            deadline = setTimeout(() => {
              void local.interruptGenerate();
              reject(new Error("Browser AI timed out"));
            }, 60000);
          }),
        ]).finally(() => clearTimeout(deadline));
        const parsed = parseSynthesis(
          generated,
          localSources,
        );
        if (parsed)
          result = {
            question: query,
            ...parsed,
            mode: "browser",
            notice: "Free browser AI · Check the cited sources.",
          };
        else
          result.notice =
            "The model could not produce a source-grounded answer. Showing the original record.";
      } else if (useHosted && hosted) {
        abort.current = new AbortController();
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            question: query,
            intent,
            history,
            useHosted: true,
          }),
          signal: abort.current.signal,
        });
        if (res.ok) result = { question: query, ...(await res.json()) };
        else result.notice = "AI request failed. Showing the source record.";
      }
    } catch {
      result.notice = "AI is unavailable. Showing the source record.";
    }
    if (alive.current && current === job.current) {
      setReplies((r) => r.map((reply, index) => index === turnIndex ? result : reply));
      setBusy(false);
    }
  }
  function stop() {
    job.current++;
    abort.current?.abort();
    engine.current?.interruptGenerate();
    setBusy(false);
    setError("Generation stopped. You can ask another question.");
  }
  return (
    <div className="conversation">
      <div className="conversation-toolbar">
        <div className="intent-tabs" aria-label="Portfolio focus">
          {(["complete", "ai", "content"] as const).map((v) => (
            <button
              key={v}
              aria-pressed={intent === v}
              onClick={() => setIntent(v)}
            >
              {v === "ai" ? "AI" : v === "content" ? "Content" : "Complete"}
            </button>
          ))}
        </div>
        <button
          className="clear-chat"
          disabled={busy || !replies.length}
          onClick={() => setReplies([])}
          aria-label="Clear conversation"
        >
          <Trash size={18} />
        </button>
      </div>
      <details className="ai-options">
        <summary>
          <Lightning size={16} />{" "}
          {modelState === "ready"
            ? "Browser AI ready"
            : useHosted
              ? "Hosted AI selected"
              : "Choose how to explore"}
        </summary>
        <div>
          <p>
            Source answers work instantly. Experimental free browser AI can turn those
            records into a conversational answer. It downloads a model of
            several hundred MB and needs WebGPU and sufficient device memory.
            Questions stay in this browser in local mode.
          </p>
          {modelState === "off" && (
            <button className="studio-button" onClick={loadModel}>
              Enable free browser AI <Lightning size={17} />
            </button>
          )}
          {modelState === "loading" && (
            <div>
              <p role="status">{progress}</p>
              <button
                className="studio-button"
                onClick={() => {
                  job.current++;
                  void engine.current?.unload();
                  engine.current = null;
                  setModelState("off");
                  setProgress("");
                }}
              >
                Cancel model download
              </button>
            </div>
          )}
          {modelState === "ready" && (
            <span className="source-note">
              Qwen 2.5 · Runs on this device · No API key
            </span>
          )}
          {modelState === "unavailable" && (
            <p>
              This browser cannot use local AI. Source answers are available.
            </p>
          )}
          {hosted && (
            <label className="hosted-choice">
              <input
                type="checkbox"
                checked={useHosted}
                onChange={(e) => setUseHosted(e.target.checked)}
              />{" "}
              Use hosted Gemini AI. Sends your questions and recent conversation
              to Google; avoid sensitive information.
            </label>
          )}
        </div>
      </details>
      <div
        className="conversation-messages"
        aria-live="polite"
        aria-busy={busy}
      >
        {!replies.length ? (
          <div className="conversation-welcome">
            <ChatCircle size={38} weight="thin" />
            <h2>What would you like to know?</h2>
            <p>
              Explore my work, understand a contribution,
              <br />
              or find the right evidence for your team.
            </p>
            <div className="question-suggestions">
              {(intent === "complete"
                ? evidencePrompts
                : verticals[intent].prompts
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => void ask(p)}
                  disabled={busy || modelState === "loading"}
                >
                  {p}
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          replies.map((r, i) => (
            <article className="conversation-turn" key={i}>
              <div className="user-question">{r.question}</div>
              <div className="assistant-answer">
                <span className="micro">
                  CHANDAN’S PORTFOLIO /{" "}
                  {r.mode === "browser"
                    ? "BROWSER AI"
                    : r.mode === "gemini"
                      ? "GEMINI AI"
                      : "SOURCE RECORD"}
                </span>
                <p>{r.answer}</p>
                <div className="source-cards">
                  {r.sources.map((n) => (
                    <details key={n.id}>
                      <summary>
                        {n.title}
                        <span>{n.strength}</span>
                      </summary>
                      <p>{n.answer}</p>
                      {n.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target={
                            l.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                        >
                          {l.label}
                          <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </details>
                  ))}
                </div>
                <small>{r.notice}</small>
              </div>
            </article>
          ))
        )}
        {busy && (
          <p className="thinking" role="status">
            Preparing an AI answer. You can read the source record now.
          </p>
        )}
        <div ref={end} />
      </div>
      {error && (
        <p className="ask-error" role="status">
          {error}
        </p>
      )}
      <form
        className="conversation-input"
        onSubmit={(e) => {
          e.preventDefault();
          void ask(question);
        }}
      >
        <label htmlFor="portfolio-question" className="sr-only">
          Ask about Chandan’s work
        </label>
        <input
          id="portfolio-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={700}
          placeholder="Ask about a project, a role, or a story…"
          disabled={modelState === "loading"}
        />
        {busy ? (
          <button type="button" onClick={stop} aria-label="Stop generation">
            <Stop weight="fill" size={18} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!question.trim() || modelState === "loading"}
            aria-label="Send question"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </form>
      <p className="conversation-footnote">
        Public portfolio context only. AI can make mistakes; open the sources.
        This session is not saved by the site.
      </p>
    </div>
  );
}
