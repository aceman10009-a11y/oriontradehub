import fs from "fs";
import path from "path";

const src = "./src";

function scan(dir){

  const files = fs.readdirSync(dir);

  files.forEach(file=>{

    const full = path.join(dir,file);

    if(fs.statSync(full).isDirectory()){
      scan(full);
    }

    else if(full.endsWith(".jsx")){

      const content = fs.readFileSync(full,"utf8");

      const matches = content.match(/>[^<{][^<{]+</g);

      if(matches){

        matches.forEach(match=>{

          const text = match
            .replace(">","")
            .replace("<","")
            .trim();

          if(
            text.length > 2 &&
            !text.includes("=>") &&
            !text.includes("className")
          ){

            console.log(
              "\nTEXT:",
              text,
              "\nFILE:",
              full
            );

          }

        });

      }

    }

  });

}

scan(src);