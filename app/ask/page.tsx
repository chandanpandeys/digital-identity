import type { Metadata } from "next";
import { parseIntent } from "@/lib/verticals";
import AskChandan from "@/components/AskChandan";
import { StudioFooter } from "@/components/Studio";
export const metadata: Metadata = {
  title: "Ask Chandan — projects, research & content",
  description:
    "Explore Chandan Pandey’s portfolio in conversation, with source-linked answers and optional free browser AI.",
  alternates: { canonical: "/ask" },
};
export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string | string[] }>;
}) {
  const intent = parseIntent((await searchParams).intent);
  return (
    <main id="main">
      <section className="studio-shell ask-studio-heading">
        <p className="micro">AN INTERACTIVE WAY INTO THE WORK</p>
        <h1>
          Ask Chandan<span>.</span>
        </h1>
        <p>The projects. The decisions. The person behind them.</p>
      </section>
      <section className="studio-shell">
        <AskChandan key={intent} intent={intent} />
      </section>
      <StudioFooter />
    </main>
  );
}
