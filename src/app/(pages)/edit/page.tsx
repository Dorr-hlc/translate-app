"use client";

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import EditPage from "@/components/Edit";
import Mask from "@/components/Mask";
import Form from "@/components/Form";
import "./index.css";

interface HeadContent {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  lang: string;
}

const Edit = () => {
  const [isOpenMask, setIsOpenMask] = useState(true);
  const [parsedHtml, setParsedHtml] = useState<any>(null);
  const [headContentStr, setHeadContentStr] = useState<HeadContent | null>(
    null
  );
  const [download, setDownload] = useState(false);

  // 仅在客户端加载时访问 localStorage
  useEffect(() => {
    const html = window.localStorage.getItem("html");
    if (html) {
      const parsed = JSON.parse(html);
      setParsedHtml(parsed);
      setHeadContentStr(parsed.headContnent);
    }
  }, []);

  const handleClose = () => setIsOpenMask(false);
  const handleSubmit = (formData: HeadContent) => {
    setIsOpenMask(false);
    setHeadContentStr(formData);
  };
  const handleOpen = () => setIsOpenMask(true);
  const handleDownloadClick = () => setDownload(true);

  const handleDown = (bodyStr?: string) => {
    const reqBody = {
      head: headContentStr,
      body: bodyStr,
      headStr: parsedHtml?.headStr,
      cssFiles: parsedHtml?.cssFiles,
      scriptStr: parsedHtml?.scriptStr,
    };

    fetch("/api/download", {
      body: JSON.stringify(reqBody),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch HTML: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        const { html, fileName } = data;
        if (!html) throw new Error("No HTML content received.");
        const blob = new Blob([html], { type: "text/html" });
        saveAs(blob, fileName || "download.html");
        setDownload(false);
      })
      .catch((error) => console.error("Error during download:", error.message));
  };

  return (
    <>
      {isOpenMask && headContentStr && (
        <Mask>
          <Form
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            headContent={headContentStr}
          />
        </Mask>
      )}
      {parsedHtml && (
        <EditPage
          cssFiles={parsedHtml.cssFiles}
          bodyStr={parsedHtml.bodyStr}
          getCurrentHtml={handleDown}
          download={download}
        />
      )}
      <button className="comic-button" onClick={handleOpen}>
        TDK
      </button>
      <button className="comic-button comic-down" onClick={handleDownloadClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <g fill="currentColor">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </g>
        </svg>
      </button>
    </>
  );
};

export default Edit;
