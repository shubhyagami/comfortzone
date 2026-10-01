[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# ComfortZone

ComfortZone is a lightweight, cross‑platform toolkit that logs environmental sensor data (temperature, humidity, ambient noise) and allows users to record mood scores. A real‑time dashboard visualises the data, while cron‑based backups keep the logs safe.

![MIT License](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)
![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)
![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)
![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)
![CI](https://github.com/shubhyagami/comfortzone/actions/workflows/ci.yml/badge.svg?style=flat-square)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

---

## Table of contents

- [Overview](#overview)
- [Getting started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Command‑line interface](#command-line-interface)
- [Dashboard](#dashboard)
- [Backups & retention](#backups--retention)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Changelog](#changelog)

---

## Overview

- **Data logger** – captures temperature, humidity, and ambient noise from any compatible sensor driver.
- **Mood tracker** – simple 1–5 score with optional note.
- **Live dashboard** – single‑page app that refreshes automatically as new entries arrive.
- **Cron‑based backups** – configurable schedule and retention policies.
- **Extensible** – add new driver modules or dashboard widgets with minimal effort.

---

## Getting started

```bash
# 1️⃣ Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣ Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate          # macOS / Linux
.\\.venv\\Scripts\\activate         # Windows PowerShell

# 3️⃣ Install dependencies
pip install -r requirements.txt
npm install

# 4️⃣ Initialise configuration and database
python -m comfortzone --init

# 5️⃣ Launch the dashboard
npm start
```

Open <http://localhost:3000> in a browser. The SPA auto‑reloads whenever `widgets.json` is edited.

---

## Prerequisites

| Component | Minimum version | Role |
|-----------|-----------------|------|
| Python    | 3.8+            | Backend engine |
| Node.js   | 14+             | Front‑end SPA |
| npm       | 6+              | JavaScript package manager |

---

## Installation

Follow the **Getting started** instructions. If you only need the backend logger (e.g. on a server), you can skip the `npm` step and run `python -m comfortzone --init` to create the database and config files.

---

## Configuration

Upon first run, ComfortZone writes two files:

| File          | Purpose |
|---------------|---------|
| `config.yaml` | Backend settings (backup schedule, retention, driver options). |
| `widgets.json`| Dashboard layout and widget configuration. |

### Example `config.yaml`

```yaml
backup:
  cron: "0 0 * * SUN"   # Every Sunday at midnight

retention:
  logs: 7      # Keep logs for 7 days
  backups: 30  # Keep backup archives for 30 days
```

Edit these files as needed. The dashboard watches `widgets.json` and reloads instantly for any changes.

---

## Command‑line interface

Run `python -m comfortzone --help` for a full list of options.

### Log sensor data

```bash
python -m comfortzone log --temp <°C> --humidity <percent> --noise <dB>
```

| Option     | Required | Description |
|------------|----------|-------------|
| `--temp`   | ✔︎       | Temperature in degrees Celsius. |
| `--humidity`| ✔︎     | Relative humidity in percent. |
| `--noise`  | ✔︎       | Ambient noise level in decibels. |

### Record mood

```bash
python -m comfortzone mood --score <1‑5> [--note "text"]
```

| Option   | Required | Description |
|----------|----------|-------------|
| `--score`| ✔︎       | Integer from 1 (least comfortable) to 5 (most). |
| `--note` | ✖︎       | Optional descriptive text. |

### Initialise environment

```bash
python -m comfortzone --init
```

Creates the SQLite database `data.db` and the two configuration files in the repository root.

---

## Dashboard

Start the front‑end with `npm start`.  
The SPA is served at <http://localhost:3000>.  
Edit `widgets.json` to change the layout or add new widgets; changes take effect immediately.

---

## Backups & retention

- Backups are scheduled according to the `cron` expression under `backup:` in `config.yaml`.  
- The `retention:` section specifies how many days logs and backup archives are kept; older files are automatically purged.

---

## Features

- Real‑time logging of temperature, humidity, and ambient noise.  
- Simple mood capture with a 1‑5 score and optional note.  
- Live‑refreshing single‑page dashboard built from `widgets.json`.  
- Correlation analytics between environmental data and mood.  
- Cron‑based backups with configurable retention.  
- Extensible architecture for adding new sensor drivers or widgets.

---

## Contributing

Pull requests are welcome!  

1. Fork the repository and create a feature branch.  
2. Keep the branch up‑to‑date with `main`.  
3. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
4. Add tests for new functionality.  
5. Ensure all tests pass (`pytest`) before submitting.

All contributions remain under the MIT license.

---

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## Changelog

- **2026‑09‑28** – README cleanup and re‑organisation.  
- **2026‑09‑25** – Added quick‑start guide and updated configuration section.  
- **2026‑09‑20** – Minor documentation fixes.  
- **2026‑09‑07** – Updated feature list.
