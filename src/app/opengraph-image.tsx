import { ImageResponse } from "next/og";

export const alt = "Fides Tailor — Rumah Adibusana Bespoke Lamongan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0f0e0d 0%, #1c1917 60%, #30200f 100%)",
          color: "#faf9f6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#c9a451", textTransform: "uppercase" }}>
          Bespoke Atelier Lamongan · Est. 1996
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, letterSpacing: 24 }}>FIDES TAILOR</div>
          <div style={{ fontSize: 40, fontStyle: "italic", color: "#d6bf7b", marginTop: 12 }}>
            Gaun · Kebaya · Jas · Payet Handmade
          </div>
        </div>
        <div style={{ display: "flex", width: 160, height: 2, background: "#c9a451" }} />
      </div>
    ),
    size
  );
}
