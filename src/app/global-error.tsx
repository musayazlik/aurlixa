"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B150E",
          color: "#F8F4EC",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p
            style={{
              letterSpacing: "0.4em",
              fontSize: 11,
              color: "#D4B678",
              textTransform: "uppercase",
              margin: "0 0 20px",
            }}
          >
            Aurlixa
          </p>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 500,
              margin: "0 0 14px",
            }}
          >
            Bir sorun oluştu
          </h1>
          <p
            style={{
              color: "rgba(248,244,236,0.6)",
              fontSize: 15,
              lineHeight: 1.6,
              margin: "0 auto 28px",
              maxWidth: 420,
            }}
          >
            Beklenmeyen bir hata gerçekleşti. Lütfen sayfayı tekrar yüklemeyi
            deneyin.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#B08D57",
              color: "#1B150E",
              border: "none",
              padding: "14px 34px",
              letterSpacing: "0.22em",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}
