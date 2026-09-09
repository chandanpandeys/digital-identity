import { socialSnapshot } from "@/lib/social";
export const revalidate = 3600;
export async function GET() {
  const fallback = {
    subscribers: socialSnapshot.youtube.subscribers,
    videos: socialSnapshot.youtube.videos,
    asOf: socialSnapshot.asOf,
    mode: "snapshot",
  };
  if (process.env.YOUTUBE_API_KEY)
    try {
      const params = new URLSearchParams({
        part: "statistics",
        id: socialSnapshot.youtube.channelId,
        key: process.env.YOUTUBE_API_KEY,
      });
      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?" + params,
        { next: { revalidate: 3600 }, signal: AbortSignal.timeout(6000) },
      );
      if (res.ok) {
        const body = await res.json();
        const s = body.items?.[0]?.statistics;
        const subscribers = Number(s?.subscriberCount),
          videos = Number(s?.videoCount);
        if (
          !s?.hiddenSubscriberCount &&
          Number.isSafeInteger(subscribers) &&
          subscribers >= 0 &&
          Number.isSafeInteger(videos) &&
          videos >= 0
        )
          return Response.json(
            {
              subscribers,
              videos,
              asOf: new Date().toISOString(),
              mode: "api",
            },
            {
              headers: {
                "cache-control": "public, s-maxage=3600",
                "x-robots-tag": "noindex",
              },
            },
          );
      }
    } catch {}
  return Response.json(fallback, {
    headers: {
      "cache-control": "public, s-maxage=3600",
      "x-robots-tag": "noindex",
    },
  });
}
