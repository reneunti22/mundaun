/* Places, lifts and menus for Obersaxen Mundaun.
   Coordinates: OpenStreetMap and the swisstopo search, read 24 Nov 2026.
   Routing heights follow the EU-DEM terrain model at those pins, except the
   two summit stations, where the published height is used because a 25 m
   terrain model flattens sharp peaks.
   Priced menus, read 24 Nov 2026: Bergrestaurant Triel
   (bergrestaurant-triel.ch/menu.pdf), Restaurant Rufalipark
   (Frühling 2026 Speisekarte on rufalipark.ch), and Restaurant Pellas
   (breakfast and the 2024 banquet card on pellas.ch).
   Other dishes are only what the hut or Graubünden Ferien actually describes.
   Where no price was published, price is null. Do not invent one. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MUNDAUN = api;
})(typeof self !== "undefined" ? self : this, function () {
  const season = {
    en: "Winter season 18 Dec 2026 – 4 Apr 2027. Snow decides the day — check obersaxen-mundaun.ch before you ski over.",
    de: "Wintersaison 18. Dez 2026 – 4. Apr 2027. Der Schnee entscheidet den Tag — vor der Abfahrt auf obersaxen-mundaun.ch schauen."
  };

  const places = {
    meierhof: {
      id: "meierhof",
      name: "Meierhof",
      area: "Obersaxen",
      lat: 46.7504,
      lon: 9.1021,
      alt: 1279,
      showAlt: 1280,
      restaurant: false,
      kind: "station"
    },
    chummenbuehl: {
      id: "chummenbuehl",
      name: "Restaurant Chummenbühl",
      short: "Chummenbühl",
      area: "Obersaxen",
      lat: 46.7527725,
      lon: 9.1114312,
      alt: 1324,
      showAlt: 1320,
      restaurant: true,
      kitchen: true,
      phone: "+41819331418",
      web: "https://www.obersaxen-mundaun.ch/de/gastronomie",
      blurb: {
        en: "Family restaurant with a sunny terrace, at the beginner lift above Affeier.",
        de: "Familienrestaurant mit Sonnenterrasse, beim Übungslift oberhalb von Affeier."
      },
      hours: {
        en: "Seasonal. On 24 Nov 2026 the lift company still listed it open into the evening.",
        de: "Saisonal. Am 24. Nov 2026 stand es bei den Bergbahnen noch bis zum Abend offen."
      },
      menuNote: {
        en: "No public price list. The dish list is not on the lift-company page.",
        de: "Keine öffentliche Preisliste. Auf der Seite der Bergbahnen steht keine Karte."
      },
      menu: []
    },
    misanenga: {
      id: "misanenga",
      name: "Misanenga",
      area: "Obersaxen",
      lat: 46.750646,
      lon: 9.119151,
      alt: 1368,
      showAlt: 1370,
      restaurant: false,
      kind: "station"
    },
    rufalipark: {
      id: "rufalipark",
      name: "Restaurant Rufalipark",
      short: "Rufalipark",
      area: "Obersaxen",
      lat: 46.751447,
      lon: 9.121828,
      alt: 1356,
      showAlt: 1356,
      restaurant: true,
      kitchen: true,
      phone: "+41819333232",
      web: "https://rufalipark.ch/gastronomie/essen-trinken/",
      blurb: {
        en: "Family-park restaurant beside the Misanenga valley station, Under Misanenga 29. A short walk from the lift, not a piste hut.",
        de: "Restaurant im Familienpark neben der Talstation Misanenga, Under Misanenga 29. Kurzer Fussweg von der Bahn, keine Pistenhütte."
      },
      hours: {
        en: "The restaurant says warm food all day. Graubünden Ferien lists the kitchen 11:30–20:00.",
        de: "Das Restaurant schreibt durchgehend warme Küche. Graubünden Ferien nennt 11:30–20:00."
      },
      menuNote: {
        en: "Prices from the Frühling 2026 Speisekarte PDF on rufalipark.ch, read 24 Nov 2026. The page itself does not print a winter card.",
        de: "Preise aus der Frühling-2026-Speisekarte (PDF auf rufalipark.ch), gelesen am 24. Nov 2026. Die Seite selbst druckt keine Winterkarte."
      },
      menu: [
        { cat: "side", name: "Nachos mit Käse überbacken", en: "Nachos with cheese, guacamole and tomato salsa", price: 21.5, tags: ["nachos", "kaese", "cheese"] },
        { cat: "salad", name: "Blattsalat", en: "Leaf salad", price: 9.9, tags: ["salat", "salad"], veg: true },
        { cat: "salad", name: "Gemischter Salat", en: "Mixed salad", price: 11.5, tags: ["salat", "salad"], veg: true },
        { cat: "salad", name: "Bergler Salat mit Obersaxer Alpkäse", en: "Mountain salad with Obersaxen alp cheese", price: 21.5, tags: ["salat", "salad", "kaese", "cheese"] },
        { cat: "salad", name: "Bunter Salatteller mit Ei", en: "Mixed salad plate with egg", price: 20.5, tags: ["salat", "salad", "ei", "egg"], veg: true },
        { cat: "soup", name: "Tagessuppe klein", en: "Soup of the day, small", price: 10.5, tags: ["suppe", "soup"] },
        { cat: "soup", name: "Tagessuppe gross", en: "Soup of the day, large", price: 15.5, tags: ["suppe", "soup"] },
        { cat: "main", name: "Rufali Burger", en: "Swiss beef burger with cheddar, served with fries", price: 29.5, tags: ["burger", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Texmex Burger", en: "Swiss beef burger with nachos, jalapeños and guacamole, served with fries", price: 31.5, tags: ["burger", "pommes", "fries", "nachos"], with: ["pommes"] },
        { cat: "main", name: "Beyond Burger", en: "Vegan Beyond patty, served with fries", price: 33.5, tags: ["burger", "pommes", "fries", "vegan"], with: ["pommes"], veg: true },
        { cat: "anytime", name: "Flammkuchen Klassisch", en: "Flammkuchen with crème fraîche, onion and bacon", price: 21.5, tags: ["flammkuchen", "speck"] },
        { cat: "anytime", name: "Flammkuchen Misanenga", en: "Flammkuchen with raw ham, alp cheese and rocket", price: 23.5, tags: ["flammkuchen", "schinken", "kaese"] },
        { cat: "anytime", name: "Flammkuchen Margherita", en: "Flammkuchen with tomato, cheese and oregano", price: 19.5, tags: ["flammkuchen", "kaese"], veg: true },
        { cat: "anytime", name: "Flammkuchen Prosciutto", en: "Flammkuchen with tomato, cheese and ham", price: 21.5, tags: ["flammkuchen", "schinken"] },
        { cat: "main", name: "Pizokel mit Alpkäse", en: "Pizokel baked with alp cheese, fried onions and apple sauce", price: 25.5, tags: ["pizokel", "kaese", "cheese"], veg: true },
        { cat: "main", name: "Egli-Knusperli", en: "Perch goujons with fries and tartare sauce", price: 29.5, tags: ["egli", "fisch", "fish", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Chicken Nuggets", en: "Chicken nuggets with fries and barbecue sauce", price: 27.5, tags: ["nuggets", "poulet", "chicken", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Paniertes Schweinsschnitzel", en: "Breaded pork schnitzel with fries", price: 31.5, tags: ["schnitzel", "pommes", "fries"], with: ["pommes"] },
        { cat: "kids", name: "Schatzkiste Chicken Nuggets", en: "Kids’ chicken nuggets with fries", price: 15.5, tags: ["nuggets", "kids", "kinder", "pommes", "fries"], with: ["pommes"] },
        { cat: "kids", name: "Kapitän Alois Hamburger", en: "Kids’ hamburger with fries", price: 16.5, tags: ["burger", "kids", "kinder", "pommes", "fries"], with: ["pommes"] },
        { cat: "kids", name: "Matrose Manu Egli-Knusperli", en: "Kids’ perch goujons with fries", price: 16.5, tags: ["egli", "fisch", "kids", "kinder", "pommes", "fries"], with: ["pommes"] },
        { cat: "kids", name: "Pirat Rufali Schweinsschnitzel", en: "Kids’ breaded pork schnitzel with fries", price: 15.5, tags: ["schnitzel", "kids", "kinder", "pommes", "fries"], with: ["pommes"] },
        { cat: "kids", name: "Lady Madlaina Pasta Napoli", en: "Kids’ pasta with tomato sauce", price: 10.5, tags: ["pasta", "kids", "kinder"], veg: true }
      ]
    },
    leos: {
      id: "leos",
      name: "Leo's Snack Bar",
      short: "Leo's",
      area: "Obersaxen",
      lat: 46.7435873,
      lon: 9.1217073,
      alt: 1602,
      showAlt: 1610,
      restaurant: true,
      kitchen: true,
      phone: "+41819331333",
      web: "https://www.obersaxen-mundaun.ch/de/gastronomie/alle-restaurants/leos-snack-bar",
      blurb: {
        en: "On the piste at Untermatt. House specialty is the french fries, plus Käsegriller, hamburgers and hot dogs.",
        de: "An der Piste bei Untermatt. Hausspezialität sind die Pommes frites, dazu Käsegriller, Hamburger und Hot-Dogs."
      },
      hours: {
        en: "Winter hut. Closed in summer 2026. Typical day hours about 10:30–16:30.",
        de: "Winterhütte. Sommer 2026 geschlossen. Übliche Tageszeit etwa 10:30–16:30."
      },
      menuNote: {
        en: "Dishes named by Leo's and the lift company. They do not publish prices.",
        de: "Gerichte, die Leo's und die Bergbahnen nennen. Preise sind nicht veröffentlicht."
      },
      menu: [
        { cat: "specialty", name: "Pommes frites", en: "French fries", price: null, tags: ["pommes", "fries", "frites", "chips"], portion: "plate" },
        { cat: "specialty", name: "Käsegriller", en: "Cheese sausage", price: null, tags: ["wurst", "sausage", "kaese", "cheese", "kaesegriller"] },
        { cat: "main", name: "Hamburger", en: "Hamburger", price: null, tags: ["burger", "hamburger"] },
        { cat: "specialty", name: "Hot-dog", en: "Hot dog", price: null, tags: ["hotdog", "wurst", "sausage"] },
        { cat: "hot", name: "Café Leo", en: "Café Leo", price: null, tags: ["coffee", "kaffee", "cafe"] }
      ]
    },
    kartitscha: {
      id: "kartitscha",
      name: "Bergrestaurant Kartitscha",
      short: "Kartitscha",
      area: "Obersaxen",
      lat: 46.736359,
      lon: 9.1156876,
      alt: 1782,
      showAlt: 1790,
      restaurant: true,
      kitchen: true,
      phone: "+41819331222",
      web: "http://www.kartitscha.ch/",
      blurb: {
        en: "Self-service and a served room, big terrace, next to the children's lift. Warm kitchen about 11:00–15:30.",
        de: "Selbstbedienung und Bedienung, grosse Terrasse, neben dem Kinderlift. Warme Küche etwa 11:00–15:30."
      },
      hours: {
        en: "Warm kitchen about 11:00–15:30. Drinks before and after.",
        de: "Warme Küche etwa 11:00–15:30. Getränke davor und danach."
      },
      menuNote: {
        en: "House tips listed by Graubünden Ferien, not a priced menu. Kartitscha does not publish prices.",
        de: "Hausteipps von Graubünden Ferien, keine Preiskarte. Kartitscha veröffentlicht keine Preise."
      },
      menu: [
        { cat: "specialty", name: "Knoblibrot", en: "Garlic bread", price: null, tags: ["brot", "bread", "knobli"] },
        { cat: "specialty", name: "Bündner Hauswurst", en: "Graubünden sausage", price: null, tags: ["wurst", "sausage"] },
        { cat: "soup", name: "Gerstensuppe", en: "Barley soup", price: null, tags: ["suppe", "soup", "gerste"] },
        { cat: "main", name: "Capuns", en: "Capuns", price: null, tags: ["capuns"] },
        { cat: "main", name: "Danis Pfeffersteak", en: "Pepper steak", price: null, tags: ["steak", "fleisch", "meat"] },
        { cat: "main", name: "Entrecôte vom heissen Stein", en: "Entrecôte on a hot stone", price: null, tags: ["steak", "fleisch", "meat", "entrecote"] }
      ]
    },
    wali: {
      id: "wali",
      name: "Bergrestaurant Wali",
      short: "Wali",
      area: "Obersaxen",
      lat: 46.7248256,
      lon: 9.1085989,
      alt: 1714,
      showAlt: 1719,
      restaurant: true,
      kitchen: true,
      phone: "+41819331695",
      web: "http://www.wali-bergrestaurant.com/",
      blurb: {
        en: "Rebuilt in 2024 at the Wali valley station. À-la-carte room and a self-service counter. Warm kitchen about 11:00–15:30.",
        de: "2024 neu gebaut an der Talstation Wali. À-la-carte und Selbstbedienung. Warme Küche etwa 11:00–15:30."
      },
      hours: {
        en: "Warm kitchen about 11:00–15:30.",
        de: "Warme Küche etwa 11:00–15:30."
      },
      menuNote: {
        en: "Dishes from the restaurant's own description via Graubünden Ferien. No public prices.",
        de: "Gerichte aus der Beschreibung des Restaurants über Graubünden Ferien. Keine öffentlichen Preise."
      },
      menu: [
        { cat: "main", name: "Käsespätzli", en: "Cheese spaetzle", price: null, tags: ["spaetzli", "kaese", "cheese", "kaesespaetzli"] },
        { cat: "main", name: "Hausgemachte Ravioli", en: "Homemade ravioli with fondue cheese", price: null, tags: ["ravioli", "kaese", "cheese", "pasta"] },
        { cat: "main", name: "Bowls", en: "Bowls", price: null, tags: ["bowl"] }
      ]
    },
    waschchruet: {
      id: "waschchruet",
      name: "Waschchrüt",
      short: "Waschchrüt",
      area: "Obersaxen",
      lat: 46.7210772,
      lon: 9.1078828,
      alt: 1809,
      showAlt: 1810,
      restaurant: true,
      kitchen: true,
      phone: "+41787639397",
      web: "https://www.obersaxen-mundaun.ch/de/gastronomie",
      blurb: {
        en: "Hut just above Wali, also known with Jeranti's. A short walk up from the Wali station.",
        de: "Hütte knapp über Wali, auch als Jeranti's bekannt. Kurzer Aufstieg ab der Station Wali."
      },
      hours: {
        en: "Seasonal. Confirm on the day.",
        de: "Saisonal. Am Tag selbst nachfragen."
      },
      menuNote: {
        en: "No public menu.",
        de: "Keine öffentliche Speisekarte."
      },
      menu: []
    },
    stein: {
      id: "stein",
      name: "Stein",
      area: "Obersaxen",
      lat: 46.72632,
      lon: 9.12743,
      alt: 2144,
      showAlt: 2160,
      restaurant: false,
      kind: "station"
    },
    sternenbar: {
      id: "sternenbar",
      name: "Sternenbar Stein",
      short: "Sternenbar",
      area: "Obersaxen",
      lat: 46.726501,
      lon: 9.124973,
      alt: 2130,
      showAlt: 2140,
      restaurant: true,
      kitchen: false,
      phone: "+41795736483",
      web: "https://www.obersaxen-mundaun.ch/de/gastronomie",
      blurb: {
        en: "Deckchairs and a bar at Stein, with music and the panorama. Drinks rather than a kitchen.",
        de: "Liegestühle und Bar auf Stein, mit Musik und Panorama. Eher Getränke als Küche."
      },
      hours: {
        en: "Open with the Stein lifts.",
        de: "Offen mit den Liften auf Stein."
      },
      menuNote: {
        en: "No published drink list. Order at the bar.",
        de: "Keine veröffentlichte Getränkekarte. Bestellen an der Bar."
      },
      menu: []
    },
    sezner: {
      id: "sezner",
      name: "Gipfelrestaurant Sezner",
      short: "Sezner",
      area: "Obersaxen",
      lat: 46.7089543,
      lon: 9.0989447,
      alt: 2310,
      showAlt: 2310,
      restaurant: true,
      kitchen: true,
      phone: "+41772586475",
      web: "https://www.obersaxen-mundaun.ch/de/gastronomie",
      blurb: {
        en: "Highest restaurant in the area, wooden room and a big terrace. Known for the summit burger and the charcoal grill.",
        de: "Höchstes Restaurant im Gebiet, Holzstube und grosse Terrasse. Bekannt für den Gipfelburger und den Holzkohlengrill."
      },
      hours: {
        en: "Open with the Wali–Sezner chair.",
        de: "Offen mit der Sesselbahn Wali–Sezner."
      },
      menuNote: {
        en: "Dishes from the area guides. Sezner does not publish a price list.",
        de: "Gerichte aus den Gebietsführern. Sezner veröffentlicht keine Preisliste."
      },
      menu: [
        { cat: "main", name: "Gipfelburger", en: "Summit burger", price: null, tags: ["burger", "gipfelburger"] },
        { cat: "main", name: "Vom Holzkohlengrill", en: "From the charcoal grill", price: null, tags: ["grill", "fleisch", "meat"] }
      ]
    },
    cuolm: {
      id: "cuolm",
      name: "Berggasthaus Cuolm Sura",
      short: "Cuolm Sura",
      area: "Mundaun",
      lat: 46.7496329,
      lon: 9.1454843,
      alt: 1590,
      showAlt: 1616,
      restaurant: true,
      kitchen: true,
      phone: "+41819331302",
      web: "https://www.cuolm-sura.ch/",
      blurb: {
        en: "Mountain inn between Valata and Piz Mundaun, on the link toward Obersaxen.",
        de: "Berggasthaus zwischen Valata und Piz Mundaun, am Übergang Richtung Obersaxen."
      },
      hours: {
        en: "Seasonal. The website posts the current weeks.",
        de: "Saisonal. Die Website stellt die aktuellen Wochen ein."
      },
      menuNote: {
        en: "No public price list on the website.",
        de: "Keine öffentliche Preisliste auf der Website."
      },
      menu: []
    },
    valata: {
      id: "valata",
      name: "Restaurant Valata",
      short: "Valata",
      area: "Mundaun",
      lat: 46.7619098,
      lon: 9.1381106,
      alt: 1234,
      showAlt: 1230,
      restaurant: true,
      kitchen: true,
      phone: "+41819331151",
      web: "https://restaurant-valata.ch/",
      blurb: {
        en: "At the foot of Piz Mundaun, a few steps from the Valata chair. Classics and family plates. Ski-in, ski-out.",
        de: "Am Fusse des Piz Mundaun, ein paar Schritte von der Sesselbahn Valata. Klassiker und Familiengerichte. Ski-in, Ski-out."
      },
      hours: {
        en: "Summer hours were 11:00–22:00, Tuesday and Wednesday closed, warm kitchen 11:30–20:30. Winter can differ.",
        de: "Sommerzeiten waren 11:00–22:00, Dienstag und Mittwoch Ruhetag, warme Küche 11:30–20:30. Im Winter kann es anders sein."
      },
      menuNote: {
        en: "No priced menu online. They describe classics, fresh plates and game when they have it.",
        de: "Keine Preiskarte online. Beschrieben werden Klassiker, frische Teller und Wild, solange es hat."
      },
      menu: []
    },
    pizmundaun: {
      id: "pizmundaun",
      name: "Gipfelhütte Piz Mundaun",
      short: "Piz Mundaun",
      area: "Mundaun",
      lat: 46.742161,
      lon: 9.1578931,
      alt: 2064,
      showAlt: 2064,
      restaurant: true,
      kitchen: true,
      phone: "+41799221554",
      web: "https://www.obersaxen-mundaun.ch/de/gastronomie",
      blurb: {
        en: "Wooden summit hut at 2'064 m, looking over the Surselva.",
        de: "Hölzerne Gipfelhütte auf 2'064 m, mit Blick über die Surselva."
      },
      hours: {
        en: "Open with the Cuolm Sura–Piz Mundaun chair.",
        de: "Offen mit der Sesselbahn Cuolm Sura–Piz Mundaun."
      },
      menuNote: {
        en: "No regular price list published. An old event menu is not the daily card.",
        de: "Keine reguläre Preisliste veröffentlicht. Ein altes Eventmenü ist nicht die Tageskarte."
      },
      menu: []
    },
    hitzeggen: {
      id: "hitzeggen",
      name: "Hitzeggen",
      area: "Val Lumnezia",
      lat: 46.735825,
      lon: 9.144236,
      alt: 2087,
      showAlt: 2090,
      restaurant: false,
      kind: "station"
    },
    lategia: {
      id: "lategia",
      name: "La Tegia",
      short: "La Tegia",
      area: "Val Lumnezia",
      lat: 46.7304038,
      lon: 9.1426712,
      alt: 1886,
      showAlt: 1885,
      restaurant: true,
      kitchen: true,
      phone: "+41815115066",
      web: "https://lategia.ch/",
      blurb: {
        en: "Sunny hut on the run down toward Triel, with deckchairs. Also an après-ski spot.",
        de: "Sonnige Hütte an der Abfahrt Richtung Triel, mit Liegestühlen. Auch für Après-Ski."
      },
      hours: {
        en: "Seasonal, busiest on sunny ski days.",
        de: "Saisonal, am vollsten an sonnigen Skitagen."
      },
      menuNote: {
        en: "No public price list.",
        de: "Keine öffentliche Preisliste."
      },
      menu: []
    },
    triel: {
      id: "triel",
      name: "Bergrestaurant Triel",
      short: "Triel",
      area: "Val Lumnezia",
      lat: 46.7234576,
      lon: 9.1569171,
      alt: 1604,
      showAlt: 1600,
      restaurant: true,
      kitchen: true,
      phone: "+41764087471",
      web: "https://www.bergrestaurant-triel.ch/",
      blurb: {
        en: "Above the Val Lumnezia, at the top of the Vella chair. Full menu with prices.",
        de: "Über dem Val Lumnezia, bei der Bergstation der Sesselbahn ab Vella. Volle Karte mit Preisen."
      },
      hours: {
        en: "Last published summer hours: daily 09:00–21:00. Winter follows the lifts.",
        de: "Zuletzt veröffentlichte Sommerzeiten: täglich 09:00–21:00. Im Winter mit den Liften."
      },
      menuNote: {
        en: "Prices from bergrestaurant-triel.ch/menu.pdf, read 24 Nov 2026. Dishes marked winter are listed by the hut for the ski season only.",
        de: "Preise von bergrestaurant-triel.ch/menu.pdf, gelesen am 24. Nov 2026. Als Winter markierte Gerichte führt die Hütte nur in der Skisaison."
      },
      menu: [
        { cat: "soup", name: "Hausgemachte Gulaschsuppe", en: "Homemade goulash soup", price: 13.5, tags: ["suppe", "soup", "gulasch"] },
        { cat: "soup", name: "Bündner Gerstensuppe", en: "Graubünden barley soup", price: 12.9, tags: ["suppe", "soup", "gerste"], winter: true },
        { cat: "soup", name: "Hausgemachte Tagessuppe", en: "Soup of the day", price: 10.5, tags: ["suppe", "soup"] },
        { cat: "salad", name: "Grüner Blattsalat", en: "Green leaf salad", price: 9.5, tags: ["salat", "salad"], veg: true },
        { cat: "salad", name: "Gemischter Salat", en: "Mixed salad", price: 12.5, tags: ["salat", "salad"], veg: true },
        { cat: "salad", name: "Fitnessteller mit Pouletstreifen", en: "Fitness plate with chicken", price: 24.5, tags: ["salat", "salad", "poulet", "chicken"] },
        { cat: "salad", name: "Fitnessteller mit Fischknusperli", en: "Fitness plate with fish goujons", price: 25.5, tags: ["salat", "salad", "fisch", "fish"] },
        { cat: "salad", name: "Wurst-Käse-Salat", en: "Sausage and cheese salad", price: 19, tags: ["salat", "salad", "wurst", "kaese", "cheese"] },
        { cat: "anytime", name: "Flammkuchen", en: "Flammkuchen with bacon", price: 21.5, tags: ["flammkuchen", "speck"] },
        { cat: "anytime", name: "Flammkuchen vegetarisch", en: "Vegetarian flammkuchen", price: 22.5, tags: ["flammkuchen"], veg: true },
        { cat: "anytime", name: "Mediterranes Ofenpfännchen", en: "Mediterranean pan", price: 16.5, tags: ["vegetarisch"], veg: true },
        { cat: "anytime", name: "Triel Zvieri-Plättli", en: "Cold alpine platter", price: 28.5, tags: ["plattli", "wurst", "kaese", "cheese", "fleisch"] },
        { cat: "main", name: "Älplermakkaroni", en: "Alpine macaroni", price: 24.5, tags: ["makkaroni", "pasta", "kaese"], vegOption: true },
        { cat: "main", name: "Schweinsgulasch", en: "Pork goulash with pasta", price: 25.5, tags: ["gulasch", "fleisch", "pasta"], winter: true },
        { cat: "main", name: "Paniertes Schweineschnitzel", en: "Breaded pork schnitzel with fries", price: 26.5, tags: ["schnitzel", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Triel Cordonbleu", en: "Cordon bleu with fries", price: 32.5, tags: ["cordonbleu", "schnitzel", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Kalbsbratwurst", en: "Veal sausage with onion sauce and fries", price: 24.5, tags: ["wurst", "sausage", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Triel Rösti", en: "Rösti with cheese, bacon and a fried egg", price: 26.5, tags: ["roesti", "kaese", "cheese"], vegOption: true },
        { cat: "main", name: "Fischknusperli", en: "Fish goujons with fries", price: 26.5, tags: ["fisch", "fish", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Triel Burger", en: "Triel burger with fries", price: 29.5, tags: ["burger", "pommes", "fries"], with: ["pommes"] },
        { cat: "main", name: "Green Mountain Burger", en: "Vegetarian burger with fries", price: 29.5, tags: ["burger", "pommes", "fries"], with: ["pommes"], veg: true },
        { cat: "kids", name: "Älplermakkaroni", en: "Alpine macaroni, kids", price: 14.5, tags: ["makkaroni", "kids", "kinder"] },
        { cat: "kids", name: "Poulet Nuggets", en: "Chicken nuggets with fries", price: 14.5, tags: ["nuggets", "poulet", "kids", "pommes", "fries"], with: ["pommes"] },
        { cat: "kids", name: "Fischknusperli", en: "Fish goujons with fries, kids", price: 15.5, tags: ["fisch", "kids", "pommes", "fries"], with: ["pommes"] },
        { cat: "kids", name: "Paniertes Schweinsschnitzel", en: "Breaded schnitzel with fries, kids", price: 15.5, tags: ["schnitzel", "kids", "pommes", "fries"], with: ["pommes"] },
        { cat: "side", name: "Gemüse", en: "Vegetables", price: 9, tags: ["gemuese", "vegetables"], veg: true, portion: "side" },
        { cat: "side", name: "Pommes frites", en: "French fries", price: 9, tags: ["pommes", "fries", "frites", "chips"], portion: "side" },
        { cat: "side", name: "Rösti", en: "Rösti", price: 13.5, tags: ["roesti"], portion: "side" },
        { cat: "drink", name: "Valser 30 cl", en: "Mineral water 30 cl", price: 4.5, tags: ["wasser", "water"] },
        { cat: "drink", name: "Valser 75 cl", en: "Mineral water 75 cl", price: 7.5, tags: ["wasser", "water"] },
        { cat: "drink", name: "Coca-Cola / Zero 33 cl", en: "Coca-Cola or Zero", price: 4.8, tags: ["cola", "softdrink"] },
        { cat: "drink", name: "Fanta 33 cl", en: "Fanta", price: 4.8, tags: ["fanta", "softdrink"] },
        { cat: "drink", name: "Sprite 33 cl", en: "Sprite", price: 4.8, tags: ["sprite", "softdrink"] },
        { cat: "drink", name: "Rivella rot / blau 33 cl", en: "Rivella", price: 4.8, tags: ["rivella", "softdrink"] },
        { cat: "drink", name: "Sirup", en: "Squash", price: 3.5, tags: ["sirup", "kids"] },
        { cat: "beer", name: "Calanda vom Fass 30 cl", en: "Draft Calanda 30 cl", price: 5.5, tags: ["bier", "beer", "calanda"] },
        { cat: "beer", name: "Calanda vom Fass 50 cl", en: "Draft Calanda 50 cl", price: 7, tags: ["bier", "beer", "calanda"] },
        { cat: "beer", name: "Panaché vom Fass 30 cl", en: "Draft shandy 30 cl", price: 5.5, tags: ["bier", "beer", "panache"] },
        { cat: "beer", name: "Erdinger Weissbier 50 cl", en: "Erdinger wheat beer", price: 7.5, tags: ["bier", "beer", "weissbier"] },
        { cat: "beer", name: "Erdinger alkoholfrei 50 cl", en: "Erdinger alcohol-free", price: 7.5, tags: ["bier", "beer"] },
        { cat: "wine", name: "Offener Wein 1 dl", en: "Wine by the glass, from", price: 6.5, tags: ["wein", "wine"] },
        { cat: "hot", name: "Kaffee Crème", en: "Coffee", price: 5, tags: ["kaffee", "coffee", "cafe"] },
        { cat: "hot", name: "Espresso", en: "Espresso", price: 4.5, tags: ["kaffee", "coffee", "espresso"] },
        { cat: "hot", name: "Cappuccino", en: "Cappuccino", price: 5.5, tags: ["kaffee", "coffee", "cappuccino"] },
        { cat: "hot", name: "Latte macchiato", en: "Latte macchiato", price: 6, tags: ["kaffee", "coffee"] },
        { cat: "hot", name: "Tee", en: "Tea", price: 5, tags: ["tee", "tea"] },
        { cat: "hot", name: "Warme Schokolade", en: "Hot chocolate", price: 5.5, tags: ["schokolade", "chocolate", "kakao"] },
        { cat: "hot", name: "Glühwein", en: "Mulled wine", price: 8, tags: ["gluhwein", "wine", "heiss"] },
        { cat: "hot", name: "Jägertee", en: "Jägertee", price: 8, tags: ["jaegertee", "heiss"] },
        { cat: "hot", name: "Punsch", en: "Punch", price: 4.5, tags: ["punsch", "heiss"] }
      ]
    },
    pellas: {
      id: "pellas",
      name: "Restaurant Pellas",
      short: "Pellas",
      area: "Val Lumnezia",
      lat: 46.717475,
      lon: 9.169802,
      alt: 1261,
      showAlt: 1244,
      restaurant: true,
      kitchen: true,
      phone: "+41819311507",
      web: "https://pellas.ch/essen-trinken/",
      blurb: {
        en: "Hotel restaurant opposite the Vella valley station, Pellas 213. Skiers walk across from the chair; lunch, afternoon and dinner are open to anyone, not only hotel guests.",
        de: "Hotelrestaurant gegenüber der Talstation Vella, Pellas 213. Von der Sesselbahn ist es ein kurzer Weg hinüber. Mittag, Nachmittag und Abend sind auch für externe Gäste offen."
      },
      hours: {
        en: "Winter 18 Dec 2026 – 4 Apr 2027. Daily: lunch 11:00–14:00, afternoon 14:00–17:00, dinner 17:30–20:30.",
        de: "Winter 18. Dez 2026 – 4. Apr 2027. Täglich: Mittag 11:00–14:00, Nachmittag 14:00–17:00, Abend 17:30–20:30."
      },
      menuNote: {
        en: "Pellas does not publish the daily lunch card. The prices below are the ones on pellas.ch on 24 Nov 2026: breakfast for outside guests, and the 2024 banquet card (aperitifs and menus from a price). Dishes inside those menus have no price of their own. Raclette and fondue are named for the Chäs Gondeli, without a price.",
        de: "Pellas veröffentlicht die tägliche Mittagskarte nicht. Die Preise unten stehen so auf pellas.ch, gelesen am 24. Nov 2026: Frühstück für externe Gäste und die Bankettkarte 2024 (Apéros und Menüs ab einem Preis). Die Gerichte in diesen Menüs haben keinen eigenen Preis. Raclette und Fondue nennt das Chäs Gondeli, ohne Preis."
      },
      menu: [
        { cat: "specialty", name: "Frühstück für externe Gäste", en: "Breakfast for guests who are not staying", price: 35, tags: ["fruehstueck", "breakfast"] },
        { cat: "specialty", name: "Apéro Stein", en: "Grissini, olives, dried tomatoes, parmesan", price: 8, tags: ["apero", "grissini"] },
        { cat: "specialty", name: "Apéro Mundaun", en: "Grissini, Andutgel, Bündnerfleisch, mountain cheese", price: 12, tags: ["apero", "fleisch", "kaese", "cheese"] },
        { cat: "specialty", name: "Pellas Apéro", en: "Choice of four canapés", price: 16, tags: ["apero", "canape"] },
        { cat: "main", name: "3-Gang-Menü ab", en: "3-course menu, from", price: 75, tags: ["menu", "gang"] },
        { cat: "main", name: "4-Gang-Menü ab CHF 89–95", en: "4-course menu, from CHF 89 to 95", price: null, tags: ["menu", "gang"] },
        { cat: "main", name: "5-Gang-Menü ab CHF 98–105", en: "5-course menu, from CHF 98 to 105", price: null, tags: ["menu", "gang"] },
        { cat: "main", name: "6-Gang-Menü ab CHF 109–115", en: "6-course menu, from CHF 109 to 115", price: null, tags: ["menu", "gang"] },
        { cat: "specialty", name: "Raclette", en: "In the Chäs Gondeli, up to 6 people. No published price.", price: null, tags: ["raclette", "kaese", "cheese"] },
        { cat: "specialty", name: "Fondue", en: "In the Chäs Gondeli, up to 6 people. No published price.", price: null, tags: ["fondue", "kaese", "cheese"] }
      ]
    },
    vella: {
      id: "vella",
      name: "Vella",
      area: "Val Lumnezia",
      lat: 46.71787,
      lon: 9.1695,
      alt: 1275,
      showAlt: 1280,
      restaurant: false,
      kind: "station"
    }
  };

  /* mode ski: downhill only. traverse: both ways. hike: both ways, on foot.
     lift: ride up; the way down is the ski link when there is one.
     rough: the corridor exists in the ski area, but this straight line is not a painted piste. */
  const links = [
    { from: "meierhof", to: "kartitscha", mode: "lift", length: 1877, speed: 2.8 },
    { from: "wali", to: "stein", mode: "lift", length: 1431, speed: 2.5 },
    { from: "wali", to: "sezner", mode: "lift", length: 2052, speed: 4 },
    { from: "leos", to: "stein", mode: "lift", length: 1962, speed: 5 },
    { from: "misanenga", to: "leos", mode: "lift", speed: 3.5 },
    { from: "valata", to: "cuolm", mode: "lift", length: 1412, speed: 2.5 },
    { from: "cuolm", to: "pizmundaun", mode: "lift", speed: 3.5 },
    { from: "vella", to: "triel", mode: "lift", length: 1230, speed: 4 },
    { from: "sezner", to: "wali", mode: "ski" },
    { from: "stein", to: "wali", mode: "ski" },
    { from: "stein", to: "leos", mode: "ski" },
    { from: "stein", to: "kartitscha", mode: "ski" },
    { from: "kartitscha", to: "meierhof", mode: "ski" },
    { from: "kartitscha", to: "leos", mode: "ski" },
    { from: "kartitscha", to: "wali", mode: "ski" },
    { from: "leos", to: "misanenga", mode: "ski" },
    { from: "leos", to: "chummenbuehl", mode: "ski" },
    { from: "pizmundaun", to: "cuolm", mode: "ski" },
    { from: "cuolm", to: "valata", mode: "ski" },
    { from: "hitzeggen", to: "lategia", mode: "ski" },
    { from: "lategia", to: "triel", mode: "ski" },
    { from: "hitzeggen", to: "triel", mode: "ski" },
    { from: "hitzeggen", to: "pizmundaun", mode: "ski" },
    { from: "triel", to: "vella", mode: "ski" },
    { from: "leos", to: "cuolm", mode: "traverse", rough: true },
    { from: "pizmundaun", to: "hitzeggen", mode: "traverse", rough: true },
    { from: "stein", to: "hitzeggen", mode: "traverse", rough: true },
    { from: "misanenga", to: "chummenbuehl", mode: "traverse" },
    { from: "misanenga", to: "rufalipark", mode: "hike" },
    { from: "vella", to: "pellas", mode: "hike" },
    { from: "stein", to: "sternenbar", mode: "hike" },
    { from: "wali", to: "waschchruet", mode: "hike" },
    { from: "meierhof", to: "chummenbuehl", mode: "hike" }
  ];

  return { places, links, season };
});
