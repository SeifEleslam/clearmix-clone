import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect } from "react";

export const BehindBg = () => {
  const mouseY = useMotionValue(200);

  const rotateY = useTransform(mouseY, [0, 100000], [0, 20000]);

  function handleMouse(event: any) {
    mouseY.set(event.pageX);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="z-[-2] overflow-clip fixed w-full h-full top-0 left-0 blur-2xl">
      <div className="absolute z-[-1] w-full h-full top-0 left-0 bg-bgprim/75 z-10 "></div>
      <div className="fixed z-[-2] w-[100vw] h-[100vh] ">
        <motion.div
          className={`w-[100%] absolute z-[-2] inset-0 h-[100%] opacity-50 duration-[10000ms] rounded-full bg-prim `}
          style={{ rotateY, rotateX: 45 }}
        ></motion.div>
      </div>
    </div>
  );
};
