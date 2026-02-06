const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..', '..');
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  });
}

const { Client } = require('pg');
const bcrypt = require('bcrypt');

const username = process.argv[2] || 'admin';
const password = process.argv[3] || 'admin123';
const role = (process.argv[4] || 'manager').toLowerCase();
const name = process.argv[5] || username;

if (!['admin', 'manager'].includes(role)) {
  console.error('role must be admin or manager');
  process.exit(1);
}

const code = username;

async function main() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'webstore',
  });

  try {
    await client.connect();
    const hashed = await bcrypt.hash(password, 10);
    await client.query(
      `INSERT INTO "user" (name, code, mobile, username, password, role, active)
       VALUES ($1, $2, NULL, $3, $4, $5, true)`,
      [name, code, username, hashed, role],
    );
    console.log('User created:', { username, role, code });
  } catch (e) {
    if (e.code === '23505') {
      console.error(
        'User already exists (duplicate username or code):',
        username,
      );
    } else {
      console.error(e.message || e);
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
