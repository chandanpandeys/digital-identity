import { ImageResponse } from "next/og";

export const alt = "Chandan Pandey — AI Engineer, Researcher & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f3efe6", color: "#141411", padding: "54px 64px", fontFamily: "Arial, Helvetica, sans-serif", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #141411", paddingBottom: "22px", fontSize: 18, letterSpacing: 2 }}>
          <strong>CP/ID</strong><span>CHANDANPANDEYS.ME · IDENTITY GRAPH</span>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
            <span style={{ fontSize: 18, letterSpacing: 3, color: "#575750", marginBottom: 26 }}>AI ENGINEERING · APPLIED RESEARCH · OPEN SOURCE</span>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: .92, letterSpacing: -5, fontWeight: 700 }}><span>Chandan</span><span>Pandey</span></div>
            <div style={{ display: "flex", fontSize: 30, marginTop: 30, color: "#3d3d38" }}>I turn AI research into systems that ship.</div>
          </div>
          <div style={{ width: 250, height: 250, border: "2px solid #141411", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: "#2557ff", color: "white" }}>
            <div style={{ width: 126, height: 126, border: "2px solid white", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, fontWeight: 700 }}>CP</div>
            <span style={{ position: "absolute", top: -25, left: 82, background: "#f3efe6", color: "#141411", padding: "5px 9px", fontSize: 14 }}>BUILD</span>
            <span style={{ position: "absolute", right: -58, top: 112, background: "#f3efe6", color: "#141411", padding: "5px 9px", fontSize: 14 }}>RESEARCH</span>
            <span style={{ position: "absolute", bottom: -25, left: 70, background: "#f3efe6", color: "#141411", padding: "5px 9px", fontSize: 14 }}>EXPLAIN</span>
            <span style={{ position: "absolute", left: -42, top: 112, background: "#f3efe6", color: "#141411", padding: "5px 9px", fontSize: 14 }}>OSS</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #8c887f", paddingTop: 18, fontSize: 16, color: "#575750" }}>
          <span>AI SYSTEMS / COMPUTATIONAL BIOLOGY / DEVELOPER TOOLS</span><span>@chandanpandeys</span>
        </div>
      </div>
    ),
    size,
  );
}
