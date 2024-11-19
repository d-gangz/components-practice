"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="mb-2 font-semibold">This is step one</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="h-4 w-64 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-48 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-96 animate-pulse rounded-md bg-[#f2f1f0]" />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="mb-2 font-semibold">This is step two</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="h-4 w-64 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-48 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-96 animate-pulse rounded-md bg-[#f2f1f0]" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-2 font-semibold">This is step three</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="h-4 w-64 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-48 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-64 animate-pulse rounded-md bg-[#f2f1f0]" />
              <div className="h-4 w-96 animate-pulse rounded-md bg-[#f2f1f0]" />
            </div>
          </>
        );
    }
  }, [currentStep]);

  return (
    // Use MotionConfig to set the default transition for all the components inside it
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
      <motion.div
        animate={{ height: bounds.height }}
        className="relative mx-auto my-24 w-[550px] overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_8px_-8px_rgba(0,0,0,0.04)]"
      >
        <div ref={ref} className="p-6">
          {/* AnimatePresence is used to animate the content of the current step. We use 110% instead of 100% to account for the padding
        It is important to set the key so that we let react know that it has been updated. Need the poplayout so that it ensure that the exiting element wont take space in the DOM. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ x: "110%", opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: "-110%", opacity: 0 }}
              // transition={{ duration: 0.5, type: "spring", bounce: 0 }}
            >
              {content}
            </motion.div>
          </AnimatePresence>

          <motion.div
            layout
            //This is a good default transition to reduce bounce
            // transition={{ duration: 0.5, type: "spring", bounce: 0 }}
            className="mt-8 flex justify-between"
          >
            <button
              className="h-8 w-20 rounded-full text-sm font-medium text-[#63635d] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_8px_-8px_rgba(0,0,0,0.04)] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentStep === 0}
              onClick={() => {
                if (currentStep === 0) return;
                setCurrentStep((prev) => prev - 1);
              }}
            >
              Back
            </button>

            <button
              className="relative h-8 w-24 overflow-hidden rounded-full bg-gradient-to-b from-[#1994ff] to-[#157cff] text-sm font-semibold text-white shadow-[0px_0px_1px_1px_rgba(255,255,255,0.08)_inset,0px_1px_1.5px_0px_rgba(0,0,0,0.32),0px_0px_0px_0.5px_#1a94ff] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentStep === 2}
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(0);
                  return;
                }
                setCurrentStep((prev) => prev + 1);
              }}
            >
              Continue
            </button>
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
