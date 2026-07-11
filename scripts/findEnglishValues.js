import fs from "fs";
import path from "path";

const localesPath = "./src/locales";

const english = JSON.parse(
  fs.readFileSync(`${localesPath}/en.json`, "utf8")
);

function flatten(obj, prefix = "") {
  let result = {};

  for (const key in obj) {
    const full = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === "object") {
      Object.assign(result, flatten(obj[key], full));
    } else {
      result[full] = obj[key];
    }
  }

  return result;
}

const englishFlat = flatten(english);

const files = fs
  .readdirSync(localesPath)
  .filter((file) => file.endsWith(".json") && file !== "en.json");


files.forEach((file) => {

  const data = JSON.parse(
    fs.readFileSync(`${localesPath}/${file}`, "utf8")
  );

  const flat = flatten(data);

  console.log("\n====================");
  console.log(file);
  console.log("====================");

  let found = false;

  Object.keys(englishFlat).forEach((key)=>{

    if(
      flat[key] &&
      flat[key] === englishFlat[key] &&
      englishFlat[key].length > 3
    ){

      console.log(
        "Still English:",
        key,
        "=>",
        flat[key]
      );

      found = true;
    }

  });


  if(!found){
    console.log("No obvious English leftovers ✅");
  }

});