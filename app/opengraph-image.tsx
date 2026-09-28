import { ImageResponse } from "next/og";

import { visualTokens } from "@/lib/visual-tokens";

export const alt = "Siddhartha — Designer & Creative Developer";
export const contentType = "image/png";
export const runtime = "edge";
export const size = { height: 630, width: 1200 };

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: visualTokens.background,
          color: visualTokens.foreground,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: visualTokens.accent, display: "flex", fontSize: 22, letterSpacing: 5 }}>
          SIDDHARTHA /
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 700, letterSpacing: -6, lineHeight: 0.92 }}>
          <span>DESIGN SYSTEMS</span>
          <span style={{ color: visualTokens.accent }}>IN MOTION</span>
        </div>
        <div style={{ color: visualTokens.muted, display: "flex", fontSize: 24 }}>
          Product-minded visual designer & creative front-end builder
        </div>
      </div>
    ),
    size,
  );
}
