import { useRef, useEffect } from "react";

const useClickOutside = <T extends Element>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const el = ref.current;

      el && !el.contains(event.composedPath()[0] as Node) && callback();
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;
