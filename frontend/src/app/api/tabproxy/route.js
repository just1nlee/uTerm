// app/api/tabproxy/route.js

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const universeid = searchParams.get('universeid');
    const command = searchParams.get('command');
  
    try {
      const res = await fetch(`https://backend-4na6.onrender.com/tab/?universeid=${universeid}&command=${encodeURIComponent(command)}`, {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.BACKEND_API_KEY,
        },
      });
  
      const data = await res.json();
  
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    }
  }