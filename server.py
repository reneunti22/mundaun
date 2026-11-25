#!/usr/bin/env python3
"""Serve the hut app and save admin edits on this machine.

Run: python3 server.py
Phone: http://<this-computer-ip>:8080
Password: written to admin.password the first time, and printed then.
"""

import json
import os
import secrets
import hmac
import socket
import time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PASSWORD_FILE = ROOT / "admin.password"
OVERRIDES_FILE = ROOT / "overrides.json"
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8080"))
BLOCKED = {"admin.password", "overrides.json"}
sessions = {}


def put_minutes(data, key, raw):
    if raw is None or raw == "":
        data["times"].pop(key, None)
        return None
    try:
        minutes = float(raw)
    except (TypeError, ValueError):
        return "bad"
    if minutes < 1 or minutes > 180:
        return "bad"
    data["times"][key] = minutes
    return None


def load_password():
    env = os.environ.get("MUNDAUN_ADMIN_PASSWORD")
    if env:
        return env
    if PASSWORD_FILE.exists():
        return PASSWORD_FILE.read_text(encoding="utf-8").strip()
    password = secrets.token_urlsafe(8)
    PASSWORD_FILE.write_text(password + "\n", encoding="utf-8")
    print("Created admin.password")
    print("Admin password:", password)
    return password


PASSWORD = load_password()


def empty_overrides():
    return {"prices": {}, "added": {}, "times": {}, "slopes": [], "removed": [], "places": []}


