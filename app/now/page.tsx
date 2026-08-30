import type { Metadata } from "next";
import Link from "next/link";
import { now } from "@/lib/profile";

export const metadata: Metadata = { title: "Now", description: "What Chandan Pandey is focused on now.", alternates: { canonical: "/now" } };

export default function NowPage() {
  return <main id="main" className="inner-page"><header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>NOW / AUGUST 2026</span></header><section className="site-shell page-hero"><p className="eyebrow">NOW</p><h1>Current attention<br/><em>is a finite resource.</em></h1><p>A deliberately small list of what I am actively building, learning, and trying to make public.</p></section><section className="site-shell now-list">{now.map((item,index)=><article key={item}><span>0{index+1}</span><h2>{item}</h2></article>)}</section><section className="site-shell prose-grid"><aside>WHY THIS PAGE EXISTS</aside><div className="prose"><p>Resumes describe the past. A /now page exposes the direction of travel. This page will change as projects move from private experiments to public work.</p></div></section></main>;
}
