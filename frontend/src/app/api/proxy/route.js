// app/api/proxy/route.js

function formatTree(node, prefix = '', isLast = true) {
  const lines = [];
  if (!node || typeof node !== 'object' || !node.name) return lines;

  const hasChildren = Array.isArray(node.contents) && node.contents.length > 0;
  const connector = prefix + (prefix ? (isLast ? '└── ' : '├── ') : '');
  lines.push(connector + node.name);

  if (hasChildren) {
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    node.contents.forEach((child, i) => {
      const isLastChild = i === node.contents.length - 1;
      lines.push(...formatTree(child, newPrefix, isLastChild));
    });
  }

  return lines;
}

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

      // Special handling for 'tree'
    if (command.trim().startsWith('tree')) {
      let formattedOutput;
      try {
        const treeJson = JSON.parse(data.message); // Parse the JSON structure
        const treeLines = formatTree(treeJson);
        formattedOutput = treeLines.join('\n'); // Join into a formatted string
      } catch (err) {
        formattedOutput = `Error parsing tree structure: ${err.message}`;
      }

      return new Response(JSON.stringify({ message: formattedOutput }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
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