"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Game {
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

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

export default function SharedLayout() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const ref = useRef(null);
  // Close the modal when clicking outside
  useOnClickOutside(ref, () => setActiveGame(null));

  useEffect(() => {
    // Close the modal when the escape key is pressed
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGame(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Animate presence so that the modal is animated when it is opened and closed */}
      <AnimatePresence>
        {activeGame ? (
          <>
            {/* Animate the overlay to fade in and out */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-black/20 pointer-events-none"
            />
            <div className="absolute inset-0 z-10 grid place-items-center">
              {/* Set the layout id so that framer motion knows that this is the same element as the one in the list. Therefore, it will animate it smoothly*/}
              <motion.div
                layoutId={`game-${activeGame.title}`}
                ref={ref}
                className="flex h-fit w-[500px] flex-col items-start gap-4 overflow-hidden bg-white p-4 rounded-xl cursor-pointer"
              >
                <div className="flex w-full items-center gap-4">
                  <motion.img
                    layoutId={`game-image-${activeGame.title}`}
                    height={56}
                    width={56}
                    alt="Game"
                    src={activeGame.image}
                    className="rounded-xl"
                  />
                  <div className="flex flex-grow items-center justify-between">
                    <div className="flex flex-col">
                      <motion.h2
                        layoutId={`game-title-${activeGame.title}`}
                        className="text-sm font-medium"
                      >
                        {activeGame.title}
                      </motion.h2>
                      <motion.p
                        layoutId={`game-description-${activeGame.title}`}
                        className="text-sm text-[#63635d]"
                      >
                        {activeGame.description}
                      </motion.p>
                    </div>
                    <motion.button
                      layoutId={`game-get-${activeGame.title}`}
                      className="rounded-full bg-[#f1f0ef] px-3 py-1 text-xs font-semibold text-[#007aff]"
                    >
                      Get
                    </motion.button>
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="text-sm text-[#63635d]"
                >
                  {activeGame.longDescription}
                </motion.p>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>

      <ul className="relative flex w-full flex-col items-center py-12 m-0">
        {GAMES.map((game) => (
          <motion.li
            layoutId={`game-${game.title}`}
            key={game.title}
            onClick={() => setActiveGame(game)}
            className="flex w-[386px] cursor-pointer items-center gap-4 rounded-lg"
          >
            <motion.img
              layoutId={`game-image-${game.title}`}
              height={56}
              width={56}
              alt="Game"
              src={game.image}
              className="rounded-xl"
            />
            <div className="flex flex-grow items-center justify-between border-b border-[#d4d6d861] last:border-0">
              <div className="flex flex-col py-4">
                <motion.h2
                  layoutId={`game-title-${game.title}`}
                  className="text-sm font-medium"
                >
                  {game.title}
                </motion.h2>
                <motion.p
                  layoutId={`game-description-${game.title}`}
                  className="text-sm text-[#63635d]"
                >
                  {game.description}
                </motion.p>
              </div>
              <motion.button
                layoutId={`game-get-${game.title}`}
                className="rounded-full bg-[#f1f0ef] px-3 py-1 text-xs font-semibold text-[#007aff]"
              >
                Get
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const GAMES = [
  {
    title: "The Oddysey",
    description: "Explore unknown galaxies.",
    longDescription:
      "Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/space.png",
  },
  {
    title: "Angry Rabbits",
    description: "They are coming for you.",
    longDescription:
      "The rabbits are angry and they are coming for you. You have to defend yourself with your carrot gun. The game is not simple, you have to be fast and accurate to survive.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/rabbit.png",
  },
  {
    title: "Ghost town",
    description: "Find the ghosts.",
    longDescription:
      "You are in a ghost town and you have to find the ghosts. But be careful, they are dangerous.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/ghost.webp",
  },
  {
    title: "Pirates in the jungle",
    description: "Find the treasure.",
    longDescription:
      "You are a pirate and you have to find the treasure in the jungle. But be careful, there are traps and wild animals.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/pirate.png",
  },

  {
    title: "Lost in the mountains",
    description: "Find your way home.",
    longDescription:
      "You are lost in the mountains and you have to find your way home. But be careful, there are dangerous animals and you can get lost.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp",
  },
];
