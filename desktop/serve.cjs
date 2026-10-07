const http = require("node:http");
const { execFile } = require("node:child_process");
const { readFile, stat } = require("node:fs/promises");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 4173;
const CONTENT_ROOT = path.resolve(__dirname, "..", "out");
const OPEN_BROWSER = process.argv.includes("--open");
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://img.pokemondb.net data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "form-action 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

function openBrowser(url) {
  const launcher =
    process.platform === "win32"
      ? { command: "cmd.exe", args: ["/c", "start", "", url] }
      : process.platform === "darwin"
        ? { command: "open", args: [url] }
        : { command: "xdg-open", args: [url] };

  const child = execFile(
    launcher.command,
    launcher.args,
    { windowsHide: true },
    (error) => {
      if (error) {
        console.warn(`Could not open the default browser automatically. Open ${url} manually.`);
      }
    },
  );
  child.unref();
}

function sendError(response, status, message) {
  response.writeHead(status, {
    "Content-Security-Policy": CONTENT_SECURITY_POLICY,
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(message);
}

async function resolveFile(requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestUrl, `http://${HOST}:${PORT}`).pathname);
  } catch {
    return null;
  }
  if (pathname.includes("\0")) return null;

  let relativePath = pathname.replace(/^\/+/, "");
  if (!relativePath || relativePath.endsWith("/")) relativePath += "index.html";

  const candidate = path.resolve(CONTENT_ROOT, relativePath);
  const relativeCandidate = path.relative(CONTENT_ROOT, candidate);
  if (relativeCandidate.startsWith("..") || path.isAbsolute(relativeCandidate)) return null;

  try {
    const candidateStats = await stat(candidate);
    return candidateStats.isFile() ? candidate : null;
  } catch {
    return null;
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendError(response, 405, "Method not allowed");
    return;
  }

  const filePath = await resolveFile(request.url ?? "/");
  if (!filePath) {
    sendError(response, 404, "Not found");
    return;
  }

  try {
    const body = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Security-Policy": CONTENT_SECURITY_POLICY,
      "Content-Type": MIME_TYPES.get(extension) ?? "application/octet-stream",
      "Permissions-Policy":
        "camera=(), display-capture=(), geolocation=(), microphone=(), payment=(), usb=()",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") response.end();
    else response.end(body);
  } catch {
    sendError(response, 500, "Unable to load the app");
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Close the existing tracker window and try again.`);
    process.exitCode = 1;
    return;
  }
  console.error(error);
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}/`;
  console.log(`Pokémon Title Atlas is running at ${url}`);
  console.log("Keep this window open while using the tracker.");
  if (OPEN_BROWSER) {
    openBrowser(url);
  }
});

function stop() {
  server.close(() => process.exit(0));
}

process.once("SIGINT", stop);
process.once("SIGTERM", stop);
