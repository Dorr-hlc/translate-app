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

const extendLinkComponent = (editor: any) => {
  const domComponents = editor.DomComponents;

  domComponents.addType("link", {
    model: {
      defaults: {
        // 默认属性
        attributes: {
          href: "#",
          target: "_self",
          "data-avpro": "",
        },
        // 自定义属性面板
        traits: [
          {
            type: "text",
            label: "Href",
            name: "href",
          },
          {
            type: "select",
            label: "Target",
            name: "target",
            options: [
              { value: "_self", name: "Self" },
              { value: "_blank", name: "Blank" },
              { value: "_parent", name: "Parent" },
              { value: "_top", name: "Top" },
            ],
          },
          {
            type: "text",
            label: "Data AVPro",
            name: "data-avpro",
          },
        ],
      },
    },
  });
};

const extendImgComponent = (editor: any) => {
  const domComponents = editor.DomComponents;
  domComponents.addType("image", {
    model: {
      defaults: {
        traits: [
          {
            type: "number",
            label: "宽度",
            name: "width",
            placeholder: "例如: 100px",
          },
          {
            type: "number",
            label: "高度",
            name: "height",
            placeholder: "例如: 100px",
          },
          ...editor.DomComponents.getType("image").model.prototype.defaults
            .traits,
        ],
      },
    },
  });
};

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

      modifyElements(editor);
    });
  };

  // 修改页面中元素的 display 样式
  function modifyElements(editor: Editor) {
    const canvasBody = editor.Canvas.getDocument().body;
    canvasBody.classList = "isEdit";
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
      allowScripts: true,
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
      canvas: {
        styles: cssFiles,
      },
    });

    extendImgComponent(editor);
    extendLinkComponent(editor)
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
    if (save) {
      updateChange(editorRef.current);
    }
  }, [save]);

  return <div id="gjs"></div>;
};

export default EmailEditor;
