/* Ski-time sketch between the huts.
   Easy pace is about 12 km/h along the slope, fast is about 20 km/h.
   A lift estimate is the ride plus about two minutes to load, and no queue.
   Lines are straight between stations. A rough link is a known corridor,
   not a promise that one painted piste follows it. */
(function (root, factory) {
  const data = typeof module === "object" && module.exports ? require("./data.js") : root.MUNDAUN;
  const api = factory(data);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MundaunRoute = api;
})(typeof self !== "undefined" ? self : this, function (DATA) {
  const R = 6371000;

  function distanceM(a, b) {
    const p1 = a.lat * Math.PI / 180;
    const p2 = b.lat * Math.PI / 180;
    const dp = (b.lat - a.lat) * Math.PI / 180;
    const dl = (b.lon - a.lon) * Math.PI / 180;
    const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function toXY(lat, lon) {
    const lat0 = 46.735 * Math.PI / 180;
    return {
      x: (lon - 9.13) * 111320 * Math.cos(lat0),
      y: (lat - 46.735) * 111320
    };
  }

  function projectToSegment(p, a, b) {
    const P = toXY(p.lat, p.lon);
    const A = toXY(a.lat, a.lon);
    const B = toXY(b.lat, b.lon);
    const abx = B.x - A.x;
    const aby = B.y - A.y;
    const len2 = abx * abx + aby * aby || 1;
    let t = ((P.x - A.x) * abx + (P.y - A.y) * aby) / len2;
    t = Math.max(0, Math.min(1, t));
    const x = A.x + abx * t;
    const y = A.y + aby * t;
    const dist = Math.hypot(P.x - x, P.y - y);
    const alt = a.alt + (b.alt - a.alt) * t;
    return { t, dist, alt };
  }

  function paceSpeeds(pace) {
    if (pace === "fast") return { ski: 333, traverse: 200, walk: 70, climb: 12 };
    return { ski: 200, traverse: 120, walk: 50, climb: 8 };
  }

  function skiMinutes(from, to, pace) {
    const s = paceSpeeds(pace);
    const horiz = distanceM(from, to) * 1.35;
    const drop = Math.max(0, from.alt - to.alt);
    const slope = Math.hypot(horiz, drop);
    return Math.max(2, slope / s.ski + 0.4);
  }

  function traverseMinutes(from, to, pace) {
    const s = paceSpeeds(pace);
    const horiz = distanceM(from, to) * 1.25;
    const climb = Math.max(0, to.alt - from.alt);
    return Math.max(2, horiz / s.traverse + climb / 10);
  }

  function hikeMinutes(from, to, pace) {
    const s = paceSpeeds(pace);
    const horiz = distanceM(from, to);
    const climb = Math.max(0, to.alt - from.alt);
    return Math.max(2, horiz / s.walk + climb / s.climb);
  }

  function liftMinutes(lengthM, speed) {
    return Math.max(4, lengthM / speed / 60 + 2);
  }

  function hasFixed(value) {
    return value != null && value !== "" && Number.isFinite(Number(value));
  }

  function rideUpMinutes(link) {
    if (hasFixed(link.upMinutes)) return Number(link.upMinutes);
    return liftMinutes(linkLength(link), link.speed);
  }

  function fixedDown(link, pace) {
    if (pace === "fast" && hasFixed(link.downFastMinutes)) return Number(link.downFastMinutes);
    if (hasFixed(link.downMinutes)) return Number(link.downMinutes);
    return null;
  }

  function rideDownMinutes(link, from, to, pace) {
    const fixed = fixedDown(link, pace);
    if (fixed != null) return fixed;
    return skiMinutes(from, to, pace);
  }

  function linkLength(link) {
    if (link.length) return link.length;
    return distanceM(DATA.places[link.from], DATA.places[link.to]);
  }

  function estimateAlt(lat, lon) {
    const p = { lat, lon };
    let best = null;
    for (const link of DATA.links) {
      const a = DATA.places[link.from];
      const b = DATA.places[link.to];
      const proj = projectToSegment(p, a, b);
      if (!best || proj.dist < best.dist) best = proj;
    }
    if (best && best.dist < 700) return Math.round(best.alt);
    let nearest = null;
    let nearestD = Infinity;
    for (const place of Object.values(DATA.places)) {
      const d = distanceM(p, place);
      if (d < nearestD) {
        nearestD = d;
        nearest = place;
      }
    }
    return nearest ? nearest.alt : 1600;
  }

  function buildGraph(user, pace) {
    const adj = {};
    const add = (from, to, minutes, mode, rough) => {
      if (!adj[from]) adj[from] = [];
      adj[from].push({ to, minutes, mode, rough: !!rough });
    };

    const skiPairs = new Set(
      DATA.links.filter((l) => l.mode === "ski").map((l) => [l.from, l.to].sort().join("|"))
    );

    for (const link of DATA.links) {
      const a = DATA.places[link.from];
      const b = DATA.places[link.to];
      if (link.mode === "lift") {
        const up = a.alt <= b.alt ? [a, b] : [b, a];
        const mins = rideUpMinutes(link);
        add(up[0].id, up[1].id, mins, "lift", link.rough);
        const pair = [a.id, b.id].sort().join("|");
        if (!skiPairs.has(pair)) add(up[1].id, up[0].id, mins, "lift", link.rough);
      } else if (link.mode === "ski") {
        const [hi, lo] = a.alt >= b.alt ? [a, b] : [b, a];
        add(hi.id, lo.id, rideDownMinutes(link, hi, lo, pace), "ski", link.rough);
      } else if (link.mode === "traverse") {
        add(a.id, b.id, traverseMinutes(a, b, pace), "traverse", link.rough);
        add(b.id, a.id, traverseMinutes(b, a, pace), "traverse", link.rough);
      } else if (link.mode === "hike") {
        add(a.id, b.id, hikeMinutes(a, b, pace), "hike", link.rough);
        add(b.id, a.id, hikeMinutes(b, a, pace), "hike", link.rough);
      }
    }

    if (user) {
      const you = "you";
      adj[you] = adj[you] || [];
      const attached = new Set();
      const connect = (id, minutes, mode, rough) => {
        add(you, id, Math.max(0.4, minutes), mode, rough);
        attached.add(id);
      };
      const fake = { lat: user.lat, lon: user.lon, alt: user.alt };

      for (const link of DATA.links) {
        const a = DATA.places[link.from];
        const b = DATA.places[link.to];
        const proj = projectToSegment(user, a, b);
        if (proj.dist > 220) continue;
        for (const place of [a, b]) {
          const d = distanceM(fake, place);
          let mode;
          let minutes;
          if (d < 70) {
            mode = "traverse";
            minutes = 0.4;
          } else if (link.mode === "lift" && place.alt > user.alt + 15) {
            mode = "lift";
            const span = Math.max(distanceM(a, b), 1);
            const frac = Math.min(1, d / span);
            minutes = Math.max(2, rideUpMinutes(link) * frac);
          } else if (place.alt < user.alt - 25 && link.mode === "ski") {
            mode = "ski";
            const fixed = fixedDown(link, pace);
            if (fixed != null) {
              const span = Math.max(distanceM(a, b), 1);
              minutes = Math.max(1, fixed * Math.min(1, d / span));
            } else {
              minutes = skiMinutes(fake, place, pace);
            }
          } else if (place.alt < user.alt - 25) {
            mode = "ski";
            minutes = skiMinutes(fake, place, pace);
          } else if (place.alt > user.alt + 25 && d < 450) {
            mode = "hike";
            minutes = hikeMinutes(fake, place, pace);
          } else if (Math.abs(place.alt - user.alt) <= 45) {
            mode = "traverse";
            minutes = traverseMinutes(fake, place, pace);
          } else continue;
          connect(place.id, minutes, mode, link.rough || proj.dist > 80);
        }
      }

      for (const place of Object.values(DATA.places)) {
        const d = distanceM(user, place);
        if (d > 280 || attached.has(place.id)) continue;
        const mode = place.alt < user.alt - 25 ? "ski" : place.alt > user.alt + 25 ? "hike" : "traverse";
        const minutes = d < 70 ? 0.4 : mode === "ski" ? skiMinutes(fake, place, pace) : mode === "hike" ? hikeMinutes(fake, place, pace) : traverseMinutes(fake, place, pace);
        connect(place.id, minutes, mode, d > 120);
      }

      if (attached.size === 0) {
        let nearest = null;
        let nearestD = Infinity;
        for (const place of Object.values(DATA.places)) {
          const d = distanceM(user, place);
          if (d < nearestD) {
            nearest = place;
            nearestD = d;
          }
        }
        const mode = nearest.alt < user.alt - 25 ? "ski" : "hike";
        const minutes = mode === "ski" ? skiMinutes(fake, nearest, pace) : hikeMinutes(fake, nearest, pace);
        connect(nearest.id, minutes, mode, true);
      }
    }

    return adj;
  }

  function dijkstra(adj, target) {
    const dist = { you: 0 };
    const prev = {};
    const seen = new Set();
    const queue = ["you"];
    while (queue.length) {
      queue.sort((a, b) => dist[a] - dist[b]);
      const u = queue.shift();
      if (seen.has(u)) continue;
      seen.add(u);
      if (u === target) break;
      for (const edge of adj[u] || []) {
        const next = dist[u] + edge.minutes;
        if (next < (dist[edge.to] ?? Infinity)) {
          dist[edge.to] = next;
          prev[edge.to] = { from: u, edge };
          queue.push(edge.to);
        }
      }
    }
    if (dist[target] == null) return null;
    const segments = [];
    let cursor = target;
    while (cursor !== "you") {
      const step = prev[cursor];
      if (!step) return null;
      segments.push({
        from: step.from,
        to: cursor,
        minutes: step.edge.minutes,
        mode: step.edge.mode,
        rough: step.edge.rough
      });
      cursor = step.from;
    }
    segments.reverse();
    return { minutes: dist[target], segments };
  }

  function routeTo(user, placeId, pace) {
    const place = DATA.places[placeId];
    const horiz = distanceM(user, place);
    if (horiz < 80) {
      return {
        minutes: 0,
        distanceM: horiz,
        segments: [],
        here: true,
        rough: false,
        drop: 0
      };
    }
    const adj = buildGraph(user, pace || "easy");
    const found = dijkstra(adj, placeId);
    if (!found) {
      const drop = user.alt - place.alt;
      const mins = drop > 30 ? skiMinutes(user, place, pace || "easy") : hikeMinutes(user, place, pace || "easy");
      return {
        minutes: mins,
        distanceM: horiz,
        segments: [{ from: "you", to: placeId, minutes: mins, mode: drop > 30 ? "ski" : "hike", rough: true }],
        here: false,
        rough: true,
        fallback: true,
        drop
      };
    }
    return {
      minutes: found.minutes,
      distanceM: horiz,
      segments: found.segments,
      here: false,
      rough: found.segments.some((s) => s.rough),
      drop: user.alt - place.alt
    };
  }

  function plan(user, pace) {
    const withAlt = {
      lat: user.lat,
      lon: user.lon,
      alt: user.alt != null ? user.alt : estimateAlt(user.lat, user.lon)
    };
    const rows = Object.values(DATA.places)
      .filter((p) => p.restaurant)
      .map((place) => ({ place, route: routeTo(withAlt, place.id, pace) }))
      .sort((a, b) => a.route.minutes - b.route.minutes || a.route.distanceM - b.route.distanceM);
    return { user: withAlt, rows };
  }

  return { distanceM, estimateAlt, routeTo, plan, DATA };
});
