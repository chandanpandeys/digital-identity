import {
  evidenceAnswer,
  retrieve,
  synthesisPrompt,
  parseSynthesis,
  type ChatTurn,
} from "@/lib/ask";
import { parseIntent } from "@/lib/verticals";
export const runtime = "nodejs";
const noStore = {
  "cache-control": "no-store",
  "x-robots-tag": "noindex, noarchive",
};
const requests = new Map<string, { count: number; until: number }>();
export function GET() {
  return Response.json(
    {
      hosted: Boolean(process.env.GEMINI_API_KEY),
      browserModel: "Qwen2.5-0.5B-Instruct-q4f32_1-MLC",
      corpus: "Curated public portfolio only",
    },
    { headers: noStore },
  );
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { error: "Origin not allowed" },
      { status: 403, headers: noStore },
    );
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw Error();
    let text = "",
      size = 0;
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) {
        await reader.cancel();
        return Response.json(
          { error: "Message too large" },
          { status: 413, headers: noStore },
        );
      }
      text += decoder.decode(value, { stream: true });
    }
    body = JSON.parse(text + decoder.decode());
  } catch {
    return Response.json(
      { error: "Invalid request" },
      { status: 400, headers: noStore },
    );
  }
  if (!body || typeof body !== "object")
    return Response.json(
      { error: "Invalid request" },
      { status: 400, headers: noStore },
    );
  const b = body as Record<string, unknown>;
  if (
    typeof b.question !== "string" ||
    !b.question.trim() ||
    b.question.length > 700
  )
    return Response.json(
      { error: "Use a question between 1 and 700 characters." },
      { status: 400, headers: noStore },
    );
  const history: ChatTurn[] = Array.isArray(b.history)
    ? b.history
        .slice(-6)
        .filter(
          (t): t is ChatTurn =>
            Boolean(t) &&
            typeof t === "object" &&
            (t.role === "user" || t.role === "assistant") &&
            typeof t.content === "string" &&
            t.content.length <= 2200,
        )
    : [];
  const intent = parseIntent(b.intent),
    nodes = retrieve(b.question, intent, history);
  const fallback = {
    answer: evidenceAnswer(nodes),
    sources: nodes,
    mode: "evidence",
    notice: "From the curated portfolio record.",
  };
  if (!nodes.length || !process.env.GEMINI_API_KEY || b.useHosted !== true)
    return Response.json(fallback, { headers: noStore });
  const now = Date.now();
  for (const [key, v] of requests) if (v.until < now) requests.delete(key);
  const key =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "local";
  const limit = requests.get(key) ?? { count: 0, until: now + 3600000 };
  limit.count++;
  requests.set(key, limit);
  if (limit.count > 20 || requests.size > 5000)
    return Response.json(
      {
        ...fallback,
        notice: "AI request limit reached. Here is the source record.",
      },
      { headers: noStore },
    );
  try {
    const model = (process.env.GEMINI_MODEL ?? "gemini-3.7-flash").replace(
      /[^a-zA-Z0-9._-]/g,
      "",
    );
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" +
        model +
        ":generateContent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: synthesisPrompt(b.question, intent, nodes, history) },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.15,
            maxOutputTokens: 600,
            responseMimeType: "application/json",
          },
        }),
        signal: AbortSignal.timeout(18000),
      },
    );
    if (response.ok) {
      const data = await response.json();
      const raw =
        data.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text ?? "")
          .join("") ?? "";
      const answer = parseSynthesis(raw, nodes);
      if (answer)
        return Response.json(
          {
            ...answer,
            mode: "gemini",
            notice: "AI synthesis · Check the cited sources.",
          },
          { headers: noStore },
        );
    }
  } catch {}
  return Response.json(
    {
      ...fallback,
      notice: "AI synthesis is unavailable. Here is the source record.",
    },
    { headers: noStore },
  );
}
