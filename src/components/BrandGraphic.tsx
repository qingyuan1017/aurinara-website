import { motion } from "framer-motion";

type BrandGraphicProps = {
  className?: string;
};

/**
 * Decorative, on-brand SVG that reuses the logo's motifs:
 * a rising data line with nodes (analytics), a sun (gold), and a leaf (sage).
 * Strokes draw themselves in; nodes pop; the sun breathes gently on loop.
 */
export default function BrandGraphic({ className }: BrandGraphicProps) {
  const linePoints = [
    { x: 40, y: 210 },
    { x: 95, y: 176 },
    { x: 150, y: 150 },
    { x: 205, y: 110 },
    { x: 250, y: 70 },
  ];

  const linePath = linePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 300 260"
      fill="none"
      className={className}
      role="img"
      aria-label="Aurinara analytics motif"
    >
      {/* sun */}
      <motion.circle
        cx="228"
        cy="86"
        r="34"
        fill="#e8c477"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "backOut" }}
        style={{ transformOrigin: "228px 86px" }}
      />
      <motion.circle
        cx="228"
        cy="86"
        r="34"
        fill="#e8c477"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.08, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "228px 86px" }}
      />

      {/* ground curve (the sweep under the "A") */}
      <motion.path
        d="M 20 214 C 110 200 200 196 284 150"
        stroke="#1a4f5d"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
      />

      {/* leaf */}
      <motion.path
        d="M 236 150 C 268 150 292 172 292 208 C 256 208 236 186 236 150 Z"
        fill="#7fa07f"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.1, ease: "backOut" }}
        style={{ transformOrigin: "264px 180px" }}
      />
      <motion.path
        d="M 248 196 C 258 180 270 168 286 160"
        stroke="#f7f4ec"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      />

      {/* rising data line */}
      <motion.path
        d={linePath}
        stroke="#6b9080"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
      />

      {/* nodes on the line */}
      {linePoints.map((p, i) => (
        <motion.circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r="6.5"
          fill="#6b9080"
          stroke="#f7f4ec"
          strokeWidth="2.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.7 + i * 0.15, ease: "backOut" }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
    </svg>
  );
}
