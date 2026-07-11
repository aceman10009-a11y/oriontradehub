const fs = require("fs");

const translations = {
  de: {
    "hero.title": "Institutioneller Handel",
    "hero.titleHighlight": "Für alle entwickelt.",
    "hero.buttons.openAccount": "Live-Konto eröffnen",
    "hero.buttons.explorePlatform": "Plattform erkunden",
    "marketsSection.badge": "LIVE GLOBALE MÄRKTE",
    "features.header.badge": "PLATTFORM-FUNKTIONEN",
    "navbar.features": "Funktionen",
    "navbar.markets": "Märkte",
    "navbar.support": "Support"
  },

  fr: {
    "hero.title": "Trading institutionnel",
    "hero.titleHighlight": "Créé pour tous.",
    "hero.buttons.openAccount": "Ouvrir un compte réel",
    "hero.buttons.explorePlatform": "Explorer la plateforme",
    "marketsSection.badge": "MARCHÉS MONDIAUX EN DIRECT",
    "features.header.badge": "FONCTIONNALITÉS DE LA PLATEFORME",
    "navbar.features": "Fonctionnalités",
    "navbar.markets": "Marchés",
    "navbar.support": "Support"
  },

  es: {
    "hero.title": "Trading institucional",
    "hero.titleHighlight": "Creado para todos.",
    "hero.buttons.openAccount": "Abrir cuenta real",
    "hero.buttons.explorePlatform": "Explorar plataforma",
    "marketsSection.badge": "MERCADOS GLOBALES EN VIVO",
    "features.header.badge": "FUNCIONES DE LA PLATAFORMA",
    "navbar.features": "Funciones",
    "navbar.markets": "Mercados",
    "navbar.support": "Soporte"
  }
};


function setNested(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key,index)=>{
    if(index === keys.length-1){
      current[key] = value;
    } else {
      current[key] ??= {};
      current = current[key];
    }
  });
}


for (const lang in translations){

  const file = `src/locales/${lang}.json`;

  if(!fs.existsSync(file)) continue;

  const json = JSON.parse(fs.readFileSync(file));

  Object.entries(translations[lang]).forEach(([key,value])=>{
    setNested(json,key,value);
  });

  fs.writeFileSync(
    file,
    JSON.stringify(json,null,2)
  );

  console.log(`${lang}.json updated`);
}