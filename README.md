[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
# ComfortZone

[![MIT License](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/blob/main/LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)](https://github.com/shubhyagami/comfortzone/releases)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![CI](https://github.com/shubhyagami/comfortzone/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/shubhyagami/comfortzone/actions)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/shubhyagami/comfortzone/pulls)

ComfortZone is a lightweight, cross-platform toolkit that logs environmental sensor data — temperature, humidity, and ambient noise — alongside user-reported mood scores. The data is visualized on a live-refreshing dashboard that can also back up automatically on a schedule you define.

## Getting started

ComfortZone runs as a local web app: a Python backend records and stores sensor and mood data, and a Node.js frontend serves the dashboard. Follow the quick start below to get it running.

### Prerequisites

| Component | Minimum version | Role |
|-----------|-----------------|------|
| Python    | 3.8+            | Backend |
| Node.js   | 14+             | Frontend SPA |
| npm       | 6+              | Package manager (bundled with Node.js) |

Using a virtual environment keeps the Python dependencies isolated.

### Installation

    git clone https://github.com/shubhyagami/comfortzone.git
    cd comfortzone

    # Set up the Python environment
    python -m venv .venv
    source .venv/bin/activate      # macOS / Linux
    .\.venv\Scripts\activate       # Windows PowerShell

    pip install -r requirements.txt
    npm install

    # Initialize the database and configuration files
    python -m comfortzone --init

    # Start the dashboard
    npm start

Open <http://localhost:3000> to view the dashboard. Any changes to `widgets.json` are applied instantly.

## Configuration

On first run, ComfortZone creates two files in the repository root:

| File          | Purpose |
|---------------|---------|
| `config.yaml` | Core backend settings (backup schedule, retention, driver options). |
| `widgets.json`| Layout and configuration of the dashboard widgets. |

**config.yaml**

    backup:
      cron: "0 0 * * SUN"   # Sunday at midnight

    retention:
      logs: 7      # days
      backups: 30  # days

Edit `config.yaml` to match your environment. The dashboard automatically reloads changes you make to `widgets.json`.

## Command-line interface

Run `python -m comfortzone --help` to see all commands.

### Log sensor data

    python -m comfortzone log --temp 22.5 --humidity 45 --noise 38

| Option | Description |
|--------|-------------|
| `--temp` | Temperature in °C (required). |
| `--humidity` | Relative humidity in % (required). |
| `--noise` | Ambient noise level in dB (required). |

### Record mood

    python -m comfortzone mood --score 4 --note "Focused"

| Option | Description |
|--------|-------------|
| `--score` | Integer 1–5 (1 = least comfortable, 5 = most). |
| `--note` | Optional descriptive text. |

### Run dashboard

    npm start

Open <http://localhost:3000> to see the dashboard. The UI is generated from `widgets.json`, and any edits are applied on the fly.

### Backups and retention

Backups run according to the `cron` expression in `config.yaml`. Retention rules determine how many days logs and backup archives are kept.

## Features

- Real-time logging of temperature, humidity, and ambient noise.
- Mood capture with a 1–5 score and optional note.
- Customizable UI via `widgets.json`.
- Analytics dashboard correlating environment data with mood.
- Cron-based backups with configurable retention.
- Extensible: add new sensor drivers or widgets with minimal effort.

## Tips

- Pair ComfortZone with a smart thermostat to see how temperature changes affect focus or relaxation.
- The noise widget flags irregular dB spikes that may disturb concentration.
- Log a mood before starting a task; the analytics engine can suggest the ideal environment for that activity.

## Contributing

Pull requests are welcome. Please:

1. Keep your branch up-to-date with `main`.
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).
3. All contributions are licensed under the MIT license.

## License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

## Changelog

- **2026-09-28** – README cleanup and reorganization.
- **2026-09-25** – Added quick-start guide and updated configuration section.
- **2026-09-20** – Minor documentation fixes.
- **2026-09-07** – Updated feature list.
