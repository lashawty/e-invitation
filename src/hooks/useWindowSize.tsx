import {useEffect, useState} from "react";

export default function useWindowSize() {
  const [size, setSize] = useState<null | number>(null)
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}