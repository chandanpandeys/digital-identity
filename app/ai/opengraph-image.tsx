import { ImageResponse } from "next/og";
export const alt = "Chandan Pandey — AI Engineering & Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
 return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#f3efe6", color: "#141411", fontFamily: "sans-serif" }}>
   <div style={{ display: "flex", fontSize: 24 }}>CP/ID · CHANDAN PANDEY</div>
   <div style={{ display: "flex", fontSize: 66, lineHeight: 1.1, color: "#2457ff" }}>AI Engineering & Research</div>
   <div style={{ display: "flex", fontSize: 27 }}>LLM infrastructure / evaluation / applied AI</div>
   <div style={{ display: "flex", fontSize: 22 }}>One identity. Evidence you can inspect. /ai</div>
 </div>, size);
}
