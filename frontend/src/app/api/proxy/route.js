// app/api/proxy/route.js
export async function POST(req) {
    const { universeid, command } = await req.json();
  
    try {
      const res = await fetch('https://backend-4na6.onrender.com/command/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.BACKEND_API_KEY, // Use env var
        },
        body: JSON.stringify({
          universeid,
          command,
        }),
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