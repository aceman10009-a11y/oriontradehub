import fs from "fs";

const files = fs
  .readdirSync("./src/locales")
  .filter(file => file.endsWith(".json"));

const en = JSON.parse(
  fs.readFileSync("./src/locales/en.json", "utf8")
);

const flatten = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object") {
      Object.assign(acc, flatten(value, newKey));
    } else {
      acc.push(newKey);
    }

    return acc;
  }, []);

const englishKeys = flatten(en);

files.forEach((file) => {

  if (file === "en.json") return;

  const lang = JSON.parse(
    fs.readFileSync(`./src/locales/${file}`, "utf8")
  );

  const keys = flatten(lang);

  const missing = englishKeys.filter(
    key => !keys.includes(key)
  );

  console.log("\n====================");
  console.log(file);
  console.log("====================");

  if (missing.length) {
    console.log("Missing:");
    missing.forEach(key => console.log(" - " + key));
  } else {
    console.log("Complete ✅");
  }

});