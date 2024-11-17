"use client";

interface SpinnerProps {
  color?: string;
  size?: number;
}

const bars = Array(12).fill(0);

export function Spinner({ color, size = 20 }: SpinnerProps) {
  return (
    <div className="relative" style={{ height: size, width: size }}>
      <div
        className="absolute top-1/2 left-1/2"
        style={{ height: size, width: size }}
      >
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${i}`}
            className="absolute h-[8%] w-[24%] -left-[10%] -top-[3.9%] rounded-md animate-spin-fade"
            style={{
              background: color,
              transform: `rotate(${i * 30}deg) translate(146%)`,
              animationDelay: `${-1.2 + i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
