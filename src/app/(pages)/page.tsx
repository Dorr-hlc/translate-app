"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Mask from "@/components/Mask";
import Loader from "@/components/Loading";
import "./index.css";

const HoverEffect: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleFileUpload = (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const contents = e.target.result;
      fetch("/api/format", {
        body: JSON.stringify({ htmlStr: contents }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.text())
        .then((res) => {
          window.localStorage.removeItem("gjsProject");
          window.localStorage.removeItem("html");
          window.localStorage.setItem("html", res);
          router.push("/edit");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    reader.readAsText(file);
  };
  const handleOPenEmail = () => {
    alert("邮件翻译功能正在开发中");
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
              htmlFor="email"
              onClick={handleOPenEmail}
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
      {loading && <Mask children={<Loader />} />}
    </>
  );
};

export default HoverEffect;
