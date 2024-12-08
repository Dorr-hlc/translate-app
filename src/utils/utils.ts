import { saveAs } from "file-saver";
const path = require('path');  // 引入 path 模块

interface DownloadHtmlProps {
    blob: Blob;
    fileName: string;
}

export const isValidURL = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export const downloadHtmls = (blob: Blob, fileName?: string): DownloadHtmlProps => {
    saveAs(blob, fileName || "download.html");
    return { blob, fileName: fileName || "download.html" };
};

export const getDomain = (url: string) => {
    const regex = /^(https?:\/\/)?([^\/]+)/i;
    const matches = url.match(regex);
    return matches && matches[2] ? matches[2] : null;
}

export const getDomainName = (url: string) => {
    switch (url) {
        case "https://www.fonetool.com":
            return "ft";
        default:
            return "ub";
    }
}

// 获取根目录路径
export const firstLevelDirectory = (name: string) => {
    const baseDirectory = "E:\\aomei";
    switch (name) {
        case "ft":
            return baseDirectory;
        default:
            return baseDirectory;
    }
}


export const directoryPath = (str: string, domain: string) => {
    const url = new URL(str);
    const filePath = url.pathname;


    const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));
    const windowsPath = directoryPath.replace(/\//g, '\\');


    const baseDirectory = firstLevelDirectory(domain);

    return path.join(baseDirectory, windowsPath);
}


export const checkAndAppendCss = async (cssFiles: string[]): Promise<boolean> => {
    const cssLinks = cssFiles[cssFiles.length - 1];
    try {
        const response = await fetch(cssLinks);
        if (!response.ok) {
            return false;
        }
    } catch (error) {
        return false;
    }
    return true;
};