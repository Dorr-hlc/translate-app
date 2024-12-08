import fs from 'fs';
import path from 'path';
const cheerio = require('cheerio');
import { getDomain, directoryPath } from "@/utils/utils"

export async function POST(req: Request) {
    try {
        const reqBody = await req.json();
        const { head, headStr, body, scriptStr } = reqBody
        const defaultHtml = `<!DOCTYPE html><html><head></head><body></body></html>
        `

        const $ = cheerio.load(defaultHtml);
        const { title, lang, description, keywords, canonical } = head
        $("head").append(headStr)
        $("body").append(body)
        $("body").append(scriptStr)
        $('html').attr('lang', lang)
        $('title').text(title);
        $('meta[name="description"]').attr('content', description);
        $('meta[name="keywords"]').attr('content', keywords);
        $('link[rel="canonical"]').attr('href', canonical);


        let html = ''
        let fileName: string = ''
        let checkUrl: string = ''
        if (canonical) {
            const url = new URL(canonical);
            const pathname = url.pathname;
            const pathParts = pathname.split('/');
            if (pathParts.length > 0) {
                fileName = pathParts.pop() || 'index.html';
                checkUrl = "http://192.168.0.92:5502" + pathname;
            }

        } else {
            console.log('No canonical link found.');
        }

        $('link,img, script').each((index: any, element: any) => {
            const attrName = $(element).is('link') ? 'href' : 'src';
            const url = $(element).attr(attrName);
            if (url && url.startsWith('http://192.168')) {
                const newPath = new URL(url).pathname;
                $(element).attr(attrName, newPath);
            }
        });

        html = $.html();


        const domain = getDomain(canonical);
        if (domain) {
            const filePathName = directoryPath(canonical, domain);
            if (path.isAbsolute(filePathName)) {
                const filePath = path.join(filePathName, fileName);
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                fs.writeFileSync(filePath, html);
                console.log(`HTML 文件已保存到 ${filePath}`);
            }
        }
        return new Response(JSON.stringify({ fileName, checkUrl, html }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
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
