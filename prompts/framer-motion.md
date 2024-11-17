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