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
    const domain = getDomain(url);
    if (domain === null) {
        throw new Error("Invalid URL: No domain found");
    }
    url = domain;
    switch (url) {
        case "www.fonetool.com":
            return "ft";
        case "www.ubackup.com":
            return "ub";
        case "www.diskpart.com":
            return "dp";
        case "partition.aomei.jp":
            return "pajp";
        case "www.anyviewer.com":
            return "av";
        case "aomei.fr":
            return "amfr";
        case "aomei.de":
            return "amde";
        case "aomei.jp":
            return "amjp";
        case "www.aomeitech.com":
            return "at";
        case "www.myrecover.com":
            return "mr";
        default:
            return "ub";
    }
}

// 获取根目录路径
export const firstLevelDirectory = (name: string) => {
    switch (name) {
        case "ub":
            return "I:\\AOMEI\\UB\\v1.0";
        case "dp":
            return "I:\\AOMEI\\DP\\v1.0";
        case "mr":
            return "I:\AOMEI\\MR\\v1.0";
        case "amde":
            return "I:\\AOMEI\\AMDE\\v1.0";
        case "amfr":
            return "I:\\AOMEI\\AMFR\\v1.0";
        case "amjp":
            return "I:\\AOMEI\\AMJP\\v1.0";
        case "at":
            return "I:\\AOMEI\\AT\\v1.0";
        case "av":
            return "I:\\AOMEI\\AV\\v1.0";
        case "pajp":
            return "I:\\AOMEI\\PAJP\\v1.0";
        default:
            return "";
    }
}


export const directoryPath = (str: string, domain: string) => {
    const url = new URL(str);
    const filePath = url.pathname;


    const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));
    console.log(directoryPath, 111);

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

export const getCheckUrl = (domain: string) => {
    switch (domain) {
        case "ub":
            return "http://192.168.0.92:1000"
        case "dp":
            return "http://192.168.0.92:1001"
        case "pajp":
            return "http://192.168.0.92:1002"
        case "at":
            return "http://192.168.0.92:1004"
        case "amde":
            return "http://192.168.0.92:1005"
        case "amfr":
            return "http://192.168.0.92:1006"
        case "amjp":
            return "http://192.168.0.92:1007"
        case "av":
            return "http://192.168.0.92:1008"
        case "ft":
            return "http://192.168.0.92:1009"
        default:
            return "http://192.168.0.92:1000"
    }
}
export const getGa4Code = (domain: string) => {
    switch (domain) {
        case "ub":
            return "GTM-MZWCC57"
        case "dp":
            return "GTM-MJTQD2B"
        case "pajp":
            return "GTM-NPMK9J8P"
        case "at":
            return "GTM-PGBVLN7"
        case "amde":
            return "GTM-KMZJWWJ"
        case "amfr":
            return "GTM-WZQFCSQ"
        case "amjp":
            return "GTM-KHPM9QP"
        case "av":
            return "GTM-PMPNGST"
        case "ft":
            return "GTM-K67JT4G"
        default:
            return "GTM-MZWCC57"
    }
}
export const replaceGa = ($: any, path: string, lang: string) => {

    lang = lang === "en" ? "" : "/" + lang;
    const replaceAttr = (selector: string, isOnClick: boolean) => {
        $(selector).each(function (i: any, element: any) {
            const attrName = isOnClick ? 'onclick' : 'data-ga';
            const attrValue = $(element).attr(attrName);
            if (attrValue) {

                const parts = attrValue.split(",");
                if (parts && parts.length > 0) {
                    const newPath = isOnClick ? `'${lang}/top-navi'` : `'${path}'`;
                    parts[parts.length - 1] = newPath;
                    $(element).attr(attrName, parts.join(","));
                }
            }
        });
    };
    replaceAttr('header [data-ga]', false);
    replaceAttr('footer [data-ga]', false);
    replaceAttr('header [onclick]', true);
    replaceAttr('footer [onclick]', true);
    replaceAttr('[data-ga]', false);
    replaceAttr('[onclick]', true);
};
