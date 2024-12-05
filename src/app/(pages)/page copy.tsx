"use client";
import { useEffect, useRef } from "react";
import "./index.css";
const HoverEffect: React.FC = () => {
  // const leftRef = useRef<HTMLDivElement | null>(null);
  // const rightRef = useRef<HTMLDivElement | null>(null);
  // const containerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const left = leftRef.current;
  //   const right = rightRef.current;
  //   const container = containerRef.current;

  //   if (left && right && container) {
  //     const handleMouseEnterLeft = () => {
  //       container.classList.add("hover-left");
  //     };

  //     const handleMouseLeaveLeft = () => {
  //       container.classList.remove("hover-left");
  //     };

  //     const handleMouseEnterRight = () => {
  //       container.classList.add("hover-right");
  //     };

  //     const handleMouseLeaveRight = () => {
  //       container.classList.remove("hover-right");
  //     };

  //     left.addEventListener("mouseenter", handleMouseEnterLeft);
  //     left.addEventListener("mouseleave", handleMouseLeaveLeft);
  //     right.addEventListener("mouseenter", handleMouseEnterRight);
  //     right.addEventListener("mouseleave", handleMouseLeaveRight);

  //     return () => {
  //       left.removeEventListener("mouseenter", handleMouseEnterLeft);
  //       left.removeEventListener("mouseleave", handleMouseLeaveLeft);
  //       right.removeEventListener("mouseenter", handleMouseEnterRight);
  //       right.removeEventListener("mouseleave", handleMouseLeaveRight);
  //     };
  //   }
  // }, []);

  return (
    <>
      {/* <div className="container">
        <div className="split left">
          <h1>页面翻译</h1>
          <a href="#" className="button">
            开始使用
          </a>
        </div>
        <div className="split right">
          <h1>邮件翻译</h1>
          <a href="#" className="button">
            开始使用
          </a>
        </div>
      </div> */}
      <input type="file" />
    </>
  );
};

export default HoverEffect;
