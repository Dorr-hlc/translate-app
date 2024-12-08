import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { Editor } from "grapesjs";
import plugin from "grapesjs-preset-webpage";
import zh from "grapesjs/locale/zh";
import { checkAndAppendCss } from "@/utils/utils";
import { useRouter } from "next/navigation";
interface EmailEditorProps {
  cssFiles: string[];
  bodyStr: string;
  getCurrentHtml: (bodyHtml: string) => void;
  save: boolean;
  openErrorPop: (isResource: boolean) => void;
}
const EmailEditor = ({
  cssFiles,
  bodyStr,
  getCurrentHtml,
  save,
  openErrorPop,
}: EmailEditorProps) => {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const resetEditor = (editor: Editor) => {
    editor.on("load", function () {
      const panels = editor.Panels;
      const saveButton = panels.getButton("options", "gjs-open-import-webpage");
      if (saveButton) {
        saveButton.set("className", "gjs-up-btn");
      }

      panels.addButton("options", {
        id: "upload-button",
        className: "fa fa-upload", // 你可以选择你想要的图标类，这里用的是 Font Awesome 图标
        label: ``, // 自定义图标
        command: "open-upload-dialog", // 按钮点击后的命令
      });

      editor.Commands.add("open-upload-dialog", () => {
        router.push("/");
      });
      const canvasHead = editor.Canvas.getDocument().head;
      const cssLinks = cssFiles;
      cssLinks.forEach((href: string) => {
        console.log(href);

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
      storageManager: {
        type: "local",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      plugins: [plugin],
      pluginsOpts: {
        [plugin as any]: {
          modalImportTitle: "导入",
          modalImportButton: "导入",
          textCleanCanvas: "清除所有内容？",
        },
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
    const checkCssFiles = async () => {
      const isValid = await checkAndAppendCss(cssFiles);
      if (isValid) {
        openErrorPop(false);
      } else {
        openErrorPop(true);
      }
    };

    checkCssFiles();
  }, [cssFiles]);
  useEffect(() => {
    if (save) {
      updateChange(editorRef.current);
    }
  }, [save]);

  return <div id="gjs"></div>;
};

export default EmailEditor;
