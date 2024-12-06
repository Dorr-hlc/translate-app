"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Mask from "@/components/Mask";
import Loader from "@/components/Loading";
import "./index.css";

const HoverEffect: React.FC = () => {
  const router = useRouter();
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const contents = e.target.result;
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
          window.localStorage.setItem("html", res);
          router.push("/edit");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="home">
        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-top">Adventurous</span>
            <span className="heading-primary-bottom">点击下方按钮翻译</span>
          </h1>
          <div className="link-box">
            <label
              htmlFor="normal"
              className="btn btn-call-to-action btn-animate"
            >
              公共页面翻译
            </label>
            <label
              htmlFor="normal"
              className="btn btn-call-to-action btn-animate"
            >
              邮件页面翻译
            </label>
            <input
              id="normal"
              hidden
              type="file"
              accept=".html"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>
      {/* <Mask children={<Loader />} /> */}
    </>
  );
};

export default HoverEffect;
