import fs from "fs";

const file = "src/ui/mapView.maplibre.js";
const src = fs.readFileSync(file, "utf8");

let line = 1, col = 0;
let depth = 0;

let inSQuote = false, inDQuote = false, inTemplate = false;
let inLineComment = false, inBlockComment = false;
let escape = false;

const opens = []; // stack: { line, col }

function pushOpen() { opens.push({ line, col }); }
function popOpen() { opens.pop(); }

for (let i = 0; i < src.length; i++) {
  const ch = src[i];
  const next = src[i + 1] || "";

  if (ch === "\n") {
    line++;
    col = 0;
    inLineComment = false;
    continue;
  }
  col++;

  if (!inSQuote && !inDQuote && !inTemplate) {
    if (!inBlockComment && !inLineComment && ch === "/" && next === "/") {
      inLineComment = true; i++; col++; continue;
    }
    if (!inBlockComment && !inLineComment && ch === "/" && next === "*") {
      inBlockComment = true; i++; col++; continue;
    }
    if (inBlockComment && ch === "*" && next === "/") {
      inBlockComment = false; i++; col++; continue;
    }
  }
  if (inLineComment || inBlockComment) continue;

  if (escape) { escape = false; continue; }
  if (ch === "\\") { escape = true; continue; }

  if (!inDQuote && !inTemplate && ch === "'") { inSQuote = !inSQuote; continue; }
  if (!inSQuote && !inTemplate && ch === '"') { inDQuote = !inDQuote; continue; }
  if (!inSQuote && !inDQuote && ch === "`") { inTemplate = !inTemplate; continue; }

  if (inSQuote || inDQuote || inTemplate) continue;

  if (ch === "{") { depth++; pushOpen(); }
  if (ch === "}") { depth--; popOpen(); }
}

console.log("FINAL:", {
  depth,
  lastOpen: opens[opens.length - 1] || null,
  openCount: opens.length
});

if (opens.length) {
  console.log("LAST OPEN BRACES:");
  console.log(opens.slice(-5));
}