/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Menlo", "Monaco", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  safelist: [
    // 커스텀 팔레트 사용 시 동적 조립을 위한 패턴
    {
      pattern:
        /^(bg|text|border)-(primary|gray)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    // layout/spacing를 동적으로 조립하는 경우 대비
    { pattern: /^col-span-(1|2|3|4|5|6|7|8|9|10|11|12)$/ },
    { pattern: /^grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)$/ },
    { pattern: /^gap-(0|0\.5|1|1\.5|2|3|4|6|8|10|12)$/ },
    { pattern: /^(p|px|py|pt|pr|pb|pl)-(0|0\.5|1|1\.5|2|3|4|6|8|10|12)$/ },
    { pattern: /^(w|h)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)$/ },
    // 상태/반응형 접두사까지 보호 (필요 시)
    {
      pattern:
        /^(hover:|focus:|sm:|md:|lg:|xl:)?(bg|text|border)-(primary|gray)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
  ],
  plugins: [],
};
