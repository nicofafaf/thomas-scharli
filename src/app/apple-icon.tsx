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
          border: "8px solid #C8922A",
        }}
      >
        <svg width="130" height="84" viewBox="0 0 220 140" fill="none">
          <rect x="0" y="24" width="55" height="14" rx="3" fill="#C8922A" />
          <rect x="0" y="46" width="40" height="14" rx="3" fill="#C8922A" />
          <rect x="0" y="68" width="28" height="14" rx="3" fill="#C8922A" />
          <rect x="63" y="14" width="66" height="14" rx="3" fill="#F2EDE6" />
          <rect x="87" y="14" width="14" height="98" rx="3" fill="#F2EDE6" />
          <rect x="63" y="98" width="66" height="14" rx="3" fill="#F2EDE6" />
          <rect x="141" y="14" width="13" height="112" rx="3" fill="#F2EDE6" />
          <path
            d="M161 14 H205 Q219 14 219 28 V50 Q219 64 205 64 H173 Q161 64 161 76 V96 Q161 112 175 112 H219"
            stroke="#F2EDE6"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
