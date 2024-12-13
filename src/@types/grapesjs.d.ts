declare module "grapesjs/locale/zh" {
    const zh: any;
    export default zh;
}


declare module 'grapesjs' {
    export type Editor = {
        on(event: string, callback: (event: any) => void): void;
        Panels: any;
        BlockManager: any;
        init: (options: any) => Editor;
        Commands: any;
        CssComposer: any,
        Canvas: any,
        addComponents: (components: any) => void;
        setStyle: (css: string) => void;
        getHtml: () => string;
        getCss: () => string;
        destroy: () => void;
        getSelected: () => any;
        select: (component: any) => void;
        DomComponents: any;
    };

    const grapesjs: {
        init: (options: any) => Editor;
    };

    export default grapesjs;
}
