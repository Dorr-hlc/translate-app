import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { Editor } from "grapesjs";
import emailPlugin from "grapesjs-preset-newsletter";
import normalPlugin from "grapesjs-preset-webpage";
import zh from "grapesjs/locale/zh";
import { useRouter } from "next/navigation";
interface EmailEditorProps {
  cssFiles: string[];
  bodyStr: string;
  pageType: number;
  getCurrentHtml: (bodyHtml: string) => void;
  save: boolean;
  openErrorPop: (isResource: boolean) => void;
}

const extendAllComponents = (editor: any) => {
  const domComponents = editor.DomComponents;
  domComponents.getTypes().forEach((type: any) => {
    const defaultModel = domComponents.getType(type.id).model;

    domComponents.addType(type.id, {
      model: defaultModel.extend({
        init() {
          this.listenTo(
            this,
            "change:attributes:data-expires",
            this.updateTraits
          );
          this.listenTo(
            this,
            "change:attributes:data-avpro",
            this.updateTraits
          );
          this.updateTraits();
        },

        // 动态更新 traits
        updateTraits() {
          const hasDataExpires = !!this.getAttributes()["data-expires"];
          const hasDataAvpro = !!this.getAttributes()["data-avpro"];
          const existingTraits = this.get("traits") || [];

          const hasDataExpiresTrait = existingTraits.some(
            (trait: any) => trait.name === "data-expires"
          );
          const hasDataAvproTrait = existingTraits.some(
            (trait: any) => trait.name === "data-avpro"
          );

          const updatedTraits = [...existingTraits];

          if (hasDataExpires && !hasDataExpiresTrait) {
            updatedTraits.push({
              type: "text",
              label: "Expires",
              name: "data-expires",
            });
          }

          if (hasDataAvpro && !hasDataAvproTrait) {
            updatedTraits.push({
              type: "text",
              label: "AV自定义链接",
              name: "data-avpro",
            });
          }

          this.set({ traits: updatedTraits });
        },
      }),
    });
  });
};

const extendLinkComponent = (editor: any) => {
  const domComponents = editor.DomComponents;

  domComponents.addType("link", {
    model: {
      defaults: {
        attributes: {
          href: "#",
          target: "_self",
        },
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
            ],
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
            label: "width",
            name: "width",
            placeholder: "例如: 100px",
          },
          {
            type: "number",
            label: "height",
            name: "height",
            placeholder: "例如: 100px",
          },
          {
            type: "text",
            label: "src",
            name: "src",
          },
          ...editor.DomComponents.getType("image").model.prototype.defaults
            .traits,
        ],
      },
    },
  });
};

const EmailEditor = ({
  pageType,
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

  function modifyElements(editor: Editor) {
    const canvasBody = editor.Canvas.getDocument().body;
    canvasBody.classList = "isEdit";
  }

  const updateChange = (editor: Editor) => {
    let updatedHtml = null;
    if (pageType === 1) {
      updatedHtml = editor.getHtml();
    } else {
      updatedHtml = editor.Commands.run("gjs-get-inlined-html");  
    }
    getCurrentHtml(updatedHtml);
  };

  useEffect(() => {
    let plugin = null;
    let pluginsOpts = null;

    if (pageType === 1) {
      plugin = normalPlugin;
      pluginsOpts = {
        modalImportTitle: "导入",
        modalImportButton: "导入",
        textCleanCanvas: "清除所有内容？",
      };
    } else {
      plugin = emailPlugin;
      pluginsOpts = {};
    }
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
      plugins: [
        plugin,
        extendAllComponents,
        extendImgComponent,
        extendLinkComponent,
        resetEditor,
      ],
      pluginsOpts: {
        [plugin as any]: pluginsOpts,
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
