import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Fides Tailor Lamongan — Your style, our hands.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/logo-full.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 90px",
          background: "linear-gradient(135deg, #0f0e0d 0%, #1c1917 60%, #30200f 100%)",
          color: "#faf9f6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "#c9a451", textTransform: "uppercase" }}>
            Penjahit Lamongan · Sejak 1996
          </div>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, marginTop: 28 }}>
            Your style, our hands.
          </div>
          <div style={{ display: "flex", fontSize: 28, fontStyle: "italic", color: "#d6bf7b", marginTop: 28 }}>
            Jahit · Permak · Payet · Sewa Kebaya
          </div>
        </div>
        <img src={logoSrc} width={330} height={346} alt="" />
      </div>
    ),
    size
  );
}
