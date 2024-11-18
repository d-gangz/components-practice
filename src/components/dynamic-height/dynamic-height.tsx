"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function DynamicHeight() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [ref, bounds] = useMeasure();

  return (
    <div className="grid h-screen w-screen place-items-center bg-[#0d0d0d] text-black">
      <button
        className="bg-white px-4 py-2 rounded-lg text-sm"
        onClick={() => setShowExtraContent((b) => !b)}
      >
        Toggle height
      </button>

      <motion.div
        animate={{ height: bounds.height }}
        className="bg-white rounded-2xl w-80 flex flex-col gap-2 overflow-hidden"
      >
        <div ref={ref} className="px-4 py-3.5">
          <h1 className="font-semibold">Fake Family Drawer</h1>
          <p className="text-[#63635d]">
            This is a fake family drawer. Animating height is tricky, but
            satisfying when it works.
          </p>
          {showExtraContent ? (
            <p className="text-[#63635d]">
              This extra content will change the height of the drawer. Some even
              more content to make the drawer taller and taller and taller...
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
