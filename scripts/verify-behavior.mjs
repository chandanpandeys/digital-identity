import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const output = await mkdtemp(path.join(tmpdir(), "portfolio-behavior-"));
await writeFile(
  path.join(output, "package.json"),
  JSON.stringify({ type: "commonjs" }),
);
for (const name of [
  "ask",
  "evidence",
  "projects",
  "profile",
  "credentials",
  "springboard",
  "resume-data",
]) {
  const source = await readFile(
    path.join(process.cwd(), "lib", name + ".ts"),
    "utf8",
  );
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  await writeFile(path.join(output, name + ".js"), compiled);
}
const require = createRequire(import.meta.url);
const { retrieve, evidenceAnswer, parseSynthesis, synthesisPrompt } = require(
  path.join(output, "ask.js"),
);
const { isResumeVariant } = require(path.join(output, "resume-data.js"));

test("unrelated questions do not return invented fallback projects", () => {
  assert.deepEqual(retrieve("What is the weather in Antarctica?", "ai"), []);
  assert.match(evidenceAnswer([]), /don’t have a sourced answer/);
});
test("specific research ownership is surfaced ahead of general AI work", () => {
  const nodes = retrieve("Did he own EpitopePred?", "ai");
  assert.equal(nodes[0].id, "epitopepred");
  assert.match(nodes[0].answer, /do not own EpitopePred/);
  assert.equal(nodes[0].strength, "FIRST-PARTY");
});
test("current project and old name resolve to the same public record", () => {
  assert.equal(retrieve("Tell me about InferBench")[0].id, "benchwolf");
  assert.equal(retrieve("What is OfferClaw?")[0].id, "offerclaw");
  assert.equal(retrieve("Portable AI Memory")[0].id, "portable-ai-memory");
  assert.deepEqual(retrieve("Describe OfferClaw in one sentence.").map((n) => n.id), ["offerclaw"]);
});
test("content and credentials have direct evidence", () => {
  assert.equal(
    retrieve("Tell me about Notansun teaching", "content")[0].id,
    "notansun",
  );
  const certificates = retrieve("Show certifications")[0];
  assert.equal(certificates.id, "credentials");
  assert.equal(
    certificates.links.filter((l) =>
      l.href.startsWith("https://drive.google.com"),
    ).length,
    6,
  );
});

test("learning and ambassador records retain their evidence boundaries", () => {
  const infosys = retrieve("Infosys Springboard certificates")[0];
  assert.equal(infosys.id, "infosys-learning");
  assert.match(infosys.answer, /19 certificate-issued notifications/);
  assert.match(infosys.answer, /do not establish completion of an Infosys internship/);
  const ambassador = retrieve("Google campus ambassador")[0];
  assert.equal(ambassador.id, "ambassador-credentials");
  assert.match(ambassador.answer, /team's Rank 153/);
  assert.match(ambassador.answer, /participation certificate/);
});
test("follow-up question keeps its previous topic", () => {
  const nodes = retrieve("Tell me more", "content", [
    { role: "user", content: "What did Notansun teach?" },
  ]);
  assert.equal(nodes[0].id, "notansun");
});
test("unknown citations, fabricated figures and arbitrary links are rejected", () => {
  const nodes = retrieve("What is OfferClaw?");
  assert.equal(parseSynthesis(JSON.stringify({ answer: "OfferClaw", sources: ["offerclaw"] }), nodes), null);
  assert.equal(
    parseSynthesis(
      JSON.stringify({
        answer: "Chandan has 90000 customers.",
        sources: ["offerclaw"],
      }),
      nodes,
    ),
    null,
  );
  assert.equal(
    parseSynthesis(
      JSON.stringify({ answer: "It is a career agent.", sources: ["made-up"] }),
      nodes,
    ),
    null,
  );
  assert.equal(
    parseSynthesis(
      JSON.stringify({
        answer: "Visit https://attacker.example for the result.",
        sources: ["offerclaw"],
      }),
      nodes,
    ),
    null,
  );
  const accepted = parseSynthesis(
    JSON.stringify({
      answer:
        "OfferClaw is an experimental career workspace with candidate context and supervised application preparation.",
      sources: ["offerclaw"],
    }),
    nodes,
  );
  assert.equal(accepted.sources[0].id, "offerclaw");
});
test("public model context excludes private source paths and bounds history", () => {
  const prompt = synthesisPrompt(
    "Explain ByteToken",
    "ai",
    retrieve("ByteToken"),
    [{ role: "user", content: "a".repeat(10000) }],
  );
  assert.ok(prompt.length < 6500);
  assert.doesNotMatch(prompt, /C:\\Users|conversation_id|student_email/);
});
test("PDF selector rejects inherited object keys", () => {
  for (const invalid of ["toString", "constructor", "__proto__", "unknown"])
    assert.equal(isResumeVariant(invalid), false);
  assert.equal(isResumeVariant("ai-llm-engineer"), true);
});
