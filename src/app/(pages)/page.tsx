"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Mask from "@/components/Mask";
import styles from "./index.module.css";
import Loader from "@/components/Loading";
const HoverEffect: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const Upload = () => {
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
    return (
      <form className={styles.file_upload_form}>
        <label htmlFor="file" className={styles.file_upload_label}>
          <div className={styles.file_upload_design}>
            <svg viewBox="0 0 640 512" height="1em">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <p>拖动Html文件到这里</p>
            <p>或者</p>

            <span className={styles.browse_button}>点击此处上传</span>
          </div>
          <input
            id="file"
            type="file"
            onChange={handleFileUpload}
            accept=".html"
          />
        </label>
      </form>
    );
  };
  return (
    <>
      <div className={styles.edit}>
        <Upload />
        {loading && <Mask children={<Loader />} />}
      </div>
    </>
  );
};

export default HoverEffect;
