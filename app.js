(function () {
  const DATA = window.MUNDAUN;
  const Route = window.MundaunRoute;
  const ORIGINAL_MENUS = {};
  const ORIGINAL_LINKS = DATA.links.map((link) => Object.assign({}, link));
  const ORIGINAL_PLACES = JSON.parse(JSON.stringify(DATA.places));
  for (const place of Object.values(DATA.places)) {
    if (place.restaurant) ORIGINAL_MENUS[place.id] = JSON.parse(JSON.stringify(place.menu));
  }
  let adminPlace = "triel";
  let adminNote = "";
  const STR = {
    en: {
      title: "Huts",
      locate: "Use my location",
      locating: "Looking for you…",
      gpsOn: "Location is on",
      easy: "Easy pace",
      fast: "Faster",
      tabMap: "Map",
      tabHungry: "Hungry",
      tabList: "Huts",
      where: "Where are you?",
      tapLift: "Tap the lift you are standing at, or use your location.",
      outside: "You are outside the ski area. Ski times start once you are on the hill.",
      secure: "This browser only shares location on a secure page. Pick the lift you are standing at.",
      denied: "Location is blocked. Pick the lift you are standing at.",
      unavailable: "No location fix. Pick the lift you are standing at.",
      closest: "Closest place to eat",
      closestBar: "Closest stop",
      meals: "Meals only",
      here: "You are here",
      min: "min",
      down: "down",
      up: "up",
      menu: "Menu",
      map: "On the map",
      call: "Call",
      site: "Website",
      close: "Close",
      noPrice: "Price at the hut",
      noMenu: "No priced menu is published. Call them, or ask at the board.",
      rough: "The line is a sketch along the lifts, not the painted piste. A queue can add longer than the ride.",
      crossing: "The crossing between valleys is approximate.",
      qLabel: "What do you want to eat?",
      qPlaceholder: "french fries, burger, soup, rösti…",
      closestRank: "Closest",
      cheapestRank: "Cheapest",
      cheapest: "Cheapest published",
      noPublished: "No hut publishes a price for this. The closest place that names it is below.",
      alsoCloser: "Closer, but no published price",
      side: "Side",
      with: "Comes with it",
      empty: "Nothing in the saved menus matches. Try fries, burger, soup, coffee or beer. Several huts have not put a menu online.",
      you: "You",
      mode_ski: "Ski",
      mode_lift: "Chair",
      mode_traverse: "Cross",
      mode_hike: "Walk",
      onRun: "On the run",
      fit: "Fit the route",
      winter: "Winter",
      veg: "Veg",
      source: "Places © OpenStreetMap contributors. Heights from the EU terrain model. This is not the official piste map.",
      admin: "Admin",
      adminOut: "Log out",
      adminLogin: "Admin login",
      password: "Password",
      signIn: "Sign in",
      badLogin: "That password does not match. On the Pi it is the line in admin.password.",
      noServer: "Start server.py on the Pi. The plain preview server cannot save.",
      saved: "Saved. Every phone that reloads this address gets it.",
      addDish: "Add a dish",
      dishName: "Dish name",
      price: "Price CHF",
      save: "Save",
      add: "Add",
      clearTime: "Estimate",
      twoPace: "Easy is the slower run, Faster is the quicker one. Leave a field empty to use the estimate.",
      lifts: "Lift ride up",
      slopes: "Ski down",
      addSlope: "Add a slope",
      hutsAdmin: "Restaurants",
      addPlace: "Add a restaurant",
      placeName: "Name",
      latitude: "Latitude",
      longitude: "Longitude",
      altitude: "Altitude m",
      phone: "Phone",
      kitchen: "Has a kitchen",
      hiddenPlaces: "Hidden",
      restore: "Put back",
      placeHint: "Then add a slope from a nearby lift, so the ski time can reach it. Add dishes in the menu above.",
      placeWhere: "Use a point in the ski area: latitude 46.65–46.82, longitude 9.05–9.22, altitude 1000–2400 m.",
      placeTaken: "That name is already used.",
      noHuts: "No restaurants are listed.",
      fromPlace: "From",
      toPlace: "To",
      samePlace: "Pick two different places.",
      remove: "Remove",
      minutesLabel: "Minutes",
      menuOf: "Menu",
      mealsOnly: "Hide the bar when a kitchen is a bit further",
      altAbout: "You are at about",
      dropLine: "Height change"
    },
    de: {
      title: "Hütten",
      locate: "Meinen Standort",
      locating: "Suche dich…",
      gpsOn: "Standort ist an",
      easy: "Gemütlich",
      fast: "Zügiger",
      tabMap: "Karte",
      tabHungry: "Hunger",
      tabList: "Hütten",
      where: "Wo stehst du?",
      tapLift: "Tippe den Lift an, bei dem du stehst, oder nimm deinen Standort.",
      outside: "Du bist ausserhalb des Skigebiets. Die Fahrzeit gilt erst am Hang.",
      secure: "Dieser Browser gibt den Standort nur auf einer sicheren Seite frei. Wähl den Lift, an dem du stehst.",
      denied: "Standort ist gesperrt. Wähl den Lift, an dem du stehst.",
      unavailable: "Kein Standort. Wähl den Lift, an dem du stehst.",
      closest: "Nächste Küche",
      closestBar: "Nächster Halt",
      meals: "Nur Küche",
      here: "Du bist da",
      min: "Min.",
      down: "runter",
      up: "rauf",
      menu: "Speisekarte",
      map: "Auf der Karte",
      call: "Anrufen",
      site: "Website",
      close: "Schliessen",
      noPrice: "Preis an der Hütte",
      noMenu: "Keine Preisliste veröffentlicht. Anrufen oder an der Tafel schauen.",
      rough: "Die Linie ist eine Skizze entlang der Lifte, nicht die markierte Piste. Eine Warteschlange dauert oft länger als die Fahrt.",
      crossing: "Der Wechsel zwischen den Tälern ist ungefähr.",
      qLabel: "Was möchtest du essen?",
      qPlaceholder: "Pommes, Burger, Suppe, Rösti…",
      closestRank: "Am nächsten",
      cheapestRank: "Am günstigsten",
      cheapest: "Günstigster veröffentlichter Preis",
      noPublished: "Keine Hütte veröffentlicht einen Preis dafür. Der nächste Ort, der es nennt, steht unten.",
      alsoCloser: "Näher, aber ohne veröffentlichten Preis",
      side: "Beilage",
      with: "Gibt es dazu",
      empty: "Nichts in den gespeicherten Karten passt. Versuch Pommes, Burger, Suppe, Kaffee oder Bier. Mehrere Hütten haben keine Karte online.",
      you: "Du",
      mode_ski: "Abfahrt",
      mode_lift: "Sesselbahn",
      mode_traverse: "Queren",
      mode_hike: "Zu Fuss",
      onRun: "Auf der Piste",
      fit: "Route zeigen",
      winter: "Winter",
      veg: "Vegi",
      source: "Orte © OpenStreetMap-Mitwirkende. Höhen aus dem EU-Geländemodell. Das ist nicht der offizielle Pistenplan.",
      admin: "Admin",
      adminOut: "Abmelden",
      adminLogin: "Admin-Anmeldung",
      password: "Passwort",
      signIn: "Anmelden",
      badLogin: "Das Passwort stimmt nicht. Auf dem Pi steht es in der Datei admin.password.",
      noServer: "server.py auf dem Pi starten. Der einfache Vorschauserver speichert nichts.",
      saved: "Gespeichert. Jedes Handy sieht es nach dem Neuladen.",
      addDish: "Gericht hinzufügen",
      dishName: "Name des Gerichts",
      price: "Preis CHF",
      save: "Speichern",
      add: "Hinzu",
      clearTime: "Schätzung",
      twoPace: "Gemütlich ist die langsamere Fahrt, Zügiger die schnellere. Ein leeres Feld nimmt die Schätzung.",
      lifts: "Sesselbahn rauf",
      slopes: "Abfahrt runter",
      addSlope: "Abfahrt hinzufügen",
      hutsAdmin: "Restaurants",
      addPlace: "Restaurant hinzufügen",
      placeName: "Name",
      latitude: "Breite",
      longitude: "Länge",
      altitude: "Höhe m",
      phone: "Telefon",
      kitchen: "Hat eine Küche",
      hiddenPlaces: "Ausgeblendet",
      restore: "Wieder zeigen",
      placeHint: "Danach eine Abfahrt von einem nahen Lift hinzufügen, damit die Fahrzeit hinkommt. Gerichte oben in der Karte ergänzen.",
      placeWhere: "Ein Punkt im Skigebiet: Breite 46.65–46.82, Länge 9.05–9.22, Höhe 1000–2400 m.",
      placeTaken: "Dieser Name ist schon vergeben.",
      noHuts: "Keine Restaurants in der Liste.",
      fromPlace: "Von",
      toPlace: "Nach",
      samePlace: "Zwei verschiedene Orte wählen.",
      remove: "Entfernen",
      minutesLabel: "Minuten",
      menuOf: "Karte",
      mealsOnly: "Die Bar ausblenden, wenn eine Küche etwas weiter ist",
      altAbout: "Du stehst auf etwa",
      dropLine: "Höhenunterschied"
    }
  };

  const SUGGEST = {
    en: ["French fries", "Burger", "Soup", "Rösti", "Coffee", "Beer"],
    de: ["Pommes", "Burger", "Suppe", "Rösti", "Kaffee", "Bier"]
  };

  const PHRASES = [
    ["french fries", "pommes"], ["pommes frites", "pommes"], ["hot dog", "hotdog"],
    ["käsespätzli", "spaetzli"], ["kasespatzli", "spaetzli"], ["glühwein", "gluhwein"],
    ["green mountain", "burger"]
  ];
  const WORDS = {
    fries: "pommes", frites: "pommes", chips: "pommes", pommes: "pommes",
    burger: "burger", hamburger: "burger",
    soup: "suppe", suppe: "suppe",
    coffee: "kaffee", kaffee: "kaffee", cafe: "kaffee", cappuccino: "kaffee", espresso: "kaffee",
    beer: "bier", bier: "bier",
    sausage: "wurst", wurst: "wurst",
    cheese: "kaese", kase: "kaese", kaese: "kaese",
    salad: "salat", salat: "salat",
    roesti: "roesti", rosti: "roesti",
    schnitzel: "schnitzel",
    spaetzli: "spaetzli", spatzli: "spaetzli",
    water: "wasser", wasser: "wasser",
    wine: "wein", wein: "wein",
    tea: "tee", tee: "tee",
    kids: "kids", kinder: "kids",
    nuggets: "nuggets",
    hotdog: "hotdog",
    steak: "steak",
    grill: "grill",
    capuns: "capuns",
    chocolate: "schokolade", schokolade: "schokolade", kakao: "schokolade",
    cola: "cola",
    ravioli: "ravioli",
    bowl: "bowl", bowls: "bowl"
  };

  const CATS = ["soup", "salad", "anytime", "specialty", "main", "kids", "side", "drink", "beer", "wine", "hot"];
  const CAT_LABEL = {
    en: { soup: "Soups", salad: "Salads", anytime: "Any time", specialty: "House", main: "Mains", kids: "Kids", side: "Sides", drink: "Soft drinks", beer: "Beer", wine: "Wine", hot: "Hot drinks" },
    de: { soup: "Suppen", salad: "Salate", anytime: "Zwischendurch", specialty: "Haus", main: "Hauptgerichte", kids: "Kinder", side: "Beilagen", drink: "Süssgetränke", beer: "Bier", wine: "Wein", hot: "Heissgetränke" }
  };

  const browserDe = (navigator.language || "").toLowerCase().startsWith("de");
  const state = {
    lang: localStorage.getItem("mundaun-lang") || (browserDe ? "de" : "en"),
    tab: "map",
    pace: localStorage.getItem("mundaun-pace") || "easy",
    mealsOnly: localStorage.getItem("mundaun-meals") !== "0",
    user: null,
    gps: "idle",
    focusId: null,
    query: "",
    rank: "closest",
    preset: null
  };
  const view = { x: 0, y: 0, w: 8000, h: 8000, ready: false, moved: false };
  const flakes = Array.from({ length: 42 }, (_, i) => world(
    46.704 + ((i * 37) % 100) / 100 * 0.062,
    9.092 + ((i * 61) % 100) / 100 * 0.082
  ));
  let watchId = null;
  let lastFetch = "";

  const svg = document.getElementById("map");
  const detail = document.getElementById("detail");

  function t(key) { return STR[state.lang][key] || key; }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }

  function norm(value) {
    return String(value || "")
      .toLowerCase()
      .replaceAll("ä", "ae")
      .replaceAll("ö", "oe")
      .replaceAll("ü", "ue")
      .replaceAll("ß", "ss")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function tokensOf(query) {
    let text = norm(query);
    const phrases = PHRASES.map(([from, to]) => [norm(from), to]).sort((a, b) => b[0].length - a[0].length);
    for (const [from, to] of phrases) text = text.replaceAll(from, " " + to + " ");
    const stop = new Set(["i", "want", "to", "eat", "a", "the", "some", "please", "me", "of", "and", "with", "for", "my", "at", "what", "is", "cheapest", "closest", "option", "ich", "moechte", "will", "essen", "habe", "hunger", "auf", "bitte", "was", "ist", "das", "die", "der", "ein", "eine", "zum", "zur", "mit", "guenstig", "guenstigste", "guenstigsten", "billig", "billigste", "naechste", "naechsten", "nachste", "nachsten", "am"]);
    return [...new Set(text.split(/[^a-z0-9]+/).filter(Boolean).map((word) => WORDS[word] || word))].filter((word) => !stop.has(word));
  }

  function chf(amount) {
    if (amount == null) return t("noPrice");
    return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" }).format(amount);
  }

  function meters(amount) {
    return Math.round(amount).toLocaleString("de-CH") + " m";
  }

  function distanceLabel(amount) {
    const n = Math.round(amount);
    if (Math.abs(n) < 1000) return meters(n);
    return (n / 1000).toLocaleString("de-CH", { maximumFractionDigits: 1 }) + " km";
  }

  function mins(amount) {
    if (amount < 0.8) return t("here");
    const n = Math.max(1, Math.round(amount));
    return state.lang === "de" ? `ca. ${n} Min.` : `about ${n} min`;
  }

  function world(lat, lon) {
    const lat0 = 46.735 * Math.PI / 180;
    return {
      x: (lon - 9.13) * 111320 * Math.cos(lat0),
      y: -(lat - 46.735) * 111320
    };
  }

  function restaurants() {
    return Object.values(DATA.places).filter((place) => place.restaurant);
  }

  function currentPlan() {
    if (!state.user) return null;
    return Route.plan(state.user, state.pace);
  }

  function focusedRow(plan) {
    if (!plan) return null;
    const meals = plan.rows.filter((row) => row.place.kitchen);
    const pool = state.mealsOnly ? meals : plan.rows;
    if (state.focusId) {
      return plan.rows.find((row) => row.place.id === state.focusId) || pool[0];
    }
    return pool[0] || plan.rows[0];
  }

  function outside() {
    if (!state.user) return false;
    return Route.distanceM(state.user, DATA.places.stein) > 20000;
  }

  function setUser(user) {
    state.user = user;
    localStorage.setItem("mundaun-pin", JSON.stringify({ lat: user.lat, lon: user.lon, alt: user.alt, source: user.source, preset: state.preset }));
    if (!view.moved) frame();
    refineAlt(user);
    paint();
  }

  async function refineAlt(user) {
    if (user.source === "preset") return;
    const key = user.lat.toFixed(3) + "," + user.lon.toFixed(3);
    if (key === lastFetch) return;
    lastFetch = key;
    try {
      const cache = JSON.parse(localStorage.getItem("mundaun-alts") || "{}");
      let alt = cache[key];
      if (alt == null) {
        const response = await fetch("https://api.opentopodata.org/v1/eudem25m?locations=" + user.lat + "," + user.lon);
        const json = await response.json();
        alt = json.results && json.results[0] && json.results[0].elevation;
        if (alt == null) return;
        alt = Math.round(alt);
        cache[key] = alt;
        localStorage.setItem("mundaun-alts", JSON.stringify(cache));
      }
      if (!state.user || state.user.source === "preset") return;
      if (Math.abs(state.user.lat - user.lat) > 0.002) return;
      state.user = { ...state.user, alt };
      paint();
    } catch (error) {
      /* The sketch still uses the height of the nearest run. */
    }
  }

  function locate() {
    if (!("geolocation" in navigator) || !window.isSecureContext) {
      state.gps = "insecure";
      paintStatus();
      return;
    }
    state.gps = "locating";
    paintStatus();
    navigator.geolocation.getCurrentPosition(applyFix, geoError, { enableHighAccuracy: true, timeout: 12000, maximumAge: 10000 });
  }

  function applyFix(pos) {
    state.preset = null;
    state.gps = "on";
    const next = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
      alt: Route.estimateAlt(pos.coords.latitude, pos.coords.longitude),
      source: "gps"
    };
    setUser(next);
    if (watchId == null) {
      watchId = navigator.geolocation.watchPosition((update) => {
        const moved = Route.distanceM(state.user, { lat: update.coords.latitude, lon: update.coords.longitude });
        if (moved < 40) return;
        state.preset = null;
        setUser({
          lat: update.coords.latitude,
          lon: update.coords.longitude,
          alt: Route.estimateAlt(update.coords.latitude, update.coords.longitude),
          source: "gps"
        });
      }, () => {}, { enableHighAccuracy: true, maximumAge: 8000 });
    }
  }

  function geoError(error) {
    state.gps = error && error.code === 1 ? "denied" : "unavailable";
    paintStatus();
  }

  function usePreset(id) {
    state.preset = id;
    state.focusId = null;
    if (id === "run") {
      const a = DATA.places.stein;
      const b = DATA.places.kartitscha;
      const lat = a.lat + (b.lat - a.lat) * 0.45;
      const lon = a.lon + (b.lon - a.lon) * 0.45;
      setUser({ lat, lon, alt: Route.estimateAlt(lat, lon), source: "preset" });
      return;
    }
    const place = DATA.places[id];
    setUser({ lat: place.lat, lon: place.lon, alt: place.alt, source: "preset" });
  }

  function frame() {
    const plan = currentPlan();
    const row = focusedRow(plan);
    const pts = restaurants().map((place) => world(place.lat, place.lon));
    if (state.user && row && !outside()) {
      pts.length = 0;
      pts.push(world(state.user.lat, state.user.lon));
      pts.push(world(row.place.lat, row.place.lon));
      for (const seg of row.route.segments) {
        const place = DATA.places[seg.to];
        if (place) pts.push(world(place.lat, place.lon));
      }
    }
    if (!pts.length) return;
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const rect = svg.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 40) return;
    const card = document.getElementById("closest").getBoundingClientRect();
    let cover = 0;
    if (card.width > 0 && card.left < rect.right && card.right > rect.left && card.top < rect.bottom) {
      cover = Math.min(0.58, Math.max(0, (rect.bottom - card.top) / rect.height));
    }
    const visible = 1 - cover;
    const aspect = rect.width / rect.height;
    const spanX = Math.max(520, (maxX - minX) * 1.2);
    const spanY = Math.max(520, (maxY - minY) * 1.2);
    let h = Math.max(spanY / visible, spanX / aspect);
    let w = h * aspect;
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    view.x = midX - w / 2;
    view.y = midY - (h * visible) / 2;
    view.w = w;
    view.h = h;
    view.ready = true;
  }

  function zoomBy(factor) {
    const cx = view.x + view.w / 2;
    const cy = view.y + view.h / 2;
    view.w = Math.min(20000, Math.max(600, view.w * factor));
    view.h = Math.min(20000, Math.max(600, view.h * factor));
    view.x = cx - view.w / 2;
    view.y = cy - view.h / 2;
    view.moved = true;
    paintMap();
  }

  function paintChrome() {
    document.documentElement.lang = state.lang === "de" ? "de" : "en";
    document.getElementById("title").textContent = t("title");
    document.getElementById("lang").textContent = state.lang === "de" ? "EN" : "DE";
    document.getElementById("season").innerHTML = esc(DATA.season[state.lang]).replace(
      "obersaxen-mundaun.ch",
      '<a href="https://www.obersaxen-mundaun.ch/de" target="_blank" rel="noopener">obersaxen-mundaun.ch</a>'
    );
    const locate = document.getElementById("locate");
    locate.textContent = state.gps === "locating" ? t("locating") : t("locate");
    locate.disabled = state.gps === "locating";
    document.querySelector('[data-pace="easy"]').textContent = t("easy");
    document.querySelector('[data-pace="fast"]').textContent = t("fast");
    document.querySelector('[data-pace="easy"]').setAttribute("aria-pressed", String(state.pace === "easy"));
    document.querySelector('[data-pace="fast"]').setAttribute("aria-pressed", String(state.pace === "fast"));
    document.querySelector('[data-tab="map"]').textContent = t("tabMap");
    document.querySelector('[data-tab="hungry"]').textContent = t("tabHungry");
    document.querySelector('[data-tab="list"]').textContent = t("tabList");
    document.querySelectorAll("nav button").forEach((button) => {
      if (button.dataset.tab === state.tab) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    document.getElementById("view-map").hidden = state.tab !== "map";
    document.getElementById("view-hungry").hidden = state.tab !== "hungry";
    document.getElementById("view-list").hidden = state.tab !== "list";
    document.getElementById("q-label").textContent = t("qLabel");
    document.getElementById("q").placeholder = t("qPlaceholder");
    document.querySelector('[data-rank="closest"]').textContent = t("closestRank");
    document.querySelector('[data-rank="cheapest"]').textContent = t("cheapestRank");
    document.querySelector('[data-rank="closest"]').setAttribute("aria-pressed", String(state.rank === "closest"));
    document.querySelector('[data-rank="cheapest"]').setAttribute("aria-pressed", String(state.rank === "cheapest"));
    document.getElementById("meals-label").textContent = t("mealsOnly");
    document.getElementById("meals-only").checked = state.mealsOnly;
    document.getElementById("fit").setAttribute("aria-label", t("fit"));
    document.getElementById("admin-open").textContent = t("admin");
    paintStatus();
    paintPresets();
    paintSuggestions();
  }

  function paintStatus() {
    const el = document.getElementById("loc-status");
    if (state.gps === "insecure") el.textContent = t("secure");
    else if (state.gps === "denied") el.textContent = t("denied");
    else if (state.gps === "unavailable") el.textContent = t("unavailable");
    else if (state.gps === "locating") el.textContent = t("locating");
    else if (state.user && state.user.source === "gps") el.textContent = t("gpsOn") + " · " + t("altAbout") + " " + meters(state.user.alt);
    else if (state.user) el.textContent = t("altAbout") + " " + meters(state.user.alt);
    else el.textContent = t("where");
  }

  function paintPresets() {
    const ids = ["stein", "kartitscha", "wali", "leos", "sezner", "triel", "pizmundaun", "valata", "run"];
    document.getElementById("presets").innerHTML = ids.map((id) => {
      const label = id === "run" ? t("onRun") : (DATA.places[id].short || DATA.places[id].name);
      const pressed = state.preset === id ? "true" : "false";
      return `<button type="button" data-preset="${id}" aria-pressed="${pressed}">${esc(label)}</button>`;
    }).join("");
  }

  function paintSuggestions() {
    document.getElementById("suggestions").innerHTML = SUGGEST[state.lang].map((label) =>
      `<button type="button" data-suggest="${esc(label)}">${esc(label)}</button>`
    ).join("");
  }

  function paintMap() {
    if (!view.ready) frame();
    if (!view.ready) return;
    svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
    const fs = view.w / 38;
    const plan = currentPlan();
    const row = focusedRow(plan);
    const parts = [];
    parts.push(`<rect x="${view.x}" y="${view.y}" width="${view.w}" height="${view.h}" fill="#d4e8f6"/>`);
    for (const blob of [
      [46.732, 9.112, 1700, "Obersaxen"],
      [46.752, 9.148, 1400, "Mundaun"],
      [46.728, 9.15, 1300, "Val Lumnezia"]
    ]) {
      const p = world(blob[0], blob[1]);
      parts.push(`<ellipse cx="${p.x}" cy="${p.y}" rx="${blob[2]}" ry="${blob[2] * 0.72}" fill="#f7fbfe"/>`);
      parts.push(`<text x="${p.x}" y="${p.y}" text-anchor="middle" fill="#7aa3bd" font-size="${fs * 1.15}" font-family="Palatino, Georgia, serif">${esc(blob[3])}</text>`);
    }
    for (let i = 0; i < flakes.length; i++) {
      const flake = flakes[i];
      const r = view.w / (900 + (i % 5) * 220);
      parts.push(`<circle cx="${flake.x}" cy="${flake.y}" r="${r}" fill="#ffffff" opacity="${0.55 + (i % 3) * 0.15}"/>`);
    }
    for (const link of DATA.links) {
      const a = world(DATA.places[link.from].lat, DATA.places[link.from].lon);
      const b = world(DATA.places[link.to].lat, DATA.places[link.to].lon);
      const dash = link.mode === "lift" ? ' stroke-dasharray="70 46"' : link.mode === "hike" ? ' stroke-dasharray="16 28"' : "";
      const color = link.mode === "lift" ? "#8eb0c8" : "#ffffff";
      if (link.mode === "ski") parts.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#9ec3da" stroke-width="${view.w / 200}" stroke-linecap="round"/>`);
      parts.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${color}" stroke-width="${view.w / 380}"${dash}/>`);
    }
    if (state.user && row && !outside() && !row.route.here) {
      let cursor = world(state.user.lat, state.user.lon);
      for (const seg of row.route.segments) {
        const place = DATA.places[seg.to];
        if (!place) continue;
        const next = world(place.lat, place.lon);
        parts.push(`<line x1="${cursor.x}" y1="${cursor.y}" x2="${next.x}" y2="${next.y}" stroke="#e25b1a" stroke-width="${view.w / 160}" stroke-linecap="round"/>`);
        cursor = next;
      }
    }
    for (const place of Object.values(DATA.places)) {
      if (place.restaurant || place.removed) continue;
      const p = world(place.lat, place.lon);
      parts.push(`<circle cx="${p.x}" cy="${p.y}" r="${view.w / 180}" fill="#5d7c94"/>`);
    }
    const listed = restaurants();
    const center = listed.reduce((sum, place) => {
      const p = world(place.lat, place.lon);
      return { x: sum.x + p.x, y: sum.y + p.y };
    }, { x: 0, y: 0 });
    if (listed.length) {
      center.x /= listed.length;
      center.y /= listed.length;
    }
    for (const place of listed) {
      const p = world(place.lat, place.lon);
      const selected = row && row.place.id === place.id;
      const fill = place.kitchen ? "#1d4e78" : "#d4652a";
      const r = selected ? view.w / 70 : view.w / 95;
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      const len = Math.hypot(dx, dy) || 1;
      const lx = p.x + (dx / len) * fs * 1.15;
      const ly = p.y + (dy / len) * fs * 1.15;
      parts.push(`<g data-pin="${place.id}" style="cursor:pointer">`);
      parts.push(`<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${fill}" stroke="#ffffff" stroke-width="${view.w / 280}"/>`);
      parts.push(`<text x="${lx}" y="${ly}" text-anchor="middle" fill="#163044" font-size="${fs * 0.72}" font-family="Segoe UI, sans-serif" font-weight="700">${esc(place.short || place.name)}</text>`);
      parts.push("</g>");
    }
    if (state.user) {
      const p = world(state.user.lat, state.user.lon);
      parts.push(`<circle cx="${p.x}" cy="${p.y}" r="${view.w / 55}" fill="none" stroke="#e23d3d" stroke-width="${view.w / 300}"/>`);
      parts.push(`<circle cx="${p.x}" cy="${p.y}" r="${view.w / 110}" fill="#e23d3d" stroke="#fff" stroke-width="${view.w / 400}"/>`);
    }
    svg.innerHTML = `<title id="map-title">${esc(t("tabMap"))}</title>` + parts.join("");
    const rect = svg.getBoundingClientRect();
    const px = rect.width / view.w;
    let bar = 500;
    if (px * bar < 70) bar = 1000;
    if (px * bar < 70) bar = 2000;
    document.getElementById("scale").textContent = distanceLabel(bar);
  }

  function paintClosest() {
    const el = document.getElementById("closest");
    const plan = currentPlan();
    if (!plan) {
      el.innerHTML = `<p class="kicker">${esc(t("where"))}</p><h2>${esc(t("title"))}</h2><p class="meta">${esc(t("tapLift"))}</p>`;
      return;
    }
    if (outside()) {
      el.innerHTML = `<p class="kicker">${esc(t("where"))}</p><p>${esc(t("outside"))}</p>`;
      return;
    }
    const row = focusedRow(plan);
    if (!row) {
      el.innerHTML = `<p class="kicker">${esc(t("closest"))}</p><p>${esc(t("noHuts"))}</p>`;
      return;
    }
    const any = plan.rows[0];
    const meal = plan.rows.find((item) => item.place.kitchen);
    const place = row.place;
    const route = row.route;
    const drop = route.drop || 0;
    const dropText = Math.abs(drop) < 40 ? "" : `${meters(Math.abs(drop))} ${drop > 0 ? t("down") : t("up")}`;
    let extra = "";
    if (state.mealsOnly && any && meal && any.place.id !== meal.place.id && (!state.focusId || state.focusId === meal.place.id)) {
      extra = `<p class="warn">${esc(any.place.short || any.place.name)} · ${esc(mins(any.route.minutes))} · ${esc(state.lang === "de" ? "wenn ein Getränk reicht" : "if a drink is enough")}</p>`;
    }
    const kicker = state.focusId ? place.area : (place.kitchen ? t("closest") : t("closestBar"));
    el.innerHTML = `
      <p class="kicker">${esc(kicker)}</p>
      <h2>${esc(place.name)}</h2>
      <p class="time">${route.here ? esc(t("here")) : Math.max(1, Math.round(route.minutes))}<span>${route.here ? "" : esc(t("min"))}</span></p>
      <p class="meta">${esc(distanceLabel(route.distanceM))} · ${esc(place.showAlt.toLocaleString("de-CH"))} m${dropText ? " · " + esc(dropText) : ""}</p>
      <div class="actions">
        <button type="button" data-menu="${place.id}">${esc(t("menu"))}</button>
        <a class="ghost" href="tel:${place.phone}">${esc(t("call"))}</a>
      </div>
      ${route.rough ? `<p class="warn">${esc(t("crossing"))}</p>` : ""}
      ${extra}`;
  }

  function matches() {
    const tokens = tokensOf(state.query);
    if (!tokens.length) return [];
    const plan = currentPlan();
    const timeOf = {};
    if (plan) for (const row of plan.rows) timeOf[row.place.id] = row.route.minutes;
    const found = [];
    for (const place of restaurants()) {
      for (const item of place.menu) {
        const hay = norm([item.name, item.en, ...(item.tags || []), ...(item.with || [])].join(" "));
        if (!tokens.every((token) => hay.includes(token))) continue;
        const kind = item.portion === "side" ? "side" : (item.with || []).some((tag) => tokens.includes(tag) || tokens.includes(norm(tag))) ? "with" : "dish";
        found.push({
          place,
          item,
          kind,
          minutes: timeOf[place.id] ?? null,
          price: item.price
        });
      }
    }
    return found;
  }

  function paintResults() {
    const el = document.getElementById("results");
    const found = matches();
    if (!state.query.trim()) {
      el.innerHTML = "";
      return;
    }
    if (!found.length) {
      el.innerHTML = `<p class="warn">${esc(t("empty"))}</p>`;
      return;
    }
    const priced = found.filter((hit) => hit.price != null).sort((a, b) => a.price - b.price || (a.minutes ?? 1e9) - (b.minutes ?? 1e9));
    const byTime = [...found].sort((a, b) => (a.minutes ?? 1e9) - (b.minutes ?? 1e9) || (a.price ?? 1e9) - (b.price ?? 1e9));
    const cheapest = priced[0];
    const closest = byTime[0];
    const cards = [];
    if (closest) cards.push(card(t("closestRank"), closest));
    if (cheapest) cards.push(card(t("cheapest"), cheapest));
    else cards.push(`<article class="pick"><p class="kicker">${esc(t("cheapest"))}</p><p>${esc(t("noPublished"))}</p></article>`);
    let note = "";
    if (cheapest) {
      const nearer = found.find((hit) => hit.price == null && hit.minutes != null && hit.minutes + 1 < cheapest.minutes);
      if (nearer) note = `<p class="warn">${esc(t("alsoCloser"))}: ${esc(nearer.place.name)} · ${esc(nearer.item.name)} · ${esc(mins(nearer.minutes))}</p>`;
    }
    const list = (state.rank === "cheapest" ? [...priced, ...found.filter((hit) => hit.price == null)] : byTime).map(hitRow).join("");
    el.innerHTML = `<div class="picks">${cards.join("")}</div>${note}<div class="hit-list">${list}</div>`;
  }

  function card(kicker, hit) {
    const kind = hit.kind === "side" ? t("side") : hit.kind === "with" ? t("with") : "";
    const when = hit.minutes == null ? "" : mins(hit.minutes);
    return `<article class="pick">
      <p class="kicker">${esc(kicker)}</p>
      <h3>${esc(state.lang === "en" && hit.item.en ? hit.item.en : hit.item.name)}</h3>
      <p class="price">${esc(chf(hit.price))}</p>
      <p class="meta">${esc(hit.place.name)}${when ? " · " + esc(when) : ""}${kind ? " · " + esc(kind) : ""}</p>
      <div class="actions">
        <button type="button" data-focus="${hit.place.id}">${esc(t("map"))}</button>
        <button type="button" class="ghost" data-menu="${hit.place.id}">${esc(t("menu"))}</button>
      </div>
    </article>`;
  }

  function hitRow(hit) {
    const when = hit.minutes == null ? "—" : mins(hit.minutes);
    return `<button type="button" class="hit" data-menu="${hit.place.id}">
      <strong>${esc(hit.item.name)}</strong>
      <strong>${esc(chf(hit.price))}</strong>
      <span class="who">${esc(hit.place.short || hit.place.name)} · ${esc(when)}</span>
    </button>`;
  }

  function paintList() {
    const plan = currentPlan();
    const rows = plan ? plan.rows : restaurants().map((place) => ({ place, route: null }));
    const visible = rows.filter((row) => !state.mealsOnly || row.place.kitchen);
    document.getElementById("list").innerHTML = visible.map((row) => {
      const time = row.route ? (row.route.here ? t("here") : mins(row.route.minutes)) : "";
      const priced = row.place.menu.some((item) => item.price != null);
      return `<article class="hut">
        <h3>${esc(row.place.name)}</h3>
        <p class="who">${esc(row.place.area)} · ${esc(row.place.showAlt.toLocaleString("de-CH"))} m${time ? " · " + esc(time) : ""}</p>
        <p>${esc(row.place.blurb[state.lang])}</p>
        <div class="actions">
          <button type="button" data-menu="${row.place.id}">${esc(priced ? t("menu") : t("menu"))}</button>
          <button type="button" class="ghost" data-focus="${row.place.id}">${esc(t("map"))}</button>
        </div>
      </article>`;
    }).join("") + `<p class="fine">${esc(t("source"))}</p>`;
  }

  function openDetail(id) {
    const place = DATA.places[id];
    if (!place || !place.restaurant) return;
    state.focusId = id;
    const plan = currentPlan();
    const row = plan && plan.rows.find((item) => item.place.id === id);
    const route = row ? row.route : null;
    const steps = route && route.segments.length
      ? `<ol class="steps">${route.segments.map((seg) => {
          const name = DATA.places[seg.to] ? (DATA.places[seg.to].short || DATA.places[seg.to].name) : t("you");
          return `<li><span>${esc(t("mode_" + seg.mode))} → ${esc(name)}</span><strong>${esc(mins(seg.minutes))}</strong></li>`;
        }).join("")}</ol>`
      : "";
    const profile = route ? profileSvg(route, place) : "";
    const groups = CATS.map((cat) => {
      const items = place.menu.filter((item) => item.cat === cat);
      if (!items.length) return "";
      return `<h3>${esc(CAT_LABEL[state.lang][cat])}</h3>` + items.map((item) => {
        const badges = [
          item.winter ? `<span class="badge">${esc(t("winter"))}</span>` : "",
          item.veg ? `<span class="badge">${esc(t("veg"))}</span>` : ""
        ].join("");
        const gloss = state.lang === "en" && item.en ? `<span class="gloss">${esc(item.en)}</span>` : "";
        return `<div class="menu-row"><div><strong>${esc(item.name)}</strong>${badges}${gloss}</div><strong>${esc(chf(item.price))}</strong></div>`;
      }).join("");
    }).join("");
    detail.innerHTML = `
      <div class="detail-head">
        <h2>${esc(place.name)}</h2>
        <button type="button" id="close-detail" aria-label="${esc(t("close"))}">×</button>
      </div>
      <div class="detail-body">
        <p class="meta">${esc(place.area)} · ${esc(place.showAlt.toLocaleString("de-CH"))} m</p>
        <p>${esc(place.blurb[state.lang])}</p>
        ${route ? `<p class="time">${route.here ? esc(t("here")) : Math.max(1, Math.round(route.minutes))}<span>${route.here ? "" : esc(t("min"))}</span></p>` : ""}
        ${profile}
        ${steps}
        ${route && route.rough ? `<p class="warn">${esc(t("crossing"))}</p>` : ""}
        <p class="warn">${esc(t("rough"))}</p>
        <div class="menu-actions">
          ${place.phone ? `<a href="tel:${esc(place.phone)}">${esc(t("call"))}</a>` : ""}
          ${place.web ? `<a class="ghost" href="${esc(place.web)}" target="_blank" rel="noopener">${esc(t("site"))}</a>` : ""}
        </div>
        ${place.hours[state.lang] ? `<p class="note">${esc(place.hours[state.lang])}</p>` : ""}
        <div class="menu">${groups || `<p>${esc(t("noMenu"))}</p>`}</div>
        <p class="note">${esc(place.menuNote[state.lang])}</p>
        <p class="fine">${esc(t("source"))}</p>
      </div>`;
    if (!detail.open) detail.showModal();
    paintMap();
    paintClosest();
  }

  function profileSvg(route, place) {
    if (!state.user) return "";
    const pts = [{ alt: state.user.alt }];
    for (const seg of route.segments) {
      if (DATA.places[seg.to]) pts.push({ alt: DATA.places[seg.to].alt });
    }
    if (pts.length < 2) return "";
    const alts = pts.map((p) => p.alt);
    const min = Math.min(...alts) - 30;
    const max = Math.max(...alts) + 30;
    const w = 320;
    const h = 84;
    const coords = pts.map((p, i) => {
      const x = (i / (pts.length - 1)) * (w - 16) + 8;
      const y = h - 12 - ((p.alt - min) / (max - min)) * (h - 24);
      return `${x},${y}`;
    }).join(" ");
    return `<svg class="profile" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(place.name)}"><polyline points="${coords}" fill="none" stroke="#1d4e78" stroke-width="3"/>${pts.map((p, i) => {
      const x = (i / (pts.length - 1)) * (w - 16) + 8;
      const y = h - 12 - ((p.alt - min) / (max - min)) * (h - 24);
      return `<circle cx="${x}" cy="${y}" r="4" fill="#e25b1a"/>`;
    }).join("")}</svg>`;
  }

  function paint() {
    paintChrome();
    if (state.tab === "map") {
      paintMap();
      paintClosest();
      if (!view.moved) {
        const before = view.h;
        frame();
        if (view.ready && Math.abs(view.h - before) > 8) paintMap();
      }
    } else if (state.tab === "hungry") paintResults();
    else paintList();
  }

  document.getElementById("lang").addEventListener("click", () => {
    state.lang = state.lang === "de" ? "en" : "de";
    localStorage.setItem("mundaun-lang", state.lang);
    paint();
  });
  document.getElementById("locate").addEventListener("click", locate);
  document.querySelectorAll("[data-pace]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pace = button.dataset.pace;
      localStorage.setItem("mundaun-pace", state.pace);
      paint();
    });
  });
  document.querySelectorAll("nav button").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      paint();
    });
  });
  document.getElementById("meals-only").addEventListener("change", (event) => {
    state.mealsOnly = event.target.checked;
    localStorage.setItem("mundaun-meals", state.mealsOnly ? "1" : "0");
    if (state.focusId && state.mealsOnly && DATA.places[state.focusId] && !DATA.places[state.focusId].kitchen) state.focusId = null;
    paint();
  });
  document.getElementById("search").addEventListener("submit", (event) => event.preventDefault());
  document.getElementById("q").addEventListener("input", (event) => {
    state.query = event.target.value;
    paintResults();
  });
  document.querySelectorAll("[data-rank]").forEach((button) => {
    button.addEventListener("click", () => {
      state.rank = button.dataset.rank;
      paint();
    });
  });
  document.getElementById("zoom-in").addEventListener("click", () => zoomBy(0.8));
  document.getElementById("zoom-out").addEventListener("click", () => zoomBy(1.25));
  document.getElementById("fit").addEventListener("click", () => {
    view.moved = false;
    frame();
    paintMap();
  });

  document.body.addEventListener("click", (event) => {
    const preset = event.target.closest("[data-preset]");
    if (preset) {
      view.moved = false;
      usePreset(preset.dataset.preset);
      return;
    }
    const suggest = event.target.closest("[data-suggest]");
    if (suggest) {
      const input = document.getElementById("q");
      input.value = suggest.dataset.suggest;
      state.query = suggest.dataset.suggest;
      state.tab = "hungry";
      paint();
      input.focus();
      return;
    }
    const menu = event.target.closest("[data-menu]");
    if (menu) {
      openDetail(menu.dataset.menu);
      return;
    }
    const focus = event.target.closest("[data-focus]");
    if (focus) {
      state.focusId = focus.dataset.focus;
      state.tab = "map";
      view.moved = false;
      frame();
      paint();
    }
  });

  detail.addEventListener("click", (event) => {
    if (event.target.id === "close-detail") detail.close();
  });

  let drag = null;
  svg.addEventListener("pointerdown", (event) => {
    svg.setPointerCapture(event.pointerId);
    drag = { x: event.clientX, y: event.clientY, vx: view.x, vy: view.y, moved: false };
  });
  svg.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.hypot(dx, dy) > 6) drag.moved = true;
    const rect = svg.getBoundingClientRect();
    view.x = drag.vx - (dx / rect.width) * view.w;
    view.y = drag.vy - (dy / rect.height) * view.h;
    if (drag.moved) {
      view.moved = true;
      paintMap();
    }
  });
  svg.addEventListener("pointerup", (event) => {
    const pin = event.target.closest && event.target.closest("[data-pin]");
    if (drag && !drag.moved && pin) openDetail(pin.dataset.pin);
    drag = null;
  });
  svg.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomBy(event.deltaY > 0 ? 1.12 : 0.88);
  }, { passive: false });

  function menuKey(placeId, item) {
    return placeId + "|" + (item.cat || "main") + "|" + item.name;
  }

  function placeIdFromName(name) {
    return name.toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 24);
  }

  function addedPlace(raw) {
    const id = String(raw.id || "");
    const name = String(raw.name || "").trim();
    const lat = Number(raw.lat);
    const lon = Number(raw.lon);
    const alt = Number(raw.alt);
    if (!/^[a-z0-9]{1,40}$/.test(id) || !name) return null;
    if (!(lat >= 46.65 && lat <= 46.82 && lon >= 9.05 && lon <= 9.22 && alt >= 1000 && alt <= 2400)) return null;
    const area = ["Obersaxen", "Mundaun", "Val Lumnezia"].includes(raw.area) ? raw.area : "Obersaxen";
    const phone = String(raw.phone || "").replace(/[^\d+]/g, "").slice(0, 16);
    return {
      id,
      name,
      short: String(raw.short || name).slice(0, 24),
      area,
      lat,
      lon,
      alt,
      showAlt: Math.round(alt),
      restaurant: true,
      kitchen: raw.kitchen !== false,
      phone,
      web: "",
      added: true,
      blurb: { en: "Added in the admin.", de: "Im Admin hinzugefügt." },
      hours: { en: "", de: "" },
      menuNote: { en: "Dishes added in the admin.", de: "Gerichte aus dem Admin." },
      menu: []
    };
  }

  function applyOverrides(data) {
    const prices = (data && data.prices) || {};
    const added = (data && data.added) || {};
    const times = (data && data.times) || {};
    const slopes = Array.isArray(data && data.slopes) ? data.slopes : [];
    const removed = Array.isArray(data && data.removed) ? data.removed : [];
    const extraPlaces = Array.isArray(data && data.places) ? data.places : [];
    for (const id of Object.keys(DATA.places)) {
      if (!ORIGINAL_PLACES[id]) delete DATA.places[id];
    }
    for (const [id, place] of Object.entries(ORIGINAL_PLACES)) {
      DATA.places[id] = JSON.parse(JSON.stringify(place));
    }
    for (const id of removed) {
      if (DATA.places[id] && ORIGINAL_PLACES[id] && ORIGINAL_PLACES[id].restaurant) {
        DATA.places[id].restaurant = false;
        DATA.places[id].removed = true;
      }
    }
    for (const raw of extraPlaces) {
      const place = addedPlace(raw);
      if (place && !ORIGINAL_PLACES[place.id]) DATA.places[place.id] = place;
    }
    if (state.focusId && (!DATA.places[state.focusId] || !DATA.places[state.focusId].restaurant)) state.focusId = null;
    DATA.links.splice(0, DATA.links.length, ...ORIGINAL_LINKS.map((link) => Object.assign({}, link)));
    for (const slope of slopes) {
      const from = String(slope.from || "");
      const to = String(slope.to || "");
      if (!DATA.places[from] || !DATA.places[to] || from === to) continue;
      const exists = DATA.links.some((link) => link.mode === "ski" && ((link.from === from && link.to === to) || (link.from === to && link.to === from)));
      if (!exists) DATA.links.push({ from, to, mode: "ski", added: true });
    }
    for (const place of Object.values(DATA.places)) {
      if (!place.restaurant) continue;
      const menu = JSON.parse(JSON.stringify(ORIGINAL_MENUS[place.id] || []));
      for (const item of menu) {
        const key = menuKey(place.id, item);
        if (Object.prototype.hasOwnProperty.call(prices, key)) item.price = prices[key];
      }
      for (const item of added[place.id] || []) {
        const copy = Object.assign({}, item);
        const key = menuKey(place.id, copy);
        if (Object.prototype.hasOwnProperty.call(prices, key)) copy.price = prices[key];
        menu.push(copy);
      }
      place.menu = menu;
    }
    for (const link of DATA.links) {
      delete link.upMinutes;
      delete link.downMinutes;
      delete link.downFastMinutes;
      const key = link.mode + "|" + link.from + "|" + link.to;
      const reverse = link.mode + "|" + link.to + "|" + link.from;
      const chosen = Object.prototype.hasOwnProperty.call(times, key) ? key : reverse;
      if (Object.prototype.hasOwnProperty.call(times, chosen)) {
        if (link.mode === "lift") link.upMinutes = times[chosen];
        if (link.mode === "ski") link.downMinutes = times[chosen];
      }
      if (link.mode === "ski") {
        const fastKey = "ski-fast|" + link.from + "|" + link.to;
        const fastReverse = "ski-fast|" + link.to + "|" + link.from;
        const fastChosen = Object.prototype.hasOwnProperty.call(times, fastKey) ? fastKey : fastReverse;
        if (Object.prototype.hasOwnProperty.call(times, fastChosen)) link.downFastMinutes = times[fastChosen];
      }
    }
  }

  async function loadOverrides() {
    try {
      const response = await fetch("./api/overrides", { cache: "no-store" });
      if (!response.ok) return;
      applyOverrides(await response.json());
      paint();
      if (document.getElementById("admin").open) renderAdmin();
    } catch (error) {
      /* Opening the files directly has no save server. */
    }
  }

  function adminToken() {
    return sessionStorage.getItem("mundaun-admin") || "";
  }

  async function adminPost(path, body) {
    let response;
    try {
      response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken()
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      adminNote = t("noServer");
      renderAdmin();
      return;
    }
    if (response.status === 401 && path !== "/api/login") {
      sessionStorage.removeItem("mundaun-admin");
      adminNote = t("badLogin");
      renderAdmin();
      return;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      adminNote = path === "/api/login" ? t("badLogin") : t("noServer");
      renderAdmin();
      return;
    }
    if (path === "/api/login") {
      sessionStorage.setItem("mundaun-admin", data.token);
      adminNote = "";
      renderAdmin();
      return;
    }
    applyOverrides(data);
    adminNote = t("saved");
    paint();
    renderAdmin();
  }

  function placeLabel(id) {
    const place = DATA.places[id];
    return place ? (place.short || place.name) : id;
  }

  function renderAdmin() {
    const dialog = document.getElementById("admin");
    const token = adminToken();
    let body;
    if (!token) {
      body = `<form id="admin-login" class="stack">
        <h2>${esc(t("adminLogin"))}</h2>
        <label>${esc(t("password"))}<input id="admin-password" type="password" autocomplete="current-password"></label>
        <button class="primary" type="submit">${esc(t("signIn"))}</button>
        ${adminNote ? `<p class="admin-error">${esc(adminNote)}</p>` : ""}
      </form>`;
    } else {
      const openPlaces = restaurants();
      const place = openPlaces.find((item) => item.id === adminPlace) || openPlaces[0] || null;
      if (place) adminPlace = place.id;
      const options = openPlaces.map((item) =>
        `<option value="${esc(item.id)}"${place && item.id === place.id ? " selected" : ""}>${esc(item.name)}</option>`
      ).join("");
      const rows = place ? place.menu.map((item) => `<div class="admin-row">
        <span>${esc(item.name)}</span>
        <input type="number" min="0" max="500" step="0.5" inputmode="decimal" value="${item.price == null ? "" : esc(item.price)}" data-price-cat="${esc(item.cat || "main")}" data-price-name="${esc(item.name)}" aria-label="${esc(item.name)}">
        <button type="button" data-save-price="${esc(item.cat || "main")}|${esc(item.name)}">${esc(t("save"))}</button>
      </div>`).join("") : "";
      const timeRow = (link) => {
        const a = DATA.places[link.from];
        const b = DATA.places[link.to];
        if (!a || !b) return "";
        const up = link.mode === "lift";
        const from = up ? (a.alt <= b.alt ? a : b) : (a.alt >= b.alt ? a : b);
        const to = from === a ? b : a;
        const value = up ? link.upMinutes : link.downMinutes;
        const remove = link.added ? `<button type="button" class="ghost" data-remove-slope="${esc(link.from)}|${esc(link.to)}">${esc(t("remove"))}</button>` : "";
        return `<div class="admin-row">
          <span>${esc(placeLabel(from.id))} → ${esc(placeLabel(to.id))}</span>
          <input type="number" min="1" max="180" step="1" inputmode="numeric" value="${value == null ? "" : esc(value)}" data-time-mode="${link.mode}" data-time-from="${esc(link.from)}" data-time-to="${esc(link.to)}" aria-label="${esc(t("minutesLabel"))}">
          <span class="admin-actions"><button type="button" data-save-time="${link.mode}|${esc(link.from)}|${esc(link.to)}">${esc(t("save"))}</button>${remove}</span>
        </div>`;
      };
      const lifts = DATA.links.filter((link) => link.mode === "lift").map(timeRow).join("");
      const slopeRow = (link) => {
        const a = DATA.places[link.from];
        const b = DATA.places[link.to];
        if (!a || !b) return "";
        const from = a.alt >= b.alt ? a : b;
        const to = from === a ? b : a;
        const remove = link.added ? `<button type="button" class="ghost" data-remove-slope="${esc(link.from)}|${esc(link.to)}">${esc(t("remove"))}</button>` : "";
        return `<div class="admin-slope">
          <span>${esc(placeLabel(from.id))} → ${esc(placeLabel(to.id))}</span>
          <input type="number" min="1" max="180" step="1" inputmode="numeric" value="${link.downMinutes == null ? "" : esc(link.downMinutes)}" data-easy placeholder="${esc(t("easy"))}" aria-label="${esc(t("easy"))}">
          <input type="number" min="1" max="180" step="1" inputmode="numeric" value="${link.downFastMinutes == null ? "" : esc(link.downFastMinutes)}" data-fast placeholder="${esc(t("fast"))}" aria-label="${esc(t("fast"))}">
          <span class="admin-actions"><button type="button" data-save-time="ski|${esc(link.from)}|${esc(link.to)}">${esc(t("save"))}</button>${remove}</span>
        </div>`;
      };
      const slopes = DATA.links.filter((link) => link.mode === "ski").map(slopeRow).join("");
      const placeOptions = Object.values(DATA.places)
        .filter((item) => !item.removed)
        .sort((a, b) => placeLabel(a.id).localeCompare(placeLabel(b.id), state.lang))
        .map((item) => `<option value="${esc(item.id)}">${esc(placeLabel(item.id))}</option>`)
        .join("");
      const hutRows = openPlaces.map((item) => `<div class="admin-row">
        <span>${esc(item.name)}</span>
        <span></span>
        <button type="button" class="ghost" data-hide-place="${esc(item.id)}" data-added-place="${item.added ? "1" : ""}">${esc(t("remove"))}</button>
      </div>`).join("");
      const hiddenRows = Object.values(DATA.places).filter((item) => item.removed).map((item) => `<div class="admin-row">
        <span>${esc(item.name)}</span>
        <span></span>
        <button type="button" data-restore-place="${esc(item.id)}">${esc(t("restore"))}</button>
      </div>`).join("");
      body = `<div class="stack">
        <div class="actions"><button type="button" class="ghost" id="admin-logout">${esc(t("adminOut"))}</button></div>
        ${adminNote ? `<p class="warn">${esc(adminNote)}</p>` : ""}
        <h3>${esc(t("hutsAdmin"))}</h3>
        <div>${hutRows || `<p>${esc(t("noHuts"))}</p>`}</div>
        ${hiddenRows ? `<h3>${esc(t("hiddenPlaces"))}</h3><div>${hiddenRows}</div>` : ""}
        <h3>${esc(t("addPlace"))}</h3>
        <form id="admin-place-add" class="stack">
          <input id="place-name" required maxlength="80" placeholder="${esc(t("placeName"))}">
          <select id="place-area">
            <option>Obersaxen</option>
            <option>Mundaun</option>
            <option>Val Lumnezia</option>
          </select>
          <input id="place-lat" required type="number" min="46.65" max="46.82" step="0.0001" inputmode="decimal" placeholder="${esc(t("latitude"))}">
          <input id="place-lon" required type="number" min="9.05" max="9.22" step="0.0001" inputmode="decimal" placeholder="${esc(t("longitude"))}">
          <input id="place-alt" required type="number" min="1000" max="2400" step="1" inputmode="numeric" placeholder="${esc(t("altitude"))}">
          <input id="place-phone" maxlength="20" inputmode="tel" placeholder="${esc(t("phone"))}">
          <label class="check"><input id="place-kitchen" type="checkbox" checked> <span>${esc(t("kitchen"))}</span></label>
          <button class="primary" type="submit">${esc(t("add"))}</button>
        </form>
        <p class="note">${esc(t("placeHint"))}</p>
        ${place ? `<label>${esc(t("menuOf"))}<select id="admin-place">${options}</select></label>` : `<p>${esc(t("noHuts"))}</p>`}
        <div>${rows || `<p>${esc(t("noMenu"))}</p>`}</div>
        <h3>${esc(t("addDish"))}</h3>
        <form id="admin-add" class="stack">
          <input id="new-name" required placeholder="${esc(t("dishName"))}" maxlength="80">
          <input id="new-price" type="number" min="0" max="500" step="0.5" inputmode="decimal" placeholder="${esc(t("price"))}">
          <select id="new-cat">
            <option value="main">${esc(CAT_LABEL[state.lang].main)}</option>
            <option value="side">${esc(CAT_LABEL[state.lang].side)}</option>
            <option value="soup">${esc(CAT_LABEL[state.lang].soup)}</option>
            <option value="drink">${esc(CAT_LABEL[state.lang].drink)}</option>
            <option value="kids">${esc(CAT_LABEL[state.lang].kids)}</option>
            <option value="specialty">${esc(CAT_LABEL[state.lang].specialty)}</option>
          </select>
          <button class="primary" type="submit">${esc(t("add"))}</button>
        </form>
        <h3>${esc(t("lifts"))}</h3>
        <p class="note">${esc(t("clearTime"))}: ${esc(state.lang === "de" ? "Feld leeren und speichern." : "Clear the field and save.")}</p>
        <div>${lifts}</div>
        <h3>${esc(t("slopes"))}</h3>
        <p class="note">${esc(t("twoPace"))}</p>
        <div>${slopes}</div>
        <h3>${esc(t("addSlope"))}</h3>
        <form id="admin-slope" class="stack">
          <label>${esc(t("fromPlace"))}<select id="slope-from">${placeOptions}</select></label>
          <label>${esc(t("toPlace"))}<select id="slope-to">${placeOptions}</select></label>
          <input id="slope-minutes" required type="number" min="1" max="180" step="1" inputmode="numeric" placeholder="${esc(t("easy"))}" aria-label="${esc(t("easy"))}">
          <input id="slope-fast" type="number" min="1" max="180" step="1" inputmode="numeric" placeholder="${esc(t("fast"))}" aria-label="${esc(t("fast"))}">
          <button class="primary" type="submit">${esc(t("add"))}</button>
        </form>
      </div>`;
    }
    dialog.innerHTML = `<div class="detail-head"><h2>${esc(t("admin"))}</h2><button type="button" id="admin-close" aria-label="${esc(t("close"))}">×</button></div><div class="detail-body">${body}</div>`;
    if (!dialog.open) dialog.showModal();
  }

  document.getElementById("admin-open").addEventListener("click", () => {
    adminNote = "";
    renderAdmin();
  });
  document.getElementById("admin").addEventListener("click", (event) => {
    if (event.target.id === "admin-close") document.getElementById("admin").close();
    if (event.target.id === "admin-logout") {
      sessionStorage.removeItem("mundaun-admin");
      adminNote = "";
      renderAdmin();
    }
    const priceButton = event.target.closest("[data-save-price]");
    if (priceButton) {
      const input = priceButton.parentElement.querySelector("input");
      const rawPrice = priceButton.dataset.savePrice;
      const cut = rawPrice.indexOf("|");
      const cat = rawPrice.slice(0, cut);
      const name = rawPrice.slice(cut + 1);
      adminPost("/api/price", {
        placeId: adminPlace,
        cat,
        name,
        price: input.value === "" ? null : Number(input.value)
      });
    }
    const timeButton = event.target.closest("[data-save-time]");
    if (timeButton) {
      const box = timeButton.closest(".admin-slope, .admin-row");
      const [mode, from, to] = timeButton.dataset.saveTime.split("|");
      if (mode === "ski") {
        const easy = box.querySelector("[data-easy]");
        const fast = box.querySelector("[data-fast]");
        adminPost("/api/time", {
          mode,
          from,
          to,
          minutes: easy.value === "" ? null : Number(easy.value),
          fast: fast.value === "" ? null : Number(fast.value)
        });
      } else {
        const input = box.querySelector("input");
        adminPost("/api/time", {
          mode,
          from,
          to,
          minutes: input.value === "" ? null : Number(input.value)
        });
      }
    }
    const removeSlope = event.target.closest("[data-remove-slope]");
    if (removeSlope) {
      const [from, to] = removeSlope.dataset.removeSlope.split("|");
      adminPost("/api/slope", { from, to, remove: true });
    }
    const hidePlace = event.target.closest("[data-hide-place]");
    if (hidePlace) {
      const id = hidePlace.dataset.hidePlace;
      adminPost("/api/place", hidePlace.dataset.addedPlace === "1" ? { id, remove: true } : { id, hide: true });
    }
    const restorePlace = event.target.closest("[data-restore-place]");
    if (restorePlace) adminPost("/api/place", { id: restorePlace.dataset.restorePlace, restore: true });
  });
  document.getElementById("admin").addEventListener("change", (event) => {
    if (event.target.id === "admin-place") {
      adminPlace = event.target.value;
      adminNote = "";
      renderAdmin();
    }
  });
  document.getElementById("admin").addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.id === "admin-login") {
      adminPost("/api/login", { password: document.getElementById("admin-password").value });
    }
    if (event.target.id === "admin-add") {
      const name = document.getElementById("new-name").value.trim();
      const priceRaw = document.getElementById("new-price").value;
      const tags = [...new Set(norm(name).split(/[^a-z0-9]+/).filter((word) => word.length > 2).flatMap((word) => WORDS[word] ? [word, WORDS[word]] : [word]))];
      adminPost("/api/item", {
        placeId: adminPlace,
        name,
        cat: document.getElementById("new-cat").value,
        price: priceRaw === "" ? null : Number(priceRaw),
        tags
      });
    }
    if (event.target.id === "admin-place-add") {
      const name = document.getElementById("place-name").value.trim();
      const id = placeIdFromName(name);
      const lat = Number(document.getElementById("place-lat").value);
      const lon = Number(document.getElementById("place-lon").value);
      const alt = Number(document.getElementById("place-alt").value);
      if (!id || DATA.places[id]) {
        adminNote = t("placeTaken");
        renderAdmin();
        return;
      }
      if (!(lat >= 46.65 && lat <= 46.82 && lon >= 9.05 && lon <= 9.22 && alt >= 1000 && alt <= 2400)) {
        adminNote = t("placeWhere");
        renderAdmin();
        return;
      }
      adminPost("/api/place", {
        id,
        name,
        area: document.getElementById("place-area").value,
        lat,
        lon,
        alt,
        phone: document.getElementById("place-phone").value,
        kitchen: document.getElementById("place-kitchen").checked
      });
    }
    if (event.target.id === "admin-slope") {
      const from = document.getElementById("slope-from").value;
      const to = document.getElementById("slope-to").value;
      const minutes = Number(document.getElementById("slope-minutes").value);
      if (from === to) {
        adminNote = t("samePlace");
        renderAdmin();
        return;
      }
      const fastRaw = document.getElementById("slope-fast").value;
      adminPost("/api/slope", {
        from,
        to,
        minutes,
        fast: fastRaw === "" ? null : Number(fastRaw)
      });
    }
  });

  const saved = localStorage.getItem("mundaun-pin");
  if (saved) {
    try {
      const pin = JSON.parse(saved);
      state.preset = pin.preset || null;
      state.user = { lat: pin.lat, lon: pin.lon, alt: pin.alt, source: pin.source || "preset" };
    } catch (error) {
      localStorage.removeItem("mundaun-pin");
    }
  }

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(() => {
      if (view.moved) return;
      view.ready = false;
      paintMap();
    }).observe(document.querySelector(".map-wrap"));
  }

  paint();
  loadOverrides();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
