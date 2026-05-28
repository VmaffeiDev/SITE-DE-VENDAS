import { mkdir, open, readFile } from "node:fs/promises";
import path from "node:path";

async function readDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  try {
    const envFile = await readFile(path.join(process.cwd(), ".env"), "utf8");
    const line = envFile
      .split(/\r?\n/)
      .find((entry) => entry.trim().startsWith("DATABASE_URL="));

    if (!line) {
      return "";
    }

    return line
      .slice("DATABASE_URL=".length)
      .trim()
      .replace(/^[\'"]|[\'"]$/g, "");
  } catch {
    return "";
  }
}

const databaseUrl = await readDatabaseUrl();

if (databaseUrl.startsWith("file:")) {
  const sqlitePath = databaseUrl.slice("file:".length);
  const resolvedPath = path.isAbsolute(sqlitePath)
    ? sqlitePath
    : path.resolve(process.cwd(), "prisma", sqlitePath);

  await mkdir(path.dirname(resolvedPath), { recursive: true });
  const handle = await open(resolvedPath, "a");
  await handle.close();
}
