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
      const canvasBody = editor.Canvas.getDocument().body;
      const cssLinks = cssFiles; // 外部 CSS 文件数组
      canvasBody.appendChild(canvasHead);


      // 确保所有外部 CSS 加载完成后再进行后续操作
      // let loadCount = 0;`
      const totalLinks = cssLinks.length;

      // 用 Promise 来处理每个外部 CSS 文件加载完成后执行的操作
      cssLinks.forEach((href: string) => {
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href = href;

        // // 添加 load 事件监听器
        // linkEl.onload = function () {
        //   loadCount++;
        //   // 如果所有的 CSS 文件都加载完成
        //   if (loadCount === totalLinks) {
        //     // 执行后续的操作
        //     modifyElements(editor);
        //   }
        // };

        // linkEl.onerror = function () {
        //   console.error(`CSS 加载失败: ${href}`);
        // };

        canvasHead.appendChild(linkEl);
      });

      // 如果没有外部 CSS 文件，则直接执行
      if (totalLinks === 0) {
        modifyElements(editor);
      }
    });
  };

  // 修改页面中元素的 display 样式
  function modifyElements(editor: Editor) {
    const canvasBody = editor.Canvas.getDocument().body;
    const elements = canvasBody.querySelectorAll("*");

    elements.forEach(function (el: any) {
      if (
        el.tagName.toLowerCase() !== "header" &&
        el.tagName.toLowerCase() !== "footer" &&
        el.tagName.toLowerCase() !== "style"
      ) {
        const displayStyle = window.getComputedStyle(el).display;
        // 如果 display 样式是 none，修改为 block
        if (displayStyle === "none") {
          el.style.display = "block";
        }
      }
    });
  }

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

    // editor.on("load", function () {
    //   setTimeout(() => {
    //     const canvasBody = editor.Canvas.getDocument().body;
    //     const elements = canvasBody.querySelectorAll("*");

    //     elements.forEach(function (el: any) {
    //       if (
    //         el.tagName.toLowerCase() !== "header" &&
    //         el.tagName.toLowerCase() !== "footer"
    //       ) {
    //         const displayStyle = window.getComputedStyle(el).display;
    //         // 如果 display 样式是 none，修改为 block
    //         if (displayStyle === "none") {
    //           el.style.display = "block";
    //         }
    //       }
    //     });
    //   }, 10000);
    // });

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
