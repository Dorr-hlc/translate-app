export async function GET(req) {
    return new Response(JSON.stringify({ message: 'Hello, World!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
