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
          background: "#080a09",
          color: "#eff2e9",
          border: "24px solid #263020",
          fontFamily: "monospace",
          fontSize: 138,
          fontWeight: 800,
          letterSpacing: "-0.09em",
        }}
      >
        <span>CP</span>
        <span style={{ color: "#c4f66b", margin: "0 14px" }}>/</span>
        <span>ID</span>
      </div>
    ),
    size,
  );
}
