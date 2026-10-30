import { ImageResponse } from "next/og";

export const alt = "Ascension Health, Medical Center in Fernley, NV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b3d4f 0%, #0f5366 45%, #1a7891 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#9fe2f0",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#9fe2f0",
            }}
          />
          Ascension Health
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Medical Center in Fernley, NV
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "#d6ecf2",
              maxWidth: 920,
            }}
          >
            Chiropractic care, regenerative medicine and wellness services, 
            accepting new appointments.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#cfe6ec",
          }}
        >
          <div>ascensionhealthnv.com</div>
          <div>(775) 575-9922</div>
        </div>
      </div>
    ),
    size
  );
}
