import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate the progress bar and percentage
    const tl = gsap.timeline();

    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    })
      .to(
        percentageRef.current,
        {
          innerText: "100%",
          duration: 2,
          ease: "power2.inOut",
          snap: { innerText: 1 }, // Snap to whole numbers
        },
        0 // Start at the same time as the progress bar
      )
      .to(
        loaderRef.current,
        {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1,
          ease: "power2.inOut",
          delay: 0.5, // Wait for the progress bar to finish
          onComplete: () => {
            if (loaderRef.current) {
              loaderRef.current.style.display = "none";
            }
          },
        },
        "-=0.5" // Start 0.5 seconds before the progress bar finishes
      );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      style={{ clipPath: "circle(75% at 50% 50%)" }}
    >
      <div className="mb-4">

      </div>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden relative mb-4">
        <div
          ref={progressRef}
          className="h-full bg-blue-500 absolute top-0 left-0"
          style={{ width: "0%" }}
        />
      </div>
      <span
        ref={percentageRef}
        className="text-xl font-bold text-blue-500 mb-4"
      >
        0%
      </span>
    </div>
  );
};

export default Loader;
