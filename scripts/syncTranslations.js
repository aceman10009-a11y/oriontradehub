import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, "../src/locales");

const base = JSON.parse(
  fs.readFileSync(path.join(localesDir, "en.json"), "utf8")
);

const files = fs
  .readdirSync(localesDir)
  .filter((file) => file.endsWith(".json") && file !== "en.json");

for (const file of files) {
  const filePath = path.join(localesDir, file);

  const data = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  let added = 0;

  for (const key of Object.keys(base)) {
    if (!(key in data)) {
      data[key] = base[key];
      added++;
    }
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );

  console.log(`${file}: added ${added} missing keys`);
}

console.log("✅ Translation sync complete.");