declare module "grapesjs/locale/zh" {
    const zh: any;
    export default zh;
}


declare module 'grapesjs' {
    export type Editor = {
        on(arg0: string, arg1: () => void): unknown;
        Panels: any;
        BlockManager: any;
        // 其他方法和属性声明
        init: (options: any) => Editor;
        Commands: any;
        addComponents: (components: any) => void;
        getHtml: () => string;
        destroy: () => void;
    };

    const grapesjs: {
        init: (options: any) => Editor;
    };

    export default grapesjs;
}
