
import { useEffect, useRef } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { Editor } from "grapesjs";
import plugin from "grapesjs-preset-webpage";
import zh from "grapesjs/locale/zh";
interface EmailEditorProps {
  cssFiles: string[];
  bodyStr: string;
  getCurrentHtml: (bodyHtml: string) => void;
  download: boolean;
}
const EmailEditor = ({
  cssFiles,
  bodyStr,
  getCurrentHtml,
  download,
}: EmailEditorProps) => {
  const editorRef = useRef<any>(null);
  const resetEditor = (editor: Editor) => {
    editor.on("load", function () {
      const panels = editor.Panels;
      const saveButton = panels.getButton("options", "gjs-open-import-webpage");
      if (saveButton) {
        saveButton.set(
          "label",
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="display: block; max-width:22px;transform: rotate(180deg);" >
        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
      </svg>
      `
        );
      }

      panels.addButton("options", {
        id: "upload-button",
        className: "fa fa-upload", // 你可以选择你想要的图标类，这里用的是 Font Awesome 图标
        label: ``, // 自定义图标
        command: "open-upload-dialog", // 按钮点击后的命令
      });

      editor.Commands.add("open-upload-dialog", () => {
        alert("上传功能未实现");
      });
      const canvasHead = editor.Canvas.getDocument().head;
      const cssLinks = cssFiles;
      cssLinks.forEach((href: string) => {
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href = href;
        canvasHead.appendChild(linkEl);
      });
    });
  };
  const updateChange = (editor: Editor) => {
    const updatedHtml = editor.getHtml();
    getCurrentHtml(updatedHtml);
  };

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      height: "100vh",
      width: "auto",
      storageManager: { autoload: false },
      plugins: [plugin],
      pluginsOpts: {
        [plugin as any]: {
          modalImportTitle: "导入",
          modalImportButton: "导入",
          textCleanCanvas: "清除所有内容？",
        },
      },

      cleaner: {
        removeTags: [], // 禁止删除 html、head、body 标签
        // 保留 script 标签
        keepScripts: true,
      },
      i18n: {
        locale: "zh",
        messages: {
          zh,
        },
      },
    });
    resetEditor(editor);
    editor.addComponents(bodyStr);
    editorRef.current = editor;

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    console.log(download);
    
    if (download) {
      updateChange(editorRef.current);
    }
  }, [download]);

  return <div id="gjs"></div>;
};

export default EmailEditor;
