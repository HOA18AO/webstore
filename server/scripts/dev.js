"use strict";

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const rootEnvPath = path.join(__dirname, "..", "..", ".env");
const env = { ...process.env };
let port = 3001;
if (fs.existsSync(rootEnvPath)) {
  const content = fs.readFileSync(rootEnvPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    env[key] = value;
    if (key === "SERVER_PORT") port = parseInt(value, 10) || 3001;
  }
}
env.PORT = String(port);

const child = spawn("npm", ["run", "start:dev"], {
  stdio: "inherit",
  shell: true,
  cwd: path.join(__dirname, ".."),
  env,
});

child.on("exit", (code) => process.exit(code ?? 0));
