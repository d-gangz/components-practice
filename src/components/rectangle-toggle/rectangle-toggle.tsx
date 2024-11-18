"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RectangleToggle() {
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div className="grid h-screen w-screen place-items-center bg-[#0d0d0d]">
      <motion.button
        layout
        className="rounded-lg bg-white px-4 py-2 text-sm"
        onClick={() => setShowSecond((s) => !s)}
      >
        Animate
      </motion.button>
      {showSecond ? (
        <motion.div
          layoutId="rectangle"
          className="h-24 w-24 bg-[#fad658]"
          style={{ borderRadius: 12 }}
        />
      ) : (
        <motion.div
          layoutId="rectangle"
          className="h-12 w-12 bg-[#fad658]"
          style={{ borderRadius: 12 }}
        />
      )}
    </div>
  );
}
