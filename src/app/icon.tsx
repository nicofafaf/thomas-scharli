import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0A0A0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px solid #C8922A",
          fontFamily: "serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#F2EDE6",
          letterSpacing: "-0.5px",
        }}
      >
        TS
      </div>
    ),
    { ...size },
  );
}
