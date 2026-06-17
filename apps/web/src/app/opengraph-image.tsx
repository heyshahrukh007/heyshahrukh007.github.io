import { ImageResponse } from "next/og";

import { hero, site } from "@/lib/site";

export const dynamic = "force-static";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#a3a3a3",
            marginBottom: 40,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#d4d4d4",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {hero.summary}
        </div>
      </div>
    ),
    { ...size },
  );
}
