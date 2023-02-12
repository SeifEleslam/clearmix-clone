import { m } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Menu } from "./Menu";
import { MenuBody } from "./MenuBody";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("top");
  const lastScrollY = useRef(0);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const controlNavbar = () => {
    if (window.scrollY <= 30) {
      setShow("top");
      lastScrollY.current = window.scrollY;
    } else if (window.scrollY - 30 > lastScrollY.current && show !== "hide") {
      // if scroll down hide the navbar
      lastScrollY.current = window.scrollY;
      setShow("hide");
    } else if (show !== "show" && window.scrollY + 30 < lastScrollY.current) {
      // if scroll up show the navbar
      lastScrollY.current = window.scrollY;
      setShow("show");
    }
  };

  const navbar = [
    "w-full h-[5rem] relative z-20",
    "md:px-[4rem] px-8 2xl:px-[16rem]",
    "py-[1.5rem]",
    "text-white",
    "flex justify-between items-center",
  ].join(" ");
  const container = {
    hidden: { y: -100, background: "rgba(8, 8, 16, 1)" },
    visible: {
      y: 0,
      background: "rgba(8, 8, 16, 1)",
      transition: { type: "tween", delay: 0.2, duration: 0.2 },
    },
    top: {
      y: 0,
      padding: 10,
      background: "rgba(8, 8, 16, 0)",
    },
    topopen: {
      y: 0,
      padding: 10,
      background: "rgba(8, 8, 16, 1)",
    },
  };
  return (
    <div className="w-[100vw] z-50 top-0 fixed overflow-hidden">
      <m.div
        className="z-50 w-full fixed overflow-hidden"
        variants={container}
        initial={"hidden"}
        transition={{ default: { type: "tween", duration: 0.3 } }}
        animate={
          show === "show"
            ? "visible"
            : show === "hide" && !open
            ? "hidden"
            : show === "top" && open
            ? "topopen"
            : "top"
        }
      >
        <m.div
          className="absolute w-[200vw] -bottom-[2px] z-10 h-[4px] nav-background"
          animate={{
            x: ["-10vw", "-100vw", "-50vw", "-100vw", "-10vw"],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
        ></m.div>
        <div className={navbar}>
          <Logo />
          <Menu setOpen={setOpen} open={open} />
        </div>
      </m.div>

      <MenuBody open={open} />
    </div>
  );
};