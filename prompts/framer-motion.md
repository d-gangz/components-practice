# Framer Motion Tips

## Exit animations
Exit animations in React are hard. AnimatePresence in Framer Motion allows components to animate out when they're removed from the React tree.

 
It has good DX as well. All you need to do is wrap an element you want to animate out with AnimatePresence, and add the exit prop, which works the same way as initial and animate, except it defines the end state of our component when it's removed.

```tsx
import { motion, AnimatePresence } from "framer-motion"
 
export const MyComponent = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    ) : null}
  </AnimatePresence>
)
```

It also has different modes. I often use the wait mode to animate between two elements. The copy button we've seen earlier in this lesson is using this mode. When you click the button, the copy icon animates out, and only after that, the checkmark animates in.

```tsx
const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};
 
// ...
 
<button aria-label="Copy code snippet" onClick={copy}>
  <AnimatePresence mode="wait" initial={false}>
    {copied ? (
      <motion.span
        key="checkmark"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <CheckmarkIcon />
      </motion.span>
    ) : (
      <motion.span
        key="copy"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <CopyIcon />
      </motion.span>
    )}
  </AnimatePresence>
</button>
```
With this type of animations, it's important to include `initial={false}` on AnimatePresence. This tells Framer Motion not to animate on the initial render.

**Tip**
If an animation that involves AnimatePresence is not working as expected, make sure that you have a key prop on the element you're animating. Otherwise, the component won't be unmounted and the exit animation won't be triggered.

## When should you Framer Motion?

Before we dive into more advanced concepts of Framer Motion, let's talk about when you should use it.
 
I tend to avoid using this library if I can achieve the same effect with CSS in a reasonable amount of time. Basically, I animate all enter and exit animations of UI elements like modals, dropdowns etc. through Radix, as it allows me to animate the exit with CSS.

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
 
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
 
.dialog[data-state="open"] {
  animation: fadeIn 200ms ease-out;
}
 
.DialogContent[data-state="closed"] {
  animation: fadeOut 150ms ease-out;
}
```

Radix listens for animationstart event, and if an animation started when the open state changed to false they suspend the unmount while the animation plays out.
 
Whether to use Framer Motion or not also depends on how sensitive your app is to bundle size. At Vercel, we avoided using Framer Motion in Next.js' docs, because we wanted to keep the bundle size as small as possible.

## Limitations of framer motion, when animating border radius or box-shadow, use inline styles.

Based on the documentation, there's a specific reason why border radius animations can appear jumpy when using Tailwind classes. Here's the explanation:

When animating `scale` with Framer Motion (which happens during layout animations), it can distort certain properties like `border-radius` and `box-shadow`. This is because these properties are affected by the transform scale that Framer Motion uses under the hood for performance.([1](https://motion.dev/docs/react-layout-animations))

To fix this, Framer Motion automatically corrects for scale distortion on these properties, but **only** when they are set via inline styles rather than CSS classes.([2](https://motion.dev/docs/react-layout-animations))

Here's why the two approaches behave differently:

```tsx
// ❌ Will appear jumpy - Tailwind class
<motion.div layoutId="rectangle" className="rounded-xl" />

// ✅ Will animate smoothly - Inline style
<motion.div layoutId="rectangle" style={{ borderRadius: 12 }} />

```

The reason is:

1. With Tailwind classes, Framer Motion can't intercept and correct the border radius during scale transforms
2. With inline styles, Framer Motion can automatically correct the border radius distortion that happens during scaling

So for the smoothest animations when using layout animations or scale transforms, it's recommended to use inline styles for `borderRadius` and `boxShadow` properties.

This is a known limitation and is actually documented as a best practice for Framer Motion animations, regardless of whether you're using Tailwind or regular CSS classes.

## Avoid using transform-translate for centering if you are animating that element

```tsx
• inner
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

It will conflict with Framer motion’s transform values. The better way is to create a wrapper container that will centre the element you want to animate

```tsx
<>
          <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />
          <div className="absolute inset-0 z-10 grid place-items-center">
            <motion.div
              layoutId={`game-${activeGame.title}`}
              ref={ref}
              className="flex h-fit w-[500px] flex-col items-start gap-4 overflow-hidden bg-white p-4 rounded-xl cursor-pointer"
            >
              <div className="flex w-full items-center gap-4">
                <img
                  height={56}
                  width={56}
                  alt="Game"
                  src={activeGame.image}
                  className="rounded-xl"
                />
                <div className="flex flex-grow items-center justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-sm font-medium">{activeGame.title}</h2>
                    <p className="text-sm text-[#63635d]">
                      {activeGame.description}
                    </p>
                  </div>
                  <button className="rounded-full bg-[#f1f0ef] px-3 py-1 text-xs font-semibold text-[#007aff]">
                    Get
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#63635d]">
                {activeGame.longDescription}
              </p>
            </motion.div>
          </div>
        </>
```

## Gestures
Framer Motion exposes a simple yet powerful set of UI gesture recognisers. That means that we can make a draggable component by simply adding the drag prop to a motion element for example.

As you can see in the demo above, the draggable element maintains momentum when dragging finishes, which helps it feel more natural. Usually, we want to simple drag functionality though. We can disable this effect by setting dragMomentum to false.

```tsx
"use client";
 
import { motion } from "framer-motion";
import { useRef } from "react";
 
export function DragExample() {
  const boundingBox = useRef(null);
 
  return (
    <div ref={boundingBox} className="h-64 w-full p-6">
      <motion.div
        drag
        // this prevents the element from being dragged outside of the bounding box
        dragConstraints={boundingBox}
		dragMomentum={false}
        className="h-10 w-10 rounded-full bg-gray-400"
      />
    </div>
  );
}
```
