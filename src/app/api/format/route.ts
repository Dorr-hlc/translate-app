const cheerio = require('cheerio');
import { getDomainName, getCheckUrl, convertParamsToData } from "@/utils/utils"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { htmlStr } = body
        const $ = cheerio.load(htmlStr);
        const lang = $('html').attr('lang')
        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const keywords = $('meta[name="keywords"]').attr('content');
        const canonical = $('link[rel="canonical"]').attr('href');
        const scripts = $('body').find('script');
        const noScript = $('body').find('noscript').html() || '';
        const scriptStr: string[] = []
        const domain = getDomainName(canonical);
        const resourcePrefix = getCheckUrl(domain);
        const cssFiles = convertParamsToData($, resourcePrefix)
        scripts.each((i: any, el: any) => {
            const scriptContent = $.html(el);
            scriptStr.push(scriptContent)
        });
        $('noscript').remove();

        const headStr = $("head").html()
        const bodyStr = $('body').html()
        const htmlStrObj = {
            headContnent: {
                lang,
                title,
                description,
                keywords,
                canonical,

            },
            headStr: headStr,
            bodyStr: bodyStr,
            cssFiles: cssFiles,
            scriptStr: scriptStr,
            noScript: noScript
        }


        return new Response(JSON.stringify(htmlStrObj), {
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
