"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "@/components/button/spinner";
// import { useOnClickOutside } from "usehooks-ts";
// import "./styles.css";

function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function FeedbackComponentCSS() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  return (
    <div className="flex h-[500px] w-full items-center justify-center">
      <motion.button
        layoutId="wrapper"
        onClick={() => {
          setOpen(true);
          setFormState("idle");
          setFeedback("");
        }}
        className="relative flex h-9 items-center rounded-lg border border-[#e9e9e7] bg-white px-3 font-medium outline-none"
      >
        {/* this is the button text. so set layoutId to animate to the input field placeholder title */}
        <motion.span layoutId="title" className="text-sm">
          Feedback
        </motion.span>
      </motion.button>

      {/* add the animate presence here so we can delay the unmounting of the component before the animation is complete for a smoother animation. 
      
      If you put AnimatePresence after the open check, the component is unmounted immediately when open is false, before AnimatePresence can handle the exit animation. So by putting it before the open check, we can delay the unmounting of the component until the exit animation is complete.

      Think of AnimatePresence like a manager that needs to be present to oversee both the mounting and unmounting of its children. If it gets inside the conditional, it can't manage the unmounting process because it gets removed along with everything else..
      */}
      <AnimatePresence>
        {open ? (
          <motion.div
            layoutId="wrapper"
            className="absolute h-48 w-[364px] overflow-hidden rounded-xl bg-[#f5f6f7] p-1 outline-none shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04)]"
            ref={ref}
          >
            {/* Using a span to mimic the placeholder text of the textarea so u can animate it. cuz the real placeholder is just a prop. We cannot animate it. */}
            <motion.span
              layoutId="title"
              aria-hidden
              // if feedback is true, set opacity to 0, otherwise set it to 100. Need to use ! cuz framer motion adds an inline opacity 1 to it.
              className={`absolute left-4 top-[17px] text-sm text-[#63635d] ${
                feedback ? "!opacity-0" : "opacity-100"
              }`}
              data-feedback={feedback ? "true" : "false"}
            >
              Feedback
            </motion.span>
            {/* AnimatePresence only works by detecting its direct children. As these are nested children. so we will need an animatePresence here to manage the success and form animations */}
            <AnimatePresence mode="popLayout" initial={false}>
              {formState === "success" ? (
                // Success Message
                <motion.div
                  initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className="flex h-full flex-col items-center justify-center"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                      fill="#2090FF"
                      fillOpacity="0.16"
                    />
                    <path
                      d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                      stroke="#2090FF"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="mb-1 mt-2 text-sm font-medium text-[#21201c]">
                    Feedback received!
                  </h3>
                  <p className="text-sm text-[#63635d]">
                    Thanks for helping me improve Sonner.
                  </p>
                </motion.div>
              ) : (
                // Feedback Form
                <motion.form
                  exit={{ y: 8, opacity: 0, filter: "blur (4px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    if (!feedback) return;
                    submit();
                  }}
                  className="rounded-lg border border-[#e6e7e8] bg-white"
                >
                  <textarea
                    autoFocus
                    placeholder="Feedback"
                    onChange={(e) => setFeedback(e.target.value)}
                    className="h-32 w-full resize-none rounded-lg p-3 text-sm outline-none placeholder:opacity-0"
                    required
                  />
                  <div className="relative flex h-12 flex-col justify-between">
                    <div className="relative">
                      <svg
                        className="dotted-line"
                        width="352"
                        height="2"
                        viewBox="0 0 352 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 1H352"
                          stroke="#E6E7E8"
                          strokeDasharray="4 4"
                        />
                      </svg>
                      <div className="half-circle-left absolute -left-[1px] top-1/2 -translate-y-1/2">
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_2029_22)">
                            <path
                              d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                              fill="#F5F6F7"
                            />
                            <path
                              d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                              stroke="#E6E7E8"
                              strokeWidth="1"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2029_22">
                              <rect width="6" height="12" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="half-circle-right absolute -right-[1px] top-1/2 -translate-y-1/2">
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ transform: "scaleX(-1)" }}
                        >
                          <g clipPath="url(#clip0_2029_22)">
                            <path
                              d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
                              fill="#F5F6F7"
                            />
                            <path
                              d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
                              stroke="#E6E7E8"
                              strokeWidth="1"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2029_22">
                              <rect width="6" height="12" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-end px-2.5 pb-2">
                      <button
                        type="submit"
                        className="flex h-6 w-32 items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-[#1994ff] to-[#157cff] text-xs font-semibold text-white shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1a94ff]"
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            transition={{
                              type: "spring",
                              duration: 0.3,
                              bounce: 0,
                            }}
                            initial={{ opacity: 0, y: -25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 25 }}
                            key={formState}
                          >
                            {formState === "loading" ? (
                              <Spinner
                                size={14}
                                color="rgba(255, 255, 255, 0.65)"
                              />
                            ) : (
                              <span className="flex px-4 w-full items-center justify-center text-white text-shadow-[0_1px_1.5px_rgba(0,0,0,0.16)]">
                                Send feedback
                              </span>
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
