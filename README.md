# Mundaun Huts

Phone app for the Obersaxen Mundaun ski area. From where you are standing it shows the closest hut, the menu with any published prices, and a sketch of how long the ski over takes.

## Start it on this Windows PC

`python3` is not installed here. That command opens a “Python was not found” message and does not start the app. From this folder:

```powershell
python server.py
```

Leave the window open. It prints:

```text
On this computer:  http://127.0.0.1:8080
On a phone:         http://192.168.x.x:8080
Admin password:    ........
```

Open `http://127.0.0.1:8080`. Do not open `http://0.0.0.0:8080`. The address `127.0.0.1:8099` only works while a copy was started with port 8099.

## Raspberry Pi 5

The Pi serves the app to phones on the same Wi-Fi, and it stores the admin’s menu and lift times. On the Pi the command is `python3`, which is different from this Windows PC.

1. Use Raspberry Pi OS 64-bit on the Pi 5 and connect it to the ski-house Wi-Fi.
2. Copy this folder onto the Pi, for example to `/home/pi/mundaun`. From your computer, with the Pi’s address:

```bash
scp -r . pi@192.168.1.20:mundaun
```

Use the username you created on the Pi if it is not `pi`.

3. On the Pi:

```bash
cd ~/mundaun
python3 server.py
```

Leave that window open. It prints the address to open and the admin password. On the Pi itself that address is `http://127.0.0.1:8080`. On a phone, use the `http://192.168…:8080` line from the same window. `hostname -I` is only a Linux command; it does nothing useful in Windows PowerShell.

Tap **Admin**, enter the password, then add dishes, change a price, or type how many minutes a lift takes up and a run takes down. Save. Reload the phone and the new numbers are in the hut list.

This Pi already serves the other two apps with Caddy. Ski Race Pals is `skiracepals.duckdns.org` proxied to port 3001. Budget is `budget-unti.duckdns.org` proxied to port 82. Mundaun joins that same file and keeps port 8080 to itself. The router forwards you already use stay as they are.

On the Pi, press Ctrl+C in the window where `python3 server.py` is running. Then:

```bash
sudo cp /home/ren/mundaun/deploy/mundaun.service /etc/systemd/system/mundaun.service
sudo systemctl daemon-reload
sudo systemctl enable --now mundaun
sudo systemctl status mundaun
```

That starts the app at every boot. Logs: `journalctl -u mundaun -f`.

Add this block to the existing `/etc/caddy/Caddyfile`, under the ski and budget blocks:

```
ox-mundaun.duckdns.org {
    reverse_proxy 127.0.0.1:8080
}
```

```bash
sudo systemctl reload caddy
```

Point `ox-mundaun` at the same public IP as the other two names on duckdns.org. Caddy requests the certificate the same way it did for them. Open the site the same way you open the budget site, with `ox-mundaun.duckdns.org` in place of `budget-unti.duckdns.org`. Live GPS works on that https address.

## On the phone

Menus and the slope map stay on the phone after the first visit. Live location only works when the page is opened over https (or on the phone itself via localhost). Without that, tap the lift you are standing at — Stein, Kartitscha, Wali, Triel and the others are on the map screen.

1. On a laptop, from this folder:

```bash
python server.py
```

The plain `python -m http.server` preview cannot save admin edits. Use `server.py`.

2. On the same Wi-Fi, open `http://<laptop-ip>:8080` in the phone browser.
3. Add it to the home screen so you can open it with gloves on.

At the bottom of the slope the browser may refuse location on a plain http address. The lift buttons still work, and they do not need a signal once the page has loaded once.

## What the time means

Easy pace is about 12 km/h along the run. Faster is about 20 km/h. A chair is the ride plus about two minutes to load, with no queue. The orange line connects lifts and huts in a straight sketch. It is not the painted piste, and a valley crossing is only approximate.

## Prices

Bergrestaurant Triel is the only hut with a public price list in the app, taken from their menu on 24 Nov 2026. Other dishes are ones the hut or Graubünden Ferien actually names. Where no price was published, the app says so instead of guessing. Sign in as admin to add a dish, change a price, or set how long a lift takes up and a run takes down. A time you save replaces the estimate for every phone using this Pi.
