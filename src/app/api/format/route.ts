const cheerio = require('cheerio');
import { getDomain, getDomainName, getCheckUrl, directoryPath, replaceGa, getGa4Code } from "@/utils/utils"

export async function GET(req: Request) {
    try {
        // 查询 users 集合中的所有用户数据
        const users = `测试接口111111111111111111111111111111111111`;

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Error fetching users', info: error }),
            { status: 500 }
        );
    } finally {
        console.log('end.....');
    }
}
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

        const scriptStr: string[] = []
        const cssFiles: string[] = [];
        const domain = getDomainName(canonical);
        const resourcePrefix = getCheckUrl(domain);
        $("link[href]").each((i: any, el: any) => {
            const currentHref = $(el).attr("href");
            if (!currentHref.startsWith("http")) {
                $(el).attr("href", resourcePrefix + currentHref);
            }
        });
        $("img[src]").each((i: any, el: any) => {
            const currentSrc = $(el).attr("src");
            if (!currentSrc.startsWith("http")) {
                $(el).attr("src", resourcePrefix + currentSrc);
            }
        });
        $("source[srcset]").each((i: any, el: any) => {
            const currentSrc = $(el).attr("srcset");
            if (!currentSrc.startsWith("http")) {
                $(el).attr("srcset", resourcePrefix + currentSrc);
            }
        });
        $("head link[rel='stylesheet']").each((i: any, el: any) => {
            cssFiles.push($(el).attr("href"));
        });
        scripts.each((i: any, el: any) => {
            const scriptContent = $.html(el);
            scriptStr.push(scriptContent)
        });
        $('noscript').remove();

        $('body *').not('header').not('footer').each(function (i: any, el: any) {
            const $element = $(el);
            if ($element.css('display') === 'none') {
                $element.css('display', 'block');
            }
        });
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
            scriptStr: scriptStr
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
