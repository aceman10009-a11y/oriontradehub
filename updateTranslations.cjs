const fs = require("fs");

const translations = {
  de: {
    "hero.title": "Institutioneller Handel",
    "hero.titleHighlight": "Für alle entwickelt.",
    "hero.buttons.openAccount": "Live-Konto eröffnen",
    "hero.buttons.explorePlatform": "Plattform erkunden",

    "markets.badge": "LIVE GLOBALE MÄRKTE",
    "markets.title": "Handeln Sie auf",
    "markets.titleHighlight": "den besten Märkten",
    "markets.description":
      "Greifen Sie über die institutionelle Handelsplattform von Orion Trade Hub auf Kryptowährungen, Forex, Rohstoffe und wichtige Indizes zu. Überwachen Sie Preisbewegungen in Echtzeit und handeln Sie sicher.",

    "features.header.badge": "PLATTFORM-FUNKTIONEN",

    "navbar.features": "Funktionen",
    "navbar.markets": "Märkte",
    "navbar.support": "Support",
  },

  fr: {
    "hero.title": "Trading institutionnel",
    "hero.titleHighlight": "Créé pour tous.",
    "hero.buttons.openAccount": "Ouvrir un compte réel",
    "hero.buttons.explorePlatform": "Explorer la plateforme",

    "markets.badge": "MARCHÉS MONDIAUX EN DIRECT",
    "markets.title": "Opérez sur",
    "markets.titleHighlight": "les meilleurs marchés",
    "markets.description":
      "Accédez aux cryptomonnaies, au forex, aux matières premières et aux principaux indices via la plateforme de trading institutionnelle d'Orion Trade Hub. Surveillez les mouvements des prix en temps réel et exécutez vos opérations en toute sécurité.",

    "features.header.badge": "FONCTIONNALITÉS DE LA PLATEFORME",

    "navbar.features": "Fonctionnalités",
    "navbar.markets": "Marchés",
    "navbar.support": "Support",
  },

  es: {
    "hero.title": "Trading institucional",
    "hero.titleHighlight": "Creado para todos.",
    "hero.buttons.openAccount": "Abrir cuenta real",
    "hero.buttons.explorePlatform": "Explorar plataforma",

    "markets.badge": "MERCADOS GLOBALES EN VIVO",
    "markets.title": "Opera en",
    "markets.titleHighlight": "los mejores mercados",
    "markets.description":
      "Accede a criptomonedas, forex, materias primas e índices principales mediante la plataforma de trading institucional de Orion Trade Hub. Supervisa los movimientos de precios en tiempo real y ejecuta operaciones con seguridad.",

    "features.header.badge": "FUNCIONES DE LA PLATAFORMA",

    "navbar.features": "Funciones",
    "navbar.markets": "Mercados",
    "navbar.support": "Soporte",
  },
};


function setNested(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] ??= {};
      current = current[key];
    }
  });
}


for (const lang in translations) {
  const file = `src/locales/${lang}.json`;

  if (!fs.existsSync(file)) continue;

  const json = JSON.parse(fs.readFileSync(file));

  Object.entries(translations[lang]).forEach(([key, value]) => {
    setNested(json, key, value);
  });

  fs.writeFileSync(
    file,
    JSON.stringify(json, null, 2)
  );

  console.log(`${lang}.json updated`);
}