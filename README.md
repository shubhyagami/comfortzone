# ComfortZone

[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)   
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)   
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)  
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)  
[![Docs](https://img.shields.io/badge/docs-yes-green?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/README.md)  
[![Version](https://img.shields.io/github/v/release/shubhyagami/comfortzone?include_prereleases&label=version&style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)

---

## Quick start

```bash
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone
pip install -r requirements.txt
npm install
python -m comfortzone --init   # creates default config.yaml and widgets.json
npm start                      # starts the dashboard on http://localhost:3000
```

Open the dashboard, log a few data points, and you’re ready to see your workspace health in action.

---

## Introduction

ComfortZone is a lightweight, cross‑language toolkit for monitoring and improving personal workspace comfort.  
It collects readings from local IoT sensors (temperature, humidity, noise), supplements them with user‑submitted mood scores, and presents the combined data on a local web dashboard. The dashboard is fully customizable and the code is designed to be easily extensible with new sensors or visualisations.

---

## Features

- **Continuous environmental recording** – temperature, humidity, and ambient noise are logged automatically.
- **Mood capture** – a CLI command lets you record a subjective comfort score and optional notes at any time.
- **Custom web UI** – a simple Node.js‑based dashboard; modify `widgets.json` to change the layout or add widgets.
- **Correlation analysis** – the tool visualises relationships between environment and mood, helping you spot patterns.
- **Automated backups** – log files are backed up weekly; schedule and retention policies are configurable via `config.yaml`.
- **Extensible architecture** – add sensor drivers or new dashboard widgets with minimal effort.

---

## Installation

### Prerequisites

* Python 3.8 or newer  
* Node.js 14 or newer

### Steps

```bash
# Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install
```

### Configuration

Create the default configuration files:

```bash
python -m comfortzone --init
```

This generates:

* `config.yaml` – main configuration, including backup schedule, retention policy, and driver settings.  
* `widgets.json` – UI layout for the dashboard.

### Start the dashboard

```bash
npm start
```

The dashboard is available at <http://localhost:3000>.

---

## Usage

### Logging sensor data

```bash
python -m comfortzone log --temp 22 --humidity 45 --noise 38
```

All values are in the units expected by the sensor drivers (°C, %, dB).

### Recording a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

The `score` is an integer on a 1–5 scale (5 = most comfortable). The optional `note` can describe the context.

### Editing the dashboard

Edit `widgets.json` to add, remove, or rearrange widgets. The changes take effect the next time you reload the dashboard page.

### Backup and retention

Backups are created automatically each week (Sunday by default).  
Change the schedule or modify retention policies in `config.yaml`:

```yaml
backup:
  cron: "0 0 * * SUN"   # runs every Sunday at midnight
retention:
  logs: 7                # keep logs for 7 days
  backups: 30            # keep backups for 30 days
```

---

## Tips

* Pair ComfortZone with a smart thermostat to see how temperature adjustments affect focus.  
* Use the noise widget to spot irregular spikes that might disturb your work.  
* Log mood regularly (e.g., before starting a task) to give the analytics engine enough data to learn your ideal environment.

---

## Contributing

We welcome contributions!  
Please keep your feature branch up‑to‑date with `main` before opening a pull request.  
Follow the conventions described in [CONTRIBUTING.md](CONTRIBUTING.md).  
All contributions are subject to the MIT License.

---

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## Changelog

* **2026‑09‑01** – Minor README cleanup, added quick‑start guide and refined feature list.  
* **2026‑08‑30** – Updated badges and introduced `config.yaml` for backup and retention settings.  
* **2026‑08‑28** – Initial README rewrite and typo corrections.
