import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import useMeasure from "react-use-measure";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function MutedPlayer({
  url,
  newClasses,
  style,
  variants,
  aspects,
}: {
  url: string;
  newClasses: string;
  style?: any;
  variants?: any;
  aspects: number;
}) {
  const ref = useRef(null);
  const [view, setView] = useState(false);
  const render = useInView(ref, { once: true });
  const play = useInView(ref);
  const [widthRef, { width }] = useMeasure();

  return (
    <motion.div
      variants={variants}
      initial="hide"
      animate={view ? "show" : "hide"}
      ref={ref}
      style={style}
      className={newClasses + " overflow-clip"}
    >
      <div
        ref={widthRef}
        className="w-full"
        style={{ height: width * aspects }}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-bgprim/25"></div>
        {render && (
          <ReactPlayer
            url={url}
            playing={play}
            loop={true}
            muted={true}
            width="100%"
            height="auto"
            onReady={() => {
              setView(true);
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
