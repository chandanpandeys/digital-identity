import { buildResumePdf } from "@/lib/resume-pdf";
import { isResumeVariant, resumeData } from "@/lib/resume-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!isResumeVariant(variant)) {
    return new Response("Resume variant not found", { status: 404 });
  }

  const data = resumeData[variant];
  const bytes = await buildResumePdf(data);

  return new Response(Buffer.from(bytes), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${data.filename}"`,
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, noarchive",
    },
  });
}
