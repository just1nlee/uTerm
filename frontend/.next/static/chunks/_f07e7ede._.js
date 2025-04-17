(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_f07e7ede._.js", {

"[project]/src/app/components/TerminalWindow.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TerminalWindow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function TerminalWindow({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-screen bg-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[912px] aspect-[912/610] border-[2px] border-bone flex items-center justify-center relative overflow-hidden rounded-[6px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 z-40 bg-black animate-line-wipe pointer-events-none opacity-0 rounded-[4px]"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/TerminalWindow.js",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/TerminalWindow.js",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/TerminalWindow.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = TerminalWindow;
var _c;
__turbopack_context__.k.register(_c, "TerminalWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/terminal/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Author:
// Description: 
__turbopack_context__.s({
    "default": (()=>TerminalPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$TerminalWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/TerminalWindow.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TerminalPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const terminalContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [universeID, setUniverseID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [autoScroll, setAutoScroll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [welcomeTyped, setWelcomeTyped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cursorBlink, setCursorBlink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [cursorPosition, setCursorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [treeOutput, setTreeOutput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLocked, setIsLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isLockedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Ref to lock input after a command has been entered to avoid multiple requests
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalPage.useEffect": ()=>{
            isLockedRef.current = isLocked;
        }
    }["TerminalPage.useEffect"], [
        isLocked
    ]);
    // Welcome message text
    const welcomeMessage = `
░▒▓█ welcome to uTerm, a terminal-based universe explorer

Type 'help' to see available commands.
Type 'exit' to return to the homepage.

`;
    // 
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalPage.useEffect": ()=>{
            const storedID = sessionStorage.getItem('universeID');
            if (storedID) {
                setUniverseID(parseInt(storedID, 10));
            } else {
                console.warn('No universeID found in sessionStorage');
            }
            // Type out welcome message only once
            if (!welcomeTyped) {
                let currentText = '';
                const lines = welcomeMessage.split('\n');
                let currentLine = 0;
                let currentChar = 0;
                const typeInterval = setInterval({
                    "TerminalPage.useEffect.typeInterval": ()=>{
                        if (currentLine < lines.length) {
                            if (currentChar < lines[currentLine].length) {
                                currentText += lines[currentLine][currentChar];
                                setHistory([
                                    currentText
                                ]);
                                currentChar++;
                            } else {
                                currentText += '\n';
                                currentLine++;
                                currentChar = 0;
                            }
                        } else {
                            clearInterval(typeInterval);
                            setWelcomeTyped(true);
                        }
                    }
                }["TerminalPage.useEffect.typeInterval"], 30); // Adjust typing speed here
                return ({
                    "TerminalPage.useEffect": ()=>clearInterval(typeInterval)
                })["TerminalPage.useEffect"];
            }
        }
    }["TerminalPage.useEffect"], [
        welcomeTyped
    ]);
    // Blinking cursor effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalPage.useEffect": ()=>{
            const blinkInterval = setInterval({
                "TerminalPage.useEffect.blinkInterval": ()=>{
                    setCursorBlink({
                        "TerminalPage.useEffect.blinkInterval": (prev)=>!prev
                    }["TerminalPage.useEffect.blinkInterval"]);
                }
            }["TerminalPage.useEffect.blinkInterval"], 530); // Cursor blink rate
            return ({
                "TerminalPage.useEffect": ()=>clearInterval(blinkInterval)
            })["TerminalPage.useEffect"];
        }
    }["TerminalPage.useEffect"], []);
    // Update cursor position when input changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalPage.useEffect": ()=>{
            if (inputRef.current) {
                setCursorPosition(inputRef.current.selectionStart);
            }
        }
    }["TerminalPage.useEffect"], [
        input
    ]);
    // Auto-scroll logic for reversed terminal (scrolls to top)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalPage.useEffect": ()=>{
            if (terminalContentRef.current && autoScroll) {
                terminalContentRef.current.scrollTop = 0;
            }
        }
    }["TerminalPage.useEffect"], [
        history
    ]);
    // Handles scrolling event
    const handleScroll = ()=>{
        if (terminalContentRef.current) {
            const isScrolledToTop = terminalContentRef.current.scrollTop < 10;
            setAutoScroll(isScrolledToTop);
        }
    };
    // Formats tree command output for display
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
    async function handleKeyDown(e) {
        setCursorPosition(e.target.selectionStart);
        if (e.key === 'Tab') {
            e.preventDefault();
            const trimmedInput = input.trim();
            let data;
            let output;
            try {
                const res = await fetch(`/api/tabproxy?universeid=${universeID}&command=${encodeURIComponent(trimmedInput)}`, {
                    method: 'GET'
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    output = `Error ${res.status}: ${errorData.detail || 'unknown error'}`;
                    setHistory((prev)=>[
                            ...prev,
                            output,
                            `* ${input}`
                        ]);
                    return;
                } else {
                    data = await res.json();
                }
            } catch (err) {
                output = `Client error: ${err.message}`;
                setHistory((prev)=>[
                        ...prev,
                        `* ${input}`,
                        output
                    ]);
                return;
            }
            const suggestions = data.message;
            if (Array.isArray(suggestions)) {
                if (suggestions.length === 1) {
                    setInput(suggestions[0]);
                } else if (suggestions.length > 1) {
                    setHistory((prev)=>[
                            suggestions.join('  '),
                            `* ${input}`,
                            ...prev
                        ]);
                } else {
                    setHistory((prev)=>[
                            `* ${input}`,
                            'No suggestions',
                            ...prev
                        ]);
                }
                setAutoScroll(true);
            }
        }
    }
    async function handleCommands(e) {
        e.preventDefault();
        if (isLockedRef.current) return;
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        setIsLocked(true);
        let output = '';
        try {
            const [cmd, ...args] = trimmedInput.split(' ');
            if (cmd === 'clear') {
                setHistory([]);
                setInput('');
                return;
            }
            if (builtInCommands[cmd]) {
                try {
                    output = await builtInCommands[cmd].fn(...args);
                    if (output === '') {
                        setHistory((prev)=>[
                                `* ${input}`,
                                ...prev
                            ]);
                        setInput('');
                    } else {
                        setHistory((prev)=>[
                                output,
                                `* ${input}`,
                                ...prev
                            ]);
                        setInput('');
                    }
                } catch (err) {
                    output = `Error executing command "${cmd}": ${err.message}`;
                    setHistory((prev)=>[
                            output,
                            `* ${input}`,
                            ...prev
                        ]);
                    setInput('');
                }
                return;
            }
            // External command
            const res = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    universeid: universeID,
                    command: trimmedInput
                })
            });
            if (!res.ok) {
                const errorData = await res.json();
                output = `Error ${res.status}: ${errorData.detail || 'unknown error'}`;
            } else {
                const data = await res.json();
                if (cmd === 'tree') {
                    try {
                        output = data.message; // this is the plain text tree
                        setHistory((prev)=>[
                                output,
                                `* ${input}`,
                                ...prev
                            ]);
                    } catch (err) {
                        setHistory((prev)=>[
                                `Error parsing tree response: ${err.message}`,
                                `Response was: ${data.message}`,
                                `* ${input}`,
                                ...prev
                            ]);
                    } finally{
                        setInput('');
                        setAutoScroll(true);
                    }
                    return;
                } else {
                    output = data.message || JSON.stringify(data);
                }
            }
            setHistory((prev)=>[
                    output,
                    `* ${input}`,
                    ...prev
                ]);
            setInput('');
            setAutoScroll(true);
        } catch (err) {
            setHistory((prev)=>[
                    `Error: ${err.message}`,
                    `* ${input}`,
                    ...prev
                ]);
            setInput('');
        } finally{
            setIsLocked(false);
        }
    }
    // Focus input on mount and when terminal is clicked
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalPage.useEffect": ()=>{
            inputRef.current?.focus();
        }
    }["TerminalPage.useEffect"], []);
    const handleTerminalClick = ()=>{
        inputRef.current?.focus();
    };
    const scrollToTop = ()=>{
        if (terminalContentRef.current) {
            terminalContentRef.current.scrollTop = 0;
        }
        setAutoScroll(true);
    };
    // Define the fixed order for commands.
    const commandOrder = [
        'help',
        'info',
        'clear',
        'bigbang',
        'ls',
        'tree',
        'pwd',
        'cd',
        'cat',
        'echo',
        'exit'
    ];
    const helpInfo = {
        help: {
            description: 'List commands.',
            usage: 'help'
        },
        info: {
            description: 'Display information about current directory.',
            usage: 'info'
        },
        clear: {
            description: 'Clear terminal history.',
            usage: 'clear'
        },
        bigbang: {
            description: 'Reset the universe.',
            usage: 'bigbang'
        },
        ls: {
            description: 'List files and directories.',
            usage: 'ls [options] [path]'
        },
        tree: {
            description: 'Display explored universe.',
            usage: 'tree'
        },
        pwd: {
            description: 'Print working directory.',
            usage: 'pwd'
        },
        cd: {
            description: 'Change directory.',
            usage: 'cd <directory>'
        },
        cat: {
            description: 'Display file contents.',
            usage: 'cat <filename>'
        },
        echo: {
            description: 'Echo a passed string.',
            usage: 'echo <string>'
        },
        exit: {
            description: 'Exit the terminal and return to homepage.',
            usage: 'exit'
        }
    };
    let builtInCommands = {
        help: {
            description: 'List commands.',
            usage: 'help',
            fn: ()=>{
                // Build help output using our helpInfo object.
                const descriptions = commandOrder.map((cmd)=>{
                    const info = helpInfo[cmd];
                    return `${cmd.padEnd(10)} - ${info.description}\n`;
                });
                return descriptions;
            }
        },
        clear: {
            description: 'Clear terminal history.',
            usage: 'clear',
            fn: ()=>{
                setHistory([]);
                return '';
            }
        },
        echo: {
            description: 'Echo a passed string.',
            usage: 'echo <string>',
            fn: (...args)=>args.join(' ')
        },
        exit: {
            description: 'Exit the terminal and return to homepage.',
            usage: 'exit',
            fn: ()=>router.push('/')
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$TerminalWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full w-full bg-black text-bone",
            onClick: handleTerminalClick,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: terminalContentRef,
                    className: "flex-1 overflow-y-auto px-8 pb-2 flex flex-col-reverse",
                    onScroll: handleScroll,
                    children: history.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full text-left text-xl text-bone whitespace-pre-wrap mb-1 leading-none",
                            children: line
                        }, i, false, {
                            fileName: "[project]/src/app/terminal/page.js",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/terminal/page.js",
                    lineNumber: 327,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full px-8 py-4 bg-black mt-auto border-t border-gray-800",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleCommands,
                        className: "flex w-full text-xl items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-2 text-white",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/src/app/terminal/page.js",
                                lineNumber: 345,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 relative min-h-[1.5rem]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "whitespace-pre",
                                                children: input.substring(0, cursorPosition)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/terminal/page.js",
                                                lineNumber: 350,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `h-5 w-2 bg-bone inline-block align-middle ${cursorBlink ? 'opacity-100' : 'opacity-0'}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/terminal/page.js",
                                                lineNumber: 351,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "whitespace-pre",
                                                children: input.substring(cursorPosition)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/terminal/page.js",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: inputRef,
                                                className: "opacity-0 absolute top-0 left-0 w-full h-full bg-transparent border-none outline-none text-xl",
                                                value: input,
                                                onChange: (e)=>{
                                                    if (isLockedRef.current) return;
                                                    setInput(e.target.value);
                                                    setCursorPosition(e.target.selectionStart);
                                                },
                                                onKeyDown: (e)=>{
                                                    handleKeyDown(e);
                                                    setCursorPosition(e.target.selectionStart);
                                                },
                                                onClick: (e)=>{
                                                    if (isLockedRef.current) return;
                                                    setCursorPosition(e.target.selectionStart);
                                                },
                                                onSelect: (e)=>{
                                                    if (isLockedRef.current) return;
                                                    setCursorPosition(e.target.selectionStart);
                                                },
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/terminal/page.js",
                                                lineNumber: 355,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/terminal/page.js",
                                        lineNumber: 349,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/terminal/page.js",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/terminal/page.js",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/terminal/page.js",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/terminal/page.js",
                    lineNumber: 343,
                    columnNumber: 9
                }, this),
                !autoScroll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: scrollToTop,
                    className: "absolute top-16 right-8 bg-bone text-black text-sm px-2 py-1 rounded opacity-50 hover:opacity-100",
                    children: "↑ Scroll to newest"
                }, void 0, false, {
                    fileName: "[project]/src/app/terminal/page.js",
                    lineNumber: 386,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/terminal/page.js",
            lineNumber: 322,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/terminal/page.js",
        lineNumber: 321,
        columnNumber: 5
    }, this);
}
_s(TerminalPage, "JZnA2OU13hTJgun9TR0GEyfCy7M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TerminalPage;
var _c;
__turbopack_context__.k.register(_c, "TerminalPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    }, specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, Error("react-stack-top-frame"), createTask(getTaskName(type)));
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_f07e7ede._.js.map