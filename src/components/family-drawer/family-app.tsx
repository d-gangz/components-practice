"use client";

import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";
import { DefaultView, Key, Phrase, RemoveWallet } from "./components";
import { CloseIcon } from "./icons";
import "./styles.css";

export default function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();

  // This switch statement is used to render the correct view based on the current view state is quite a smart way to show different content in a modal.
  // He usually prefer to use the useMemo for conditional rendering.
  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} />;
      case "remove":
        return <RemoveWallet setView={setView} />;
      case "phrase":
        return <Phrase setView={setView} />;
      case "key":
        return <Key setView={setView} />;
    }
  }, [view]);

  return (
    <>
      <button
        className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium"
        onClick={() => setIsOpen(true)}
        style={{ fontFamily: "Open Runde" }}
      >
        Try it out
      </button>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-10 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          {/* For Radix elements or Vaul, u can use the asChild prop to pass all of its properties to the direct child. So in this case, we create the motion.div which will inherit all of the Drawer.Content properties. */}
          <Drawer.Content
            asChild
            className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-none md:mx-auto md:w-full"
          >
            <motion.div animate={{ height: bounds.height }}>
              <Drawer.Close asChild>
                {/* Gets the Drawer.close props. It means all it's functionality like event handlers and ARIA attributes are passed to the button.*/}
                <button
                  data-vaul-no-drag=""
                  className="absolute right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
                >
                  <CloseIcon />
                </button>
              </Drawer.Close>
              {/* We need to pass the ref to the div that contains the content so that we can measure its height. And add the p-6 padding here so that it is measuring the actual content height. */}
              <div
                ref={elementRef}
                className="px-6 pb-6 pt-2.5 antialiased"
                style={{ fontFamily: "Open Runde" }}
              >
                {/* The AnimatePresence component is used to wrap the content so that it can be animated when it changes. Usually when you have conditional rendering, use AnimatePresence. */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    key={view}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
