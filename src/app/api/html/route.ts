// app/api/users/route.js





export async function GET(req: Request) {
    try {
        // 查询 users 集合中的所有用户数据
        const users = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <script src="/assets/lib/amt.min.js"></script>
            <link rel="stylesheet" href="/assets/aa.css" />
          </head>
          <body>
            <h1>Hello world</h1>
            <img src="/assets/aa.png" alt />
            <img src="https://wwww.baidu.com/assets/images/pp.png" alt />
            <script src="/ass.js"></script>
          </body>
        </html>`;

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
