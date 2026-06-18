import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0A0A0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "6px solid #C8922A",
          fontFamily: "serif",
          fontSize: 80,
          fontWeight: 700,
          color: "#F2EDE6",
          letterSpacing: "-2px",
        }}
      >
        TS
      </div>
    ),
    { ...size },
  );
}
