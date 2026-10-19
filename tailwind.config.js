/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,json}",
    "./public/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          header: "var(--color-header-bg)",
          headerEnd: "var(--color-header-gradient-end)",
          topStrip: "var(--color-top-strip-bg)",
          bodyBg: "var(--color-body-bg)",
          surface: "var(--color-surface-bg)",
          surfaceMuted: "var(--color-surface-muted)",
          border: "var(--color-border-default)",
          borderSubtle: "var(--color-border-subtle)",
          textPrimary: "var(--color-text-primary)",
          textSecondary: "var(--color-text-secondary)",
          textMuted: "var(--color-text-muted)",
        },
        kumbhdoot: {
          cta: "var(--color-kumbhdoot-cta)",
          ctaHover: "var(--color-kumbhdoot-cta-hover)",
          ctaActive: "var(--color-kumbhdoot-cta-active)",
        },
        sacred: {
          saffron: "#C2410C",
          saffronLight: "#FFEDD5",
          maroon: "#781C2E",
          maroonLight: "#FFE4E8",
          gangaTeal: "#0E7490",
          gangaTealLight: "#E0F2FE",
          tirangaGreen: "#15803D"
        }
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', '"Mukta"', '"Mangal"', '"Nirmala UI"', '"Arial Unicode MS"', '"Noto Sans"', 'sans-serif'],
        sans: ['"Noto Sans Devanagari"', '"Mukta"', '"Mangal"', '"Nirmala UI"', '"Arial Unicode MS"', '"Noto Sans"', 'sans-serif'],
        poppins: ["'Poppins'", 'sans-serif'],
      },
      minHeight: {
        tap: "48px"
      },
      minWidth: {
        tap: "48px"
      },
      gridTemplateColumns: {
        '7': 'repeat(7, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
}
