"use client";

import { useState } from "react";
import { Spinner } from "./spinner";
import { AnimatePresence, motion } from "framer-motion";

// nidda continue on that course page as the solution uses poplayout. Need to understand how to use it.

// Define the content for each button state
const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: "Login link sent!",
};

type ButtonState = keyof typeof buttonCopy;

export default function LoginButton() {
  // Track the current state of the button
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  return (
    <div className="flex justify-center py-30 px-10">
      <button
        className="h-8 w-[148px] overflow-hidden rounded-lg bg-gradient-to-b from-[#1994ff] to-[#157cff] font-medium text-sm text-white shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1a94ff] disabled:cursor-not-allowed disabled:opacity-100"
        // Disable button during loading/success states
        disabled={buttonState !== "idle"}
        onClick={() => {
          // State management sequence:
          setButtonState("loading");
          // After 1.75s, show success message
          setTimeout(() => {
            setButtonState("success");
          }, 1750);
          // After 3.5s total, reset to idle
          setTimeout(() => {
            setButtonState("idle");
          }, 3500);
        }}
      >
        {/* AnimatePresence handles enter/exit animations for components, mode="wait" ensures the exiting component finishes its animation before the entering component starts, initial={false} prevents animation on first render, only animates on state changes */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            className="flex w-full items-center justify-center text-white [text-shadow:0_1px_1.5px_rgba(0,0,0,0.16)]"
            key={buttonState}
            // Prev it has this weird bounce. so setting this custom transition makes it smoother.
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
          >
            {/* Render content based on current state */}
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
