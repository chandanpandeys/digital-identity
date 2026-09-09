"use client";
import { useEffect, useState } from "react";
import { socialSnapshot } from "@/lib/social";
export default function ChannelStats() {
  const [stats, setStats] = useState({
    subscribers: Number(socialSnapshot.youtube.subscribers),
    videos: Number(socialSnapshot.youtube.videos),
    asOf: String(socialSnapshot.asOf),
    mode: "snapshot",
  });
  useEffect(() => {
    const abort = new AbortController();
    fetch("/api/social/youtube", { signal: abort.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (
          s &&
          Number.isSafeInteger(s.subscribers) &&
          Number.isSafeInteger(s.videos) &&
          typeof s.asOf === "string"
        )
          setStats(s);
      })
      .catch(() => {});
    return () => abort.abort();
  }, []);
  return (
    <>
      <strong className="channel-count">
        {stats.subscribers.toLocaleString("en-IN")}
        <small>subscribers · {stats.videos} videos</small>
      </strong>
      <span className="micro">
        {stats.mode === "api" ? "YOUTUBE API" : "PUBLIC SNAPSHOT"} ·{" "}
        {stats.asOf.slice(0, 10)}
      </span>
    </>
  );
}
