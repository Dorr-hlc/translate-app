"use client";

import { useState, useEffect } from "react";
import EditPage from "@/components/Edit";
import Mask from "@/components/Mask";
import Form from "@/components/Form";
import Success from "@/components/Success";
import ErrorPop from "@/components/Error";
import { downloadHtmls } from "@/utils/utils";
import "./index.css";

interface HeadContent {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  lang: string;
}

const Edit = () => {
  const [isOpenMask, setIsOpenMask] = useState(false);
  const [parsedHtml, setParsedHtml] = useState<any>(null);
  const [headContentStr, setHeadContentStr] = useState<HeadContent | null>(
    null
  );
  const [save, setSave] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const [fileName, setFileName] = useState("download.html");
  const [checkUrl, setCheckUrl] = useState("");
  const [openError, setOpenError] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  useEffect(() => {
    const html = window.localStorage.getItem("html");
    if (html) {
      const parsed = JSON.parse(html);
      setParsedHtml(parsed);
      setHeadContentStr(parsed.headContnent);
    }
  }, []);

  const handleClose = () => setIsOpenMask(false);

  const handleCloseSuccess = () => setOpenSucces(false);
  const handleSubmit = (formData: HeadContent) => {
    setIsOpenMask(false);
    setHeadContentStr(formData);
    parsedHtml.headContnent = formData;
    window.localStorage.setItem("html", JSON.stringify(parsedHtml));
  };
  const handleOpen = () => setIsOpenMask(true);
  const handleDownloadClick = () => setSave(true);

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
        const { html, fileName, checkUrl } = data;
        if (!html) throw new Error("No HTML content received.");
        const blob = new Blob([html], { type: "text/html" });
        setFileName(fileName);
        setBlob(blob);
        setCheckUrl(checkUrl);
        setSave(false);
        setOpenSucces(true);
      })
      .catch((error) => console.error("Error during download:", error.message));
  };
  const handleDownload = () => {
    if (blob) {
      downloadHtmls(blob, fileName);
    }
  };

  const openErrorPop = (params: boolean) => {

    setOpenError(params);
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
      {openSucces && (
        <Mask>
          <Success
            url={checkUrl}
            handleDownload={handleDownload}
            handleClose={handleCloseSuccess}
          />
        </Mask>
      )}
      {openError && (
        <Mask>
          <ErrorPop />
        </Mask>
      )}

      {parsedHtml && (
        <EditPage
          cssFiles={parsedHtml.cssFiles}
          bodyStr={parsedHtml.bodyStr}
          getCurrentHtml={handleDown}
          save={save}
          openErrorPop={openErrorPop}
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
          <path
            fill="currentColor"
            d="M5.008 2H2.282c-.181 0-.245.002-.275.007c-.005.03-.007.094-.007.275v11.436c0 .181.002.245.007.275c.03.005.094.007.275.007h11.436c.181 0 .245-.002.275-.007c.005-.03.007-.094.007-.275V4.62c0-.13-.001-.18-.004-.204a2.654 2.654 0 0 0-.141-.147L11.73 2.145a2.654 2.654 0 0 0-.147-.141A2.654 2.654 0 0 0 11.38 2h-.388c.005.08.008.172.008.282v2.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H6.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378C5.046 5.325 5 5.164 5 4.718V2.282c0-.11.003-.202.008-.282M2.282 1h9.098c.259 0 .348.01.447.032a.87.87 0 0 1 .273.113c.086.054.156.11.338.293l2.124 2.124c.182.182.239.252.293.338a.87.87 0 0 1 .113.273c.023.1.032.188.032.447v9.098c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H2.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77V2.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134M6 2.282v2.436c0 .181.002.245.007.275c.03.005.094.007.275.007h3.436c.181 0 .245-.002.275-.007c.005-.03.007-.094.007-.275V2.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0 0 9.718 2H6.282c-.181 0-.245.002-.275.007c-.005.03-.007.094-.007.275M8 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0-1a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
          />
        </svg>
      </button>
    </>
  );
};

export default Edit;
