"use strict";

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const rootEnvPath = path.join(__dirname, "..", "..", ".env");
const port = (() => {
  if (!fs.existsSync(rootEnvPath)) return 3000;
  const content = fs.readFileSync(rootEnvPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "CLIENT_PORT") return parseInt(value, 10) || 3000;
  }
  return 3000;
})();

const child = spawn("npx", ["next", "dev", "-p", String(port)], {
  stdio: "inherit",
  shell: true,
  cwd: path.join(__dirname, ".."),
  env: { ...process.env, PORT: String(port) },
});

child.on("exit", (code) => process.exit(code ?? 0));
