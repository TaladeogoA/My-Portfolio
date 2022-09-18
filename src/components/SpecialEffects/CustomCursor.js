import { useEffect, useRef } from "react";
import "./CustomCursor.css";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientHeight / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
  }, []);

  return <div className="round-cursor" ref={cursorRef}></div>;
};

export default Cursor;
