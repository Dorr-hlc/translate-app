
import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { Editor } from "grapesjs";
import plugin from "grapesjs-preset-webpage";
import zh from "grapesjs/locale/zh";


const EmailEditor = () => {
  const editorRef = useRef<any>(null);
  const [html, setHtml] = useState("1");
  const [open, setOpen] = useState(false);
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
      // 新增上传文件按钮
      panels.addButton("options", {
        id: "upload-button",
        className: "fa fa-upload", // 你可以选择你想要的图标类，这里用的是 Font Awesome 图标
        label: ``, // 自定义图标
        command: "open-upload-dialog", // 按钮点击后的命令
      });
      // 绑定上传功能
      editor.Commands.add("open-upload-dialog", () => {
        setOpen(true);
      });
    });
  };
  useEffect(() => {
    if (html) {
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
      editor.addComponents(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <script src="/assets/lib/amt.min.js"></script>
          <link rel="stylesheet" href="/assets/aa.css" />
        </head>
        <body>
          <h1>Hello world</h1>
          <img src="/assets/aa.png" alt />
          <img src="https://wwww.baidu.com/assets/images/pp.png" alt />
          <script src="/ass.js"></script>
        </body>
      </html>
      `);
      editorRef.current = editor;
      console.log(editor.getHtml());
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [html]);

  return <div>{html && <div id="gjs"></div>}</div>;
};

export default EmailEditor;
