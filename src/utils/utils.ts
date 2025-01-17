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
        case "ft":
            return "I:\\AOMEI\\FT\\v1.0";
        default:
            return "";
    }
}
export const baseLangDirectoryPath = (domain: string, lang: string) => {
    const baseDirectory = firstLevelDirectory(domain);
    let langStr = ""
    if (lang === 'en') {
        langStr = ""
    } else {
        langStr = lang
    }

    return path.join(baseDirectory, langStr);
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

/**
 * 将含有 onclick 的 <a> 标签的 GA 调用转换为 data-ga 属性
 * 并移除 onclick 属性
 * 
 * @param {string} selector - 要处理的 DOM 元素选择器
 */
export const convertParamsToData = ($: any, resourcePrefix: string) => {
    const cssFiles: string[] = [];
    $("link[href]").each((i: any, el: any) => {
        const currentHref = $(el).attr("href");
        if (!currentHref?.startsWith("http")) {
            $(el).attr("href", resourcePrefix + currentHref);
        }
    });
    $("img[src]").each((i: any, el: any) => {
        const currentSrc = $(el).attr("src");
        if (!currentSrc?.startsWith("http")) {
            $(el).attr("src", resourcePrefix + currentSrc);
        }
    });
    $("source[srcset]").each((i: any, el: any) => {
        const currentSrc = $(el).attr("srcset");
        if (!currentSrc?.startsWith("http")) {
            $(el).attr("srcset", resourcePrefix + currentSrc);
        }
    });
    $("head link[rel='stylesheet']").each((i: any, el: any) => {
        const href = $(el).attr("href");
        if (href) {
            cssFiles.push(href);
        }
    });
    $('[onclick]').each((_: any, element: HTMLElement) => {
        const $this = $(element);
        const onclickValue = $this.attr('onclick');

        // 匹配 ga() 和 gtag() 的不同格式
        const gaMatch = onclickValue?.match(/ga\([^,]+,[^,]+,(.*)\)/);
        const gtagMatch = onclickValue?.match(/gtag\('event',\s*'([^']+)',\s*{.*'event_category':\s*'([^']+)',.*'event_label':\s*'([^']+)'/);

        if (gaMatch?.[1]) {
            // 处理 ga() 格式
            const gaParams = gaMatch[1].trim();
            $this.attr('data-ga', gaParams);
            $this.removeAttr('onclick');
        } else if (gtagMatch) {
            // 处理 gtag() 格式
            const eventCategory = gtagMatch[2].trim();
            const eventAction = gtagMatch[1].trim();
            const eventLabel = gtagMatch[3].trim();

            const dataGaValue = `'${eventCategory}', '${eventAction}', '${eventLabel}'`;
            $this.attr('data-ga', dataGaValue);
            $this.removeAttr('onclick');
        }
    });

    return cssFiles
}

/**
 * 将含有 data-ga 属性的元素还原为 onclick，并添加 'send', 'event'
 * 
 * @param {string} selector - 要处理的 DOM 元素选择器
 */
export const convertDataGaToOnclick = ($: any, pathname: string): void => {
    $('[data-ga]').each((i: any, el: any) => {
        const $this = $(el);
        const dataGaValue = $this.attr('data-ga');
        if (dataGaValue) {
            const gaArray = dataGaValue.split(',');
            gaArray[gaArray.length - 1] = `'${pathname}'`;
            const updatedDataGaValue = gaArray.join(',');
            $this.attr('data-ga', updatedDataGaValue);
        }
    });
};



/**
 * 替换页面中 link, img, script 标签的 src 或 href 属性
 * 将符合条件的 URL 替换为路径部分
 * 
 * @param {cheerio.Root} $ - cheerio 实例
 */
export const replaceUrlWithPathname = ($: any): void => {
    $('link, img, script').each((index: number, element: any) => {
        const attrName = $(element).is('link') ? 'href' : 'src';
        const url = $(element).attr(attrName);
        if (url && url.startsWith('http://192.168')) {
            const newPath = new URL(url).pathname;
            $(element).attr(attrName, newPath);
        }
    });
};


export const commitSvn = (exec: any, filePath: string) => {
    // 检查文件状态
    exec(`svn status I:\\AOMEI\\FT\\v1.0\\`, { encoding: 'utf8' }, (err: any, stdout: any, stderr: any) => {
        if (err) {
            console.error('Error during svn status:', stderr);
            return;
        }

        // 判断文件状态
        const status = stdout.trim();
        console.log(status, 1111);

        if (!status) {
            console.log(`No changes detected for file: ${filePath}`);
            return;
        }

        // 文件状态可能为: 'M' (已修改), '?' (未添加), 'C' (冲突), 等
        const statusCode = status[0];
        if(statusCode){
            exec(`svn commit -m "Commit ${filePath}" ${filePath}`, (commitErr: any, commitStdout: any, commitStderr: any) => {
                if (commitErr) {
                    console.error('Error during svn commit:', commitStderr);
                    return;
                }
                console.log('文件已提交svn:', commitStdout);
            });
        }
        if (['M'].includes(statusCode)) {
            // 提交文件
            exec(`svn commit -m "Commit ${filePath}" ${filePath}`, (commitErr: any, commitStdout: any, commitStderr: any) => {
                if (commitErr) {
                    console.error('Error during svn commit:', commitStderr);
                    return;
                }
                console.log('文件已提交svn:', commitStdout);
            });
        }


        if (['?'].includes(statusCode)) {
            exec(`svn add ${filePath}`, { encoding: 'utf8' }, (addErr: any, addStdout: any, addStderr: any) => {
                if (addErr) {
                    console.error('Error during svn add:', addStderr);
                    return;
                }

                console.log('Add Result:', addStdout);

                // 提交文件
                exec(`svn commit -m "Commit ${filePath}" ${filePath}`, (commitErr: any, commitStdout: any, commitStderr: any) => {
                    if (commitErr) {
                        console.error('Error during svn commit:', commitStderr);
                        return;
                    }
                    console.log('文件已提交svn:', commitStdout);
                });
            });

        }
    });
};
