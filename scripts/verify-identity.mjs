import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "app/robots.ts",
  "app/sitemap.ts",
  "app/llms.txt/route.ts",
  "app/profile.json/route.ts",
  "app/evidence.json/route.ts",
  "app/resume/pdf/[variant]/route.ts",
  "app/credentials/page.tsx",
  "lib/profile.ts",
  "lib/evidence.ts",
  "lib/resume-data.ts",
  "lib/credentials.ts",
];

const forbiddenIdentityStrings = [
  "chandanpandeys.me",
  "digital-identity-woad.vercel.app",
  "digital-identity-suia.vercel.app",
  "digital-identity-preview.vercel.app",
  "digital-identity-yvoad.vercel.app",
];

async function assertFile(relativePath) {
  try {
    await access(path.join(root, relativePath));
  } catch {
    throw new Error(`Required identity surface is missing: ${relativePath}`);
  }
}

async function collectFiles(entry) {
  const absolute = path.join(root, entry);
  let dirEntries;
  try {
    dirEntries = await readdir(absolute, { withFileTypes: true });
  } catch {
    return [entry];
  }

  const files = [];
  for (const dirEntry of dirEntries) {
    if (["node_modules", ".next", ".git"].includes(dirEntry.name)) continue;
    const relative = path.join(entry, dirEntry.name);
    if (dirEntry.isDirectory()) files.push(...await collectFiles(relative));
    else files.push(relative);
  }
  return files;
}

async function text(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

for (const requiredFile of requiredFiles) await assertFile(requiredFile);

const scanEntries = ["app", "lib", "components", "README.md", "next.config.ts", ".env.example", "vercel.json"];
const scanFiles = (await Promise.all(scanEntries.map(collectFiles))).flat();

for (const file of scanFiles) {
  const extension = path.extname(file);
  if (![".ts", ".tsx", ".js", ".mjs", ".css", ".md", ".json", ".txt", ""].includes(extension)) continue;
  let contents;
  try {
    contents = await text(file);
  } catch {
    continue;
  }
  for (const forbidden of forbiddenIdentityStrings) {
    if (contents.includes(forbidden)) {
      throw new Error(`Stale identity URL found in ${file}: ${forbidden}`);
    }
  }
}

const profile = await text("lib/profile.ts");
if (!profile.includes("NEXT_PUBLIC_SITE_URL")) throw new Error("Canonical URL is no longer environment-driven.");
if (!profile.includes("https://chandanpandey.dev")) throw new Error("Expected canonical fallback chandanpandey.dev is missing.");

const sitemap = await text("app/sitemap.ts");
for (const route of ["/work", "/lab", "/timeline", "/about", "/content", "/now", "/resume", "/credentials", "/ask"]) {
  if (!sitemap.includes(`\"${route}\"`)) throw new Error(`Sitemap is missing required route: ${route}`);
}

const machineProfile = await text("app/profile.json/route.ts");
for (const marker of ["schemaVersion: \"1.7\"", "targetedResumes", "selectedCredentials", "credentials:"]) {
  if (!machineProfile.includes(marker)) throw new Error(`profile.json contract is missing marker: ${marker}`);
}

const llms = await text("app/llms.txt/route.ts");
for (const marker of ["## Targeted resume PDFs", "## Selected credentials", "## Evidence policy"]) {
  if (!llms.includes(marker)) throw new Error(`llms.txt contract is missing section: ${marker}`);
}

const resumeRoute = await text("app/resume/pdf/[variant]/route.ts");
if (!resumeRoute.includes("x-robots-tag")) throw new Error("Generated resume PDFs must keep their noindex response header.");

const projectPage = await text("app/work/[slug]/page.tsx");
if (!projectPage.includes("SoftwareSourceCode")) throw new Error("Project-level SoftwareSourceCode JSON-LD is missing.");

console.log(`Identity verification passed: ${requiredFiles.length} required surfaces, ${scanFiles.length} files scanned.`);
