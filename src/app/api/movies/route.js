// app/api/users/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // 查询 users 集合中的所有用户数据
    const users = await prisma.user.findMany();

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
    await prisma.$disconnect(); // 确保 Prisma 客户端连接关闭
  }
}
