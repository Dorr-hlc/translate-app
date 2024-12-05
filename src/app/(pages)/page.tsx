"use client";
import { useEffect, useRef } from "react";
import "./index.css";
const HoverEffect: React.FC = () => {
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const contents = e.target.result;
      console.log(contents);
      fetch("/api/html", {
        body: JSON.stringify({ htmlStr: contents }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    reader.readAsText(file);
  };
  return (
    <>
      <input type="file" onChange={handleFileUpload} />
    </>
  );
};

export default HoverEffect;
