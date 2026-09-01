import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f1e8",
          color: "#10110f",
          border: "24px solid #10110f",
          fontFamily: "monospace",
          fontSize: 138,
          fontWeight: 800,
          letterSpacing: "-0.09em",
        }}
      >
        <span>CP</span>
        <span style={{ color: "#2457ff", margin: "0 14px" }}>/</span>
        <span>ID</span>
      </div>
    ),
    size,
  );
}
