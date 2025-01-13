import fs from 'fs';
import path from 'path';
const cheerio = require('cheerio');
import { getDomainName, getCheckUrl, directoryPath, convertDataGaToOnclick, replaceUrlWithPathname, baseLangDirectoryPath } from "@/utils/utils"

export async function POST(req: Request) {
    try {
        const reqBody = await req.json();
        const { head, headStr, body, noScript, pageType } = reqBody
        const { title, lang, description, keywords, canonical } = head
        const doctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//${lang.toUpperCase()}" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`;
        let defaultHtml = ''
        if (pageType === 1) {
            defaultHtml = `<!DOCTYPE html><html><head></head><body><noscript></noscript></body></html>`
        } else {
            defaultHtml = `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${lang}" lang="${lang}"><body></body></html>`;
        }
        const $ = cheerio.load(defaultHtml);
        $("head").append(headStr)
        $("noscript").html(noScript);
        $("body").append(body)
        $('html').attr('lang', lang)
        $('title').text(title);
        $('meta[name="description"]').attr('content', description);
        $('meta[name="keywords"]').attr('content', keywords);
        $('link[rel="canonical"]').attr('href', canonical);
        let html = ''
        let fileName: string = ''
        let checkUrl: string = ''
        if (pageType === 1) {
            if (canonical) {
                const url = new URL(canonical);
                const pathname = url.pathname;
                const domain = getDomainName(canonical);
                const pathParts = pathname.split('/');
                if (pathParts.length > 0) {
                    fileName = pathParts.pop() || 'index.html';
                    checkUrl = getCheckUrl(domain) + pathname;
                }

                if (domain) {
                    const filePathName = directoryPath(canonical, domain);
                    const baseLangDirectory = baseLangDirectoryPath(domain, lang)
                    // 定义 index.html 文件路径
                    const indexFilePath = path.join(baseLangDirectory, 'index.html');
                    let header = '';
                    let footer = '';
                    // 尝试读取 index.html 的内容
                    if (fs.existsSync(indexFilePath)) {
                        try {
                            const indexHtml = fs.readFileSync(indexFilePath, 'utf-8');
                            const $index = cheerio.load(indexHtml);

                            // 提取 header 和 footer 内容
                            header = $index('header').html() || '';
                            footer = $index('footer').html() || '';
                        } catch (err) {
                            console.error(`读取 ${indexFilePath} 时发生错误:`, err);
                        }
                    } else {
                        console.warn(`未找到 index.html 文件: ${indexFilePath}`);
                    }

                    // 插入提取的 header 和 footer
                    if (header) {
                        $('header').html(header);
                    }
                    if (footer) {
                        $('footer').html(footer);
                    }
                    $('.time_input').each(function (i: any, el: any) {
                        $(el).attr('type', 'hidden').removeClass('time_input');
                    });
                    convertDataGaToOnclick($, pathname)
                    replaceUrlWithPathname($)
                    html = $.html();
                    if (path.isAbsolute(filePathName)) {
                        const filePath = path.join(filePathName, fileName);
                        const dir = path.dirname(filePath);
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }
                        fs.writeFileSync(filePath, html);
                        console.log(`HTML 文件已保存到 ${filePath}`);
                    }
                    return new Response(JSON.stringify({ fileName, checkUrl, html }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
            }
        } else {
            const finalHtml = `${doctype}\n${$.html().replace("<!DOCTYPE html>", "")}`;

            fileName = `email-${lang}-${new Date().getTime()}.html`
            return new Response(JSON.stringify({ fileName, html: finalHtml }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Error processing request', info: error }),
            { status: 500 }
        );
    } finally {
        console.log('end.....');
    }
}
