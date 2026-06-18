import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Thomas Scharli – Transport & Umzug Stuttgart";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0A0B",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 80,
            width: 60,
            height: 60,
            borderLeft: "3px solid #C8922A",
            borderTop: "3px solid #C8922A",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            width: 60,
            height: 60,
            borderRight: "3px solid #C8922A",
            borderBottom: "3px solid #C8922A",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(200,146,42,0.06) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <svg width="52" height="34" viewBox="0 0 220 140" fill="none">
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
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#F2EDE6" }}>
              Thomas Scharli
            </span>
            <span
              style={{ fontSize: 11, color: "#C8922A", letterSpacing: "0.2em" }}
            >
              TRANSPORT & UMZUG
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            color: "#F2EDE6",
            lineHeight: 1.0,
            marginBottom: 24,
          }}
        >
          <span>Wir bringen,</span>
          <span>was zählt.</span>
        </div>
        <div style={{ fontSize: 26, color: "#8A8A96", marginBottom: 40 }}>
          Vespa · Zweirad · Umzug · Netzmontagen — Region Stuttgart
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#C8922A",
              color: "#0A0A0B",
              padding: "12px 28px",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            0152 21331526
          </div>
          <div style={{ color: "#8A8A96", fontSize: 20 }}>
            · Kostenlos anfragen
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
