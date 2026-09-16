# ComfortZone

**ComfortZone** is a lightweight, cross‑platform toolkit that collects environmental sensor data – temperature, humidity, and ambient noise – together with user‑reported comfort scores. The data is visualised on a live dashboard and automatically backed up.

- **Back‑end**: Python 3.8+  
- **Front‑end**: Single‑page app built with Node.js 14+

---

## Badges

![License: MIT](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)
![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)
![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)
![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

---

## Quick Start

```bash
# 1️⃣  Clone the repository
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣  Install back‑end dependencies
pip install -r requirements.txt

# 3️⃣  Install front‑end dependencies
npm install

# 4️⃣  Generate default configuration files
python -m comfortzone --init

# 5️⃣  Launch the live dashboard
npm start
```

Open <http://localhost:3000> in a browser. The dashboard auto‑reloads when `widgets.json` is edited.

---

## Features

| Feature | Description |
|---------|-------------|
| **Real‑time logging** | Continuously records temperature (°C), humidity (%), and ambient noise (dB). |
| **Mood capture** | Users submit a 1–5 comfort score, optionally adding a note. |
| **Customisable UI** | Widgets and layout are defined in `widgets.json`; changes take effect instantly. |
| **Analytics dashboard** | Correlation charts reveal how environmental factors influence mood. |
| **Automated backups** | Cron‑based schedule defined in `config.yaml`; retention policies configurable. |
| **Extensible** | Add new sensor drivers or widgets with minimal Python/JavaScript effort. |

---

## Configuration

Run `python -m comfortzone --init` once; it creates two files:

| File          | Purpose |
|---------------|---------|
| `config.yaml` | Core settings – backup schedule, retention, and driver options |
| `widgets.json` | Dashboard layout and widget definitions |

### Sample `config.yaml`

```yaml
backup:
  cron: "0 0 * * SUN"   # Every Sunday at midnight

retention:
  logs: 7      # Keep logs for 7 days
  backups: 30  # Keep backup archives for 30 days
```

Edit these files to match your environment. `widgets.json` is watched by the dashboard and reloaded on every change.

---

## Usage

### Logging sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

| Option      | Description                                  |
|-------------|----------------------------------------------|
| `--temp`   | Temperature in °C (required)                |
| `--humidity`| Relative humidity in % (required)           |
| `--noise`  | Ambient noise level in dB (required)         |

### Recording a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

| Option   | Description                                      |
|----------|--------------------------------------------------|
| `--score` | Integer 1–5 (1 = least comfortable, 5 = most) (required) |
| `--note`  | Optional descriptive text                         |

### Running the dashboard

After `npm start`, open <http://localhost:3000>. Modifying `widgets.json` will instantly affect the UI.

### Backups & retention

Backups run according to the cron expression defined in `config.yaml`. The `retention` section dictates how long logs and backup archives are kept on disk.

---

## Tips

- Pair ComfortZone with a smart thermostat to see how temperature changes influence focus or relaxation.  
- The noise widget highlights irregular dB spikes that may disturb concentration.  
- Log a mood before starting a task; the analytics engine can suggest the ideal environment for that activity.

---

## Contributing

Pull requests are welcome.

1. Keep your branch up‑to‑date with `main`.  
2. Follow the coding style guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under the MIT license.

---

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## Changelog

- **2026‑09‑07** – Minor documentation cleanup and typo fixes.  
- **2026‑09‑01** – Added quick‑start guide and updated feature list.  
- **2026‑08‑30** – Updated badges; introduced `config.yaml` for backup and retention.  
- **2026‑08‑28** – Initial README rewrite and typo corrections.
