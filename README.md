# ComfortZone

ComfortZone is a lightweight, cross‑platform toolkit that collects environmental sensor data (temperature, humidity, ambient noise) alongside user‑reported comfort scores. The data is visualised on an actively‑refreshing dashboard and automatically backed up.

---

## 🚀 Quick Start

```bash
# 1️⃣  Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣  Create a Python virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
.\.venv\Scripts\activate     # Windows

# 3️⃣  Install back‑end dependencies
pip install -r requirements.txt

# 4️⃣  Install front‑end dependencies
npm install

# 5️⃣  Generate default configuration files
python -m comfortzone --init

# 6️⃣  Start the live dashboard
npm start
```

Open <http://localhost:3000> in your browser. The dashboard will auto‑refresh when you edit `widgets.json`.

---

## 📦 Prerequisites

| Component | Minimum version | Notes |
|-----------|------------------|-------|
| Python    | 3.8+             | Only the back‑end uses Python. |
| Node.js   | 14+              | Required for the dashboard SPA. |
| npm       | 6+               | Bundled with Node.js. |

> **Tip**: If you prefer, skip the virtual‑environment step; the dependencies are lightweight.

---

## ⚙️ Configuration

After the first run, ComfortZone generates two JSON/YAML files:

| File          | Purpose |
|---------------|---------|
| `config.yaml` | Core settings: backup schedule, retention, and driver options. |
| `widgets.json`| Dashboard layout and widget definitions. |

**Example `config.yaml`**

```yaml
backup:
  cron: "0 0 * * SUN"   # Every Sunday at midnight

retention:
  logs: 7      # Keep logs for 7 days
  backups: 30 # Keep backup archives for 30 days
```

Edit these files to match your environment. The dashboard watches `widgets.json` and reloads instantly on changes.

---

## 📌 Usage

### Logging sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

| Option       | Description                                 |
|--------------|---------------------------------------------|
| `--temp`     | Temperature in °C (required).               |
| `--humidity` | Relative humidity in % (required).         |
| `--noise`    | Ambient noise level in dB (required).       |

### Recording a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

| Option   | Description                                                   |
|----------|---------------------------------------------------------------|
| `--score`| Integer 1–5 (1 = least comfortable, 5 = most). Required.     |
| `--note` | Optional descriptive text.                                     |

### Dashboard

Run `npm start` and visit <http://localhost:3000>. Any changes to `widgets.json` are applied instantly.

### Backups & Retention

Backups execute according to the `cron` expression in `config.yaml`. Retention rules regulate how long logs and backup archives are kept.

---

## 🎛️ Features

- **Real‑time logging** – Continuous collection of temperature, humidity, and noise.
- **Mood capture** – 1–5 score + optional notes per entry.
- **Customisable UI** – Define widgets and layout via `widgets.json`.
- **Analytics dashboard** – Correlation charts linking environment and mood.
- **Automated backups** – Cron‑scheduled snapshots with configurable retention.
- **Extensible** – Add sensor drivers or widgets with minimal code.

---

## 💡 Tips

- Pair ComfortZone with a smart thermostat to see how temperature changes affect focus or relaxation.
- The noise widget highlights irregular dB spikes that might disturb concentration.
- Log a mood before starting a task; the analytics engine can suggest the ideal environment for that activity.

---

## 🤝 Contributing

Pull requests are welcome!

1. Keep your branch up‑to‑date with `main`.  
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under the MIT license.

---

## 📜 License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## 🔄 Changelog

- **2026‑09‑20** – README cleanup, grammar fixes, added quick‑start guide.  
- **2026‑09‑18** – Minor documentation fixes.  
- **2026‑09‑07** – Updated feature list.  
- **2026‑09‑01** – Added quick‑start guide and updated configuration section.  
- **2026‑08‑30** – Introduced `config.yaml`.  
- **2026‑08‑28** – Initial README rewrite.

---

### Badges

![License: MIT](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)
![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)
![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)
![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
