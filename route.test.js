const assert = require("assert");
const { plan, routeTo, estimateAlt, DATA } = require("./route.js");

const stein = DATA.places.stein;
const fromStein = { lat: stein.lat, lon: stein.lon, alt: stein.alt };
const planned = plan(fromStein, "easy");
const byId = Object.fromEntries(planned.rows.map((row) => [row.place.id, row]));

assert.strictEqual(byId.sternenbar.place.id, "sternenbar");
assert.ok(planned.rows[0].place.id === "sternenbar", "nearest to Stein should be the Sternenbar");
assert.ok(byId.sternenbar.route.minutes < 8, "Sternenbar from Stein is a short hop");

const kitchens = planned.rows.filter((row) => row.place.kitchen);
assert.ok(kitchens[0].route.minutes < 20, "a kitchen is within 20 min of Stein");
assert.ok(["wali", "kartitscha"].includes(kitchens[0].place.id), "nearest kitchen from Stein is Wali or Kartitscha");

for (const row of planned.rows) {
  assert.ok(Number.isFinite(row.route.minutes), row.place.id + " reachable from Stein");
  assert.ok(row.route.minutes < 150, row.place.id + " is not a multi-hour detour");
}

const mid = {
  lat: (stein.lat + DATA.places.kartitscha.lat) / 2,
  lon: (stein.lon + DATA.places.kartitscha.lon) / 2
};
mid.alt = estimateAlt(mid.lat, mid.lon);
const midPlan = plan(mid, "easy");
const midBy = Object.fromEntries(midPlan.rows.map((row) => [row.place.id, row]));
assert.ok(midBy.kartitscha.route.minutes < 12, "skiing down to Kartitscha is a short run");
assert.ok(midBy.kartitscha.route.minutes < midBy.lategia.route.minutes);
assert.ok(midPlan.rows[0].place.id === "kartitscha" || midPlan.rows[0].place.id === "wali");

const atTriel = { lat: DATA.places.triel.lat, lon: DATA.places.triel.lon, alt: DATA.places.triel.alt };
const trielPlan = plan(atTriel, "easy");
assert.strictEqual(trielPlan.rows[0].place.id, "triel");
assert.strictEqual(trielPlan.rows[0].route.here, true);

const fries = DATA.places.triel.menu.find((item) => item.name === "Pommes frites");
assert.strictEqual(fries.price, 9);

const seznerToValata = routeTo(
  { lat: DATA.places.sezner.lat, lon: DATA.places.sezner.lon, alt: DATA.places.sezner.alt },
  "valata",
  "easy"
);
assert.ok(seznerToValata.minutes > 15 && seznerToValata.minutes < 120);

const down = DATA.links.find((link) => link.mode === "ski" && link.from === "stein" && link.to === "kartitscha");
down.downMinutes = 3;
const timed = plan(fromStein, "easy");
const timedKart = timed.rows.find((row) => row.place.id === "kartitscha");
assert.ok(timedKart.route.minutes < 5, "a set downhill time replaces the estimate");
delete down.downMinutes;
down.downMinutes = 10;
down.downFastMinutes = 4;
const slowKart = plan(fromStein, "easy").rows.find((row) => row.place.id === "kartitscha");
const fastKart = plan(fromStein, "fast").rows.find((row) => row.place.id === "kartitscha");
assert.ok(slowKart.route.minutes >= 9 && slowKart.route.minutes <= 11, "easy pace uses the slower slope time");
assert.ok(fastKart.route.minutes >= 3 && fastKart.route.minutes <= 5, "faster pace uses the quicker slope time");
delete down.downMinutes;
delete down.downFastMinutes;

console.log("routes ok");
console.log("from Stein:");
for (const row of planned.rows.slice(0, 6)) {
  console.log(" ", row.place.short || row.place.name, Math.round(row.route.minutes) + " min", row.route.segments.map((s) => s.mode + ":" + s.to).join(" > "));
}
console.log("mid-piste alt", mid.alt, "kartitscha", Math.round(midBy.kartitscha.route.minutes), "wali", Math.round(midBy.wali.route.minutes));
console.log("sezner to valata", Math.round(seznerToValata.minutes));
