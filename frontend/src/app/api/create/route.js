// app/api/create/route.js

export async function POST(req) {
    const { temperature } = await req.json();
  
    try {
      const res = await fetch('https://backend-4na6.onrender.com/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.BACKEND_API_KEY,
        },
        body: JSON.stringify({ temperature }),
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