import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors using direct color values instead of CSS variables
        background: "#0a0a0a", // Dark mode default
        foreground: "#ededed", // Dark mode default
        light: {
          background: "#ffffff",
          foreground: "#171717",
        },
        
        // Brand colors
        primary: {
          DEFAULT: "#8b5cf6", // var(--primary)
          light: "#a78bfa",   // var(--primary-light)
          dark: "#7c3aed",    // var(--primary-dark)
        },
        secondary: {
          DEFAULT: "#3b82f6", // var(--secondary)
          light: "#60a5fa",   // var(--secondary-light)
          dark: "#2563eb",    // var(--secondary-dark)
        },
        
        // UI colors
        accent: "#f87171",    // var(--accent)
        success: "#34d399",   // var(--success)
        warning: "#fbbf24",   // var(--warning)
        error: "#f87171",     // var(--error)
        
        // Neutral colors (explicitly defined for consistency)
        gray: {
          50: "#111827",
          100: "#1f2937",
          200: "#374151",
          300: "#4b5563",
          400: "#6b7280",
          500: "#9ca3af",
          600: "#d1d5db",
          700: "#e5e7eb",
          800: "#f3f4f6",
          900: "#f9fafb",
          950: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        "space-grotesk": ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
        "gradient-dark": "linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%)",
        "gradient-glow": "linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(59, 130, 246, 0.5) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)" },
          "100%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.5)" },
        },
      },
      boxShadow: {
        glow: "0 0 10px rgba(139, 92, 246, 0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
