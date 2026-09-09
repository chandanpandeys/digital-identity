import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export async function portfolioPreview(
  title: string,
  label: string,
  detail: string,
) {
  const orbit = await readFile(
    path.join(process.cwd(), "public/media/studio-orbit.png"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#080a09",
          color: "#eff2e9",
          padding: 55,
          fontFamily: "sans-serif",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #34412a",
            paddingBottom: 23,
            fontSize: 19,
          }}
        >
          <span style={{ color: "#c4f66b" }}>cp. / CHANDAN PANDEY</span>
          <span>{label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 720,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 70,
                fontWeight: 600,
                letterSpacing: -4,
                lineHeight: 1.06,
                maxWidth: 720,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 23,
                lineHeight: 1.5,
                color: "#a5b299",
                marginTop: 25,
                maxWidth: 640,
              }}
            >
              {detail}
            </div>
          </div>
          <img
            src={"data:image/png;base64," + orbit.toString("base64")}
            width={470}
            height={470}
            alt=""
            style={{ position: "absolute", right: 5, top: 104 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #34412a",
            paddingTop: 18,
            fontSize: 16,
            color: "#c4f66b",
            justifyContent: "space-between",
          }}
        >
          <span>BUILD. RESEARCH. EXPLAIN.</span>
          <span>@chandanpandeys</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
