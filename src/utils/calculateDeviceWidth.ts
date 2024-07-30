import { useState, useEffect } from "react";
export function useDeviceWidth(): number {
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const getWidth = () => {
      setDeviceWidth(window.innerWidth);
    };
    window.addEventListener("resize", getWidth);

    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, [deviceWidth]);

  return deviceWidth;
}
