module.exports = {

"[project]/.next-internal/server/app/api/proxy/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/proxy/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/api/proxy/route.js
// Author: Justin Lee
// Description: API route for proxying command requests to the backend
__turbopack_context__.s({
    "POST": (()=>POST)
});
function formatTree(node, prefix = '', isLast = true) {
    const lines = [];
    if (!node || typeof node !== 'object' || !node.name) return lines;
    const hasChildren = Array.isArray(node.contents) && node.contents.length > 0;
    const connector = prefix + (prefix ? isLast ? '└── ' : '├── ' : '');
    lines.push(connector + node.name);
    if (hasChildren) {
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        node.contents.forEach((child, i)=>{
            const isLastChild = i === node.contents.length - 1;
            lines.push(...formatTree(child, newPrefix, isLastChild));
        });
    }
    return lines;
}
async function POST(req) {
    const { universeid, command } = await req.json();
    try {
        const res = await fetch('https://backend-4na6.onrender.com/command/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.BACKEND_API_KEY
            },
            body: JSON.stringify({
                universeid,
                command
            })
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
            return new Response(JSON.stringify({
                message: formattedOutput
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return new Response(JSON.stringify(data), {
            status: res.status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({
            error: err.message
        }), {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__ce76a441._.js.map