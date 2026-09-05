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
  ["content", "AI Content &amp; Technical Communication", "ai-content-developer-educator"],
]) {
  const html = await (await get(`/${vertical}`)).text();
  assert.ok(html.includes(title), `${vertical}: title`);
  assert.match(html, new RegExp(`rel="canonical" href="[^"]+/${vertical}"`));
  assert.ok(html.includes(`/resume/pdf/${resume}`), `${vertical}: targeted resume`);
  assert.ok(html.includes(`/ask?intent=${vertical}`), `${vertical}: Ask intent`);
  assert.ok(html.includes(`/${vertical}/opengraph-image`), `${vertical}: preview metadata`);
  const image = await get(`/${vertical}/opengraph-image`);
  assert.match(image.headers.get("content-type"), /image\/png/);
  assert.ok((await image.arrayBuffer()).byteLength > 1000);
  if (vertical === "content") assert.ok(html.indexOf("PROFESSIONAL CONTENT EXPERIENCE") < html.indexOf('id="creator-history"'));
}
for (const variant of ["ai-llm-engineer", "ai-research-ml", "ai-content-developer-educator"]) {
  const pdf = await get(`/resume/pdf/${variant}`);
  assert.match(pdf.headers.get("content-type"), /application\/pdf/);
  assert.match(pdf.headers.get("x-robots-tag"), /noindex/);
  assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 4).toString(), "%PDF");
}
for (const [intent, expected] of [["ai", "What AI infrastructure has Chandan built?"], ["content", "What AI content and technical communication experience does Chandan have?"], ["invalid", "What is publicly inspectable?"], ["", "What is publicly inspectable?"]]) {
  const html = await (await get(`/ask${intent ? `?intent=${intent}` : ""}`)).text();
  assert.ok(html.includes(expected), `Ask initial query: ${intent || "default"}`);
}
const home = await (await get("/")).text();
for (const route of ["ai", "content", "about"]) assert.ok(home.includes(`href="/${route}"`));
const sitemap = await (await get("/sitemap.xml")).text();
assert.ok(sitemap.includes("/ai</loc>"));
const profile = await (await get("/profile.json")).json();
assert.equal(profile.verticals.ai.route, "/ai");
assert.equal(profile.verticals.content.route, "/content");
console.log("Vertical smoke checks passed: routes, metadata, PNG previews, PDFs, Ask intents and shared identity.");