def load_overrides():
    if not OVERRIDES_FILE.exists():
        return empty_overrides()
    try:
        data = json.loads(OVERRIDES_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return empty_overrides()
    data.setdefault("prices", {})
    data.setdefault("added", {})
    data.setdefault("times", {})
    data.setdefault("slopes", [])
    data.setdefault("removed", [])
    data.setdefault("places", [])
    return data


def save_overrides(data):
    OVERRIDES_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def new_session():
    token = secrets.token_urlsafe(24)
    sessions[token] = time.time() + 12 * 3600
    return token


def valid_token(header):
    if not header or not header.startswith("Bearer "):
        return False
    token = header[7:].strip()
    expiry = sessions.get(token)
    if not expiry or expiry < time.time():
        sessions.pop(token, None)
        return False
    return True


def item_key(place_id, cat, name):
    return f"{place_id}|{cat}|{name}"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, code, payload):
        raw = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0") or 0)
        if length > 200_000:
            return None
        raw = self.rfile.read(length) if length else b"{}"
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            return None

    def require_admin(self):
        if valid_token(self.headers.get("Authorization")):
            return True
        self.send_json(401, {"error": "login"})
        return False

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        name = Path(path).name
        if name in BLOCKED or path.startswith("/api/") and path != "/api/overrides":
            self.send_json(404, {"error": "not found"})
            return
        if path == "/api/overrides":
            self.send_json(200, load_overrides())
            return
        super().do_GET()

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        body = self.read_json()
        if body is None:
            self.send_json(400, {"error": "bad json"})
            return
        if path == "/api/login":
            given = str(body.get("password", ""))
            if hmac.compare_digest(given, PASSWORD):
                self.send_json(200, {"token": new_session()})
            else:
                self.send_json(401, {"error": "login"})
            return
        if not self.require_admin():
            return
        data = load_overrides()
        if path == "/api/price":
            place_id = str(body.get("placeId", ""))
            cat = str(body.get("cat", "main"))[:40]
            name = str(body.get("name", "")).strip()[:80]
            if not place_id or not name:
                self.send_json(400, {"error": "missing dish"})
                return
            key = item_key(place_id, cat, name)
            if body.get("price") is None or body.get("price") == "":
                data["prices"].pop(key, None)
            else:
                try:
                    price = float(body["price"])
                except (TypeError, ValueError):
                    self.send_json(400, {"error": "price"})
                    return
                if price < 0 or price > 500:
                    self.send_json(400, {"error": "price"})
                    return
                data["prices"][key] = price
        elif path == "/api/item":
            place_id = str(body.get("placeId", ""))
            name = str(body.get("name", "")).strip()[:80]
            cat = str(body.get("cat", "main"))[:40] or "main"
            if not place_id or not name:
                self.send_json(400, {"error": "missing dish"})
                return
            price = body.get("price")
            if price is None or price == "":
                price = None
            else:
                try:
                    price = float(price)
                except (TypeError, ValueError):
                    self.send_json(400, {"error": "price"})
                    return
                if price < 0 or price > 500:
                    self.send_json(400, {"error": "price"})
                    return
            tags = body.get("tags") if isinstance(body.get("tags"), list) else []
            tags = [str(tag)[:40] for tag in tags][:12]
            data["added"].setdefault(place_id, [])
            data["added"][place_id].append({
                "cat": cat,
                "name": name,
                "en": str(body.get("en", "")).strip()[:80],
                "price": price,
                "tags": tags,
            })
        elif path == "/api/time":
            mode = body.get("mode")
            frm = str(body.get("from", ""))
            to = str(body.get("to", ""))
            if mode not in ("lift", "ski") or not frm or not to:
                self.send_json(400, {"error": "missing run"})
                return
            fast_value = None
            clear_fast = False
            if mode == "ski" and "fast" in body:
                raw_fast = body.get("fast")
                if raw_fast is None or raw_fast == "":
                    clear_fast = True
                else:
                    try:
                        fast_value = float(raw_fast)
                    except (TypeError, ValueError):
                        self.send_json(400, {"error": "minutes"})
                        return
                    if fast_value < 1 or fast_value > 180:
                        self.send_json(400, {"error": "minutes"})
                        return
            key = f"{mode}|{frm}|{to}"
            if put_minutes(data, key, body.get("minutes")):
                self.send_json(400, {"error": "minutes"})
                return
            if mode == "ski" and "fast" in body:
                fast_key = f"ski-fast|{frm}|{to}"
                if clear_fast:
                    data["times"].pop(fast_key, None)
                else:
                    data["times"][fast_key] = fast_value
        elif path == "/api/slope":
            frm = str(body.get("from", ""))
            to = str(body.get("to", ""))
            if not frm.isalnum() or not to.isalnum() or frm == to or len(frm) > 40 or len(to) > 40:
                self.send_json(400, {"error": "missing run"})
                return
            data.setdefault("slopes", [])
            match = None
            for slope in data["slopes"]:
                ends = {str(slope.get("from", "")), str(slope.get("to", ""))}
                if ends == {frm, to}:
                    match = slope
                    break
            if body.get("remove"):
                if match is None:
                    self.send_json(400, {"error": "missing run"})
                    return
                data["slopes"].remove(match)
                for ends in ((match.get("from"), match.get("to")), (frm, to), (to, frm)):
                    data["times"].pop(f"ski|{ends[0]}|{ends[1]}", None)
                    data["times"].pop(f"ski-fast|{ends[0]}|{ends[1]}", None)
            else:
                try:
                    minutes = float(body.get("minutes"))
                except (TypeError, ValueError):
                    self.send_json(400, {"error": "minutes"})
                    return
                if minutes < 1 or minutes > 180:
                    self.send_json(400, {"error": "minutes"})
                    return
                fast_value = None
                if "fast" in body and body.get("fast") not in (None, ""):
                    try:
                        fast_value = float(body.get("fast"))
                    except (TypeError, ValueError):
                        self.send_json(400, {"error": "minutes"})
                        return
                    if fast_value < 1 or fast_value > 180:
                        self.send_json(400, {"error": "minutes"})
                        return
                if match is None:
                    data["slopes"].append({"from": frm, "to": to})
                    key = f"ski|{frm}|{to}"
                else:
                    key = f"ski|{match.get('from')}|{match.get('to')}"
                data["times"][key] = minutes
                fast_key = "ski-fast|" + key.split("|", 1)[1]
                if "fast" in body:
                    if fast_value is None:
                        data["times"].pop(fast_key, None)
                    else:
                        data["times"][fast_key] = fast_value
        elif path == "/api/place":
            place_id = str(body.get("id", ""))
            if not place_id.isalnum() or len(place_id) > 40:
                self.send_json(400, {"error": "place"})
                return
            data.setdefault("removed", [])
            data.setdefault("places", [])
            if body.get("hide"):
                if place_id not in data["removed"]:
                    data["removed"].append(place_id)
            elif body.get("restore"):
                data["removed"] = [item for item in data["removed"] if item != place_id]
            elif body.get("remove"):
                kept = [item for item in data["places"] if str(item.get("id")) != place_id]
                if len(kept) == len(data["places"]):
                    self.send_json(400, {"error": "place"})
                    return
                data["places"] = kept
                data["removed"] = [item for item in data["removed"] if item != place_id]
                data["added"].pop(place_id, None)
                for price_key in list(data["prices"]):
                    if str(price_key).startswith(place_id + "|"):
                        data["prices"].pop(price_key, None)
                kept_slopes = []
                for slope in data["slopes"]:
                    ends = {str(slope.get("from", "")), str(slope.get("to", ""))}
                    if place_id in ends:
                        data["times"].pop(f"ski|{slope.get('from')}|{slope.get('to')}", None)
                        data["times"].pop(f"ski-fast|{slope.get('from')}|{slope.get('to')}", None)
                    else:
                        kept_slopes.append(slope)
                data["slopes"] = kept_slopes
            else:
                if any(str(item.get("id")) == place_id for item in data["places"]):
                    self.send_json(400, {"error": "place"})
                    return
                name = str(body.get("name", "")).strip()
                try:
                    lat = float(body.get("lat"))
                    lon = float(body.get("lon"))
                    alt = float(body.get("alt"))
                except (TypeError, ValueError):
                    self.send_json(400, {"error": "place"})
                    return
                if not name or not (46.65 <= lat <= 46.82 and 9.05 <= lon <= 9.22 and 1000 <= alt <= 2400):
                    self.send_json(400, {"error": "place"})
                    return
                area = body.get("area") if body.get("area") in ("Obersaxen", "Mundaun", "Val Lumnezia") else "Obersaxen"
                phone = "".join(ch for ch in str(body.get("phone", "")) if ch.isdigit() or ch == "+")[:16]
                data["places"].append({
                    "id": place_id,
                    "name": name[:80],
                    "short": name[:24],
                    "area": area,
                    "lat": lat,
                    "lon": lon,
                    "alt": alt,
                    "kitchen": body.get("kitchen") is not False,
                    "phone": phone,
                })
        else:
            self.send_json(404, {"error": "not found"})
            return
        save_overrides(data)
        self.send_json(200, data)


def lan_addresses():
    found = set()
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.connect(("192.0.2.1", 1))
        found.add(sock.getsockname()[0])
        sock.close()
    except OSError:
        pass
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            ip = info[4][0]
            if not ip.startswith("127."):
                found.add(ip)
    except OSError:
        pass
    return sorted(found)


def main():
    os.chdir(ROOT)
    try:
        server = ThreadingHTTPServer((HOST, PORT), Handler)
    except OSError as error:
        print("Port %s is already in use (%s)." % (PORT, error))
        print("Open http://127.0.0.1:%s if the app is already running." % PORT)
        print("Or set PORT to another number, such as 8099, and start again.")
        raise SystemExit(1)
    print("Leave this window open.")
    print("On this computer:  http://127.0.0.1:%s" % PORT)
    for ip in lan_addresses():
        print("On a phone:         http://%s:%s" % (ip, PORT))
    print("Admin password:    %s" % PASSWORD)
    print("Password file:     %s" % PASSWORD_FILE)
    server.serve_forever()


if __name__ == "__main__":
    main()
