"use client";
import { useState } from "react";
import styles from "./index.module.css";

interface HeadContent {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  lang: string;
}

interface FormProps {
  headContent: HeadContent | null;
  handleClose?: () => void;
  handleSubmit?: (data: HeadContent) => void;
}

const Form = ({ headContent, handleClose, handleSubmit }: FormProps) => {
  const [formData, setFormData] = useState<HeadContent>(() => {
    if (headContent) {
      return headContent;
    }
    return {
      title: "",
      description: "",
      keywords: "",
      canonical: "",
      lang: "",
    };
  });

  const onInputChange = (key: keyof HeadContent, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value.trim() }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // 阻止默认提交行为
    handleSubmit?.(formData); // 触发提交逻辑
  };

  return (
    <form className={styles.form_container} onSubmit={onFormSubmit}>
      <div className={styles.title_container}>
        <p className={styles.title}>翻译TDK相关</p>
      </div>

      {/** 通用输入框组件 */}
      {[
        {
          id: "lang_field",
          label: "Lang",
          key: "lang",
          placeholder: "请输入当前翻译语言的缩写",
        },
        {
          id: "canonical_field",
          label: "Canonical",
          key: "canonical",
          placeholder: "请输入页面的canonical",
        },
      ].map(({ id, label, key, placeholder }) => (
        <div className={styles.input_container} key={id}>
          <label className={styles.input_label} htmlFor={id}>
            {label}
          </label>
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            className={styles.input_field}
            value={formData[key as keyof HeadContent]}
            onChange={(e) =>
              onInputChange(key as keyof HeadContent, e.target.value)
            }
          />
        </div>
      ))}

      {/** 通用文本域组件 */}
      {[
        {
          id: "title_field",
          label: "Title",
          key: "title",
          placeholder: "请输入标题",
        },
        {
          id: "description_field",
          label: "Description",
          key: "description",
          placeholder: "请输入描述信息",
        },
        {
          id: "keywords_field",
          label: "KeyWords",
          key: "keywords",
          placeholder: "请输入关键词",
        },
      ].map(({ id, label, key, placeholder }) => (
        <div className={styles.input_container} key={id}>
          <label className={styles.input_label} htmlFor={id}>
            {label}
          </label>
          <textarea
            id={id}
            placeholder={placeholder}
            className={styles.input_field}
            value={formData[key as keyof HeadContent]}
            onChange={(e) =>
              onInputChange(key as keyof HeadContent, e.target.value)
            }
          />
        </div>
      ))}

      <button title="确认" type="submit" className={styles.sign_in_btn}>
        <span>确认</span>
      </button>

      {handleClose && (
        <div className={styles.close} onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="rgba(255,255,255,.7)"
              d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249c12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0c12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"
            />
          </svg>
        </div>
      )}
    </form>
  );
};

export default Form;
