import fs from "fs";

const locales = "./src/locales";

const en = JSON.parse(
  fs.readFileSync(`${locales}/en.json`, "utf8")
);

const mergeMissing = (target, source) => {

  Object.keys(source).forEach(key => {

    if (!(key in target)) {

      target[key] = source[key];

    } else if (
      typeof source[key] === "object" &&
      typeof target[key] === "object"
    ) {

      mergeMissing(target[key], source[key]);

    }

  });

};


fs.readdirSync(locales).forEach(file => {

  if (
    file === "en.json" ||
    !file.endsWith(".json")
  ) return;


  const path = `${locales}/${file}`;

  const lang = JSON.parse(
    fs.readFileSync(path,"utf8")
  );


  mergeMissing(lang,en);


  fs.writeFileSync(
    path,
    JSON.stringify(lang,null,2)
  );


  console.log(`${file} updated ✅`);

});