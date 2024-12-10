import { useEffect, useState } from "react";

export const useChartDimensions = (
  containerRef: React.RefObject<HTMLDivElement>,
  initialWidth: number,
  initialHeight: number
) => {
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = Math.min(
          containerRef.current.clientWidth,
          window.innerWidth
        );
        const aspectRatio = initialHeight / initialWidth;
        const containerHeight = Math.min(
          containerWidth * aspectRatio,
          window.innerHeight * 0.8
        );
        setDimensions({
          width: containerWidth,
          height: containerHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialWidth, initialHeight, containerRef]);

  return dimensions;
};
