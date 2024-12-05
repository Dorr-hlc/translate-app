// app/api/users/route.js





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
export async function Post(req: Request) {
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