import { AnimatePresence, m } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ChangeText = () => {
  const states = [
    "Intro Videos",
    "Educational Videos",
    "Podcast Videos",
    "Testimonial Videos",
  ];
  const [state, setState] = useState(states[0]);
  const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        delay: 0.4,
      },
    },
    hide: {
      y: 20,
      opacity: 0,
    },
    hideagain: {
      y: -20,
      opacity: 0,
      transition: {
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState((prv) =>
        states.indexOf(prv) >= states.length - 1
          ? states[0]
          : states[states.indexOf(prv) + 1]
      );
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
    >
      <AnimatePresence>
        <m.div
          key={state}
          variants={variants}
          exit={"hideagain"}
          animate={"show"}
          initial="hide"
        >
          <h1 className="absolute left-0 right-0 mx-auto  md:text-5xl textgrd xl:text-8xl lg:text-7xl text-4xl">
            {state}
          </h1>
        </m.div>
      </AnimatePresence>
      <div className="h-16"></div>
    </m.div>
  );
};
