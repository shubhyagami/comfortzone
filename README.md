# ComfortZone

[![License: MIT](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/shubhyagami/comfortzone/pulls)
[![CI](https://github.com/shubhyagami/comfortzone/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/shubhyagami/comfortzone/actions)

ComfortZone is a lightweight, cross‑platform toolkit that collects environmental sensor readings (temperature, humidity, ambient noise) together with user‑reported mood scores. The data is displayed on a live‑refreshing dashboard and automatically backed up according to a schedule you configure.

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2. (Optional) Create a virtual environment
python -m venv .venv
source .venv/bin/activate    # macOS/Linux
.\.venv\Scripts\activate    # Windows

# 3. Install the dependencies
pip install -r requirements.txt
npm install

# 4. Initialise the default configuration
python -m comfortzone --init

# 5. Start the live dashboard
npm start
```

Open <http://localhost:3000> and watch the widgets refresh automatically whenever you edit `widgets.json`.

---

## Prerequisites

| Component | Minimum version | Notes |
|-----------|-----------------|-------|
| Python    | 3.8+            | Backend only |
| Node.js   | 14+             | Dashboard SPA |
| npm       | 6+              | Bundled with Node.js |

> You can skip the virtual‑environment step if you prefer a system‑wide installation, but using a virtual environment isolates the Python dependencies.

---

## Configuration

On the first run ComfortZone creates two configuration files in the repository root:

| File | Purpose |
|------|---------|
| `config.yaml` | Core backend settings: backup schedule, retention policies, driver options. |
| `widgets.json` | Layout and configuration of the dashboard widgets. |

**Example `config.yaml`**

```yaml
backup:
  cron: "0 0 * * SUN"   # Sunday at midnight

retention:
  logs: 7      # days
  backups: 30  # days
```

Edit the file to match your environment. The dashboard automatically reloads any changes you make to `widgets.json`.

---

## Usage

ComfortZone is driven by a command‑line interface. `python -m comfortzone --help` lists all commands and options.

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

| Option       | Description                                      |
|--------------|--------------------------------------------------|
| `--temp`     | Temperature in °C (required).                    |
| `--humidity` | Relative humidity in % (required).              |
| `--noise`    | Ambient noise level in dB (required).           |

### Record mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

| Option   | Description                                       |
|----------|---------------------------------------------------|
| `--score`| Integer 1–5 (1 = least comfortable, 5 = most).   |
| `--note` | Optional descriptive text.                         |

### Dashboard

Run `npm start` and visit <http://localhost:3000>. Any edits to `widgets.json` are applied instantly.

### Backups & Retention

Backups run according to the `cron` expression set in `config.yaml`. Retention rules define how many days logs and backup archives are kept.

---

## Features

- Real‑time logging of temperature, humidity, and ambient noise.
- Mood capture with a 1–5 score and optional note.
- Customisable UI via `widgets.json`.
- Analytics dashboard correlating environment data with mood.
- Cron‑based backups with configurable retention.
- Extensible: add new sensor drivers or widgets with minimal effort.

---

## Tips

- Pair ComfortZone with a smart thermostat to explore how temperature changes affect focus or relaxation.
- The noise widget highlights irregular dB spikes that may disturb concentration.
- Log a mood before starting a task; the analytics engine can suggest the ideal environment for that activity.

---

## Contributing

Pull requests are welcome! Please:

1. Keep your branch up‑to‑date with `main`.  
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under the MIT license.

---

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## Changelog

- **2026‑09‑20** – README cleanup, added quick‑start guide.  
- **2026‑09‑18** – Minor documentation fixes.  
- **2026‑09‑07** – Updated feature list.  

---
