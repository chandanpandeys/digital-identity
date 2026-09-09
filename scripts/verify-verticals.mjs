import assert from "node:assert/strict";

// Run against `npm start` after a production build.
const origin = process.env.TEST_ORIGIN ?? "http://localhost:3000";
async function get(route) {
  const response = await fetch(`${origin}${route}`);
  assert.equal(response.status, 200, route);
  return response;
}
for (const [vertical, title, resume] of [
  ["ai", "AI Engineering &amp; Research", "ai-llm-engineer"],
  [
    "content",
    "AI Content &amp; Technical Communication",
    "ai-content-developer-educator",
  ],
]) {
  const html = await (await get(`/${vertical}`)).text();
  assert.ok(html.includes(title), `${vertical}: title`);
  assert.match(html, new RegExp(`rel="canonical" href="[^"]+/${vertical}"`));
  assert.ok(
    html.includes(`/resume?view=${resume}`),
    `${vertical}: targeted web resume`,
  );
  assert.ok(
    html.includes(`/ask?intent=${vertical}`),
    `${vertical}: Ask intent`,
  );
  assert.ok(
    html.includes(`/${vertical}/opengraph-image`),
    `${vertical}: preview metadata`,
  );
  const image = await get(`/${vertical}/opengraph-image`);
  assert.match(image.headers.get("content-type"), /image\/png/);
  assert.ok((await image.arrayBuffer()).byteLength > 1000);
  if (vertical === "content") {
    assert.ok(
      html.indexOf("CURRENT ROLE / YAAS") < html.indexOf('id="teaching"'),
      "Professional content precedes creator history",
    );
    assert.ok(html.includes("instagram.com/p/"), "Real Instagram embeds");
    assert.ok(
      html.includes("linkedin.com/in/chandanpandeys"),
      "LinkedIn visible",
    );
    assert.ok(html.includes("Ijzjrb2UIXE"), "Original YouTube video");
  }
}
for (const variant of [
  "ai-llm-engineer",
  "ai-research-ml",
  "ai-content-developer-educator",
]) {
  const pdf = await get(`/resume/pdf/${variant}`);
  assert.match(pdf.headers.get("content-type"), /application\/pdf/);
  assert.match(pdf.headers.get("x-robots-tag"), /noindex/);
  assert.equal(
    Buffer.from(await pdf.arrayBuffer())
      .subarray(0, 4)
      .toString(),
    "%PDF",
  );
}
for (const [intent, expected] of [
  ["ai", "What AI infrastructure has Chandan built?"],
  [
    "content",
    "What AI content and technical communication experience does Chandan have?",
  ],
  ["invalid", "What AI systems has Chandan built?"],
  ["", "What AI systems has Chandan built?"],
]) {
  const html = await (
    await get(`/ask${intent ? `?intent=${intent}` : ""}`)
  ).text();
  assert.ok(
    html.includes(expected),
    `Ask audience suggestions: ${intent || "default"}`,
  );
}
const home = await (await get("/")).text();
for (const route of ["ai", "content", "about"])
  assert.ok(home.includes(`href="/${route}"`));
const sitemap = await (await get("/sitemap.xml")).text();
assert.ok(sitemap.includes("/ai</loc>"));
const profile = await (await get("/profile.json")).json();
assert.equal(profile.verticals.ai.route, "/ai");
assert.equal(profile.verticals.content.route, "/content");
console.log(
  "Vertical smoke checks passed: routes, metadata, PNG previews, PDFs, Ask intents and shared identity.",
);

async function ask(body, headers = {}) {
  return fetch(`${origin}/api/ask`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}
const reply = await ask({
  question: "Did Chandan own EpitopePred?",
  intent: "ai",
});
assert.equal(reply.status, 200);
assert.match(reply.headers.get("cache-control"), /no-store/);
const answer = await reply.json();
assert.equal(answer.mode, "evidence");
assert.match(answer.answer, /contribut/i);
assert.ok(answer.sources.some((s) => s.strength === "FIRST-PARTY"));
assert.equal((await ask({ question: "" })).status, 400);
assert.equal((await ask({ question: "x".repeat(701) })).status, 400);
assert.equal((await ask({ question: "x".repeat(12001) })).status, 413);
assert.equal(
  (
    await ask(
      { question: "Projects?" },
      { origin: "https://unrelated.example" },
    )
  ).status,
  403,
);
const unknown = await (
  await ask({ question: "What is his favourite ice cream?" })
).json();
assert.equal(unknown.sources.length, 0);
for (const invalid of ["constructor", "toString", "missing"]) {
  assert.equal((await fetch(`${origin}/resume/pdf/${invalid}`)).status, 404);
}
const redirect = await fetch(`${origin}/work/inferbench`, {
  redirect: "manual",
});
assert.equal(redirect.status, 308);
assert.ok(redirect.headers.get("location").endsWith("/work/benchwolf"));
const credentials = await (await get("/credentials")).text();
assert.ok(credentials.includes("1Mzxutr9v5h61cI76UX-AARhSDdry-_iY"));
assert.ok(credentials.includes("1V2ZLrNg2fnQOh4pz3qqgk77L3q3htHg3"));
const research = await (await get("/work/epitopepred")).text();
assert.ok(research.includes('"contributor":'));
const social = await (await get("/api/social/youtube")).json();
assert.ok(["snapshot", "api"].includes(social.mode));
assert.ok(Number.isSafeInteger(social.subscribers));
assert.ok(Number.isSafeInteger(social.videos));
console.log(
  "API and evidence checks passed: contribution, bounds, unknowns, originals, redirects and social data.",
);
