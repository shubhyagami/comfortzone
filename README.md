# ComfortZone

![License: MIT](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)
![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)
![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)
![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

ComfortZone is a lightweight, cross‑platform toolkit that gathers environmental sensor data (temperature, humidity, ambient noise) together with user‑reported comfort scores. The data is visualised on an actively‑refreshing dashboard and automatically backed up.

---

## 🏁 Getting Started

```bash
# 1️⃣ Clone the repo
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣ Create (or skip) a Python virtual environment
python -m venv .venv
source .venv/bin/activate          # macOS/Linux
.\.venv\Scripts\activate            # Windows

# 3️⃣ Install dependencies
pip install -r requirements.txt
npm install

# 4️⃣ Initialise default config
python -m comfortzone --init

# 5️⃣ Run the live dashboard
npm start
```

Open <http://localhost:3000> in your browser. The dashboard auto‑refreshes whenever you edit `widgets.json`.

---

## 📦 Prerequisites

| Component | Minimum version | Notes |
|-----------|-----------------|-------|
| Python    | 3.8+            | Back‑end only |
| Node.js   | 14+             | Dashboard SPA |
| npm       | 6+              | Bundled with Node.js |

> *Tip:* You can skip the virtual‑environment step if you prefer a system‑wide install.

---

## ⚙️ Configuration

ComfortZone writes two files on first run:

* **`config.yaml`** – Core settings: backup schedule, retention, and driver options.  
* **`widgets.json`** – Dashboard layout and widget definitions.

Example `config.yaml`

```yaml
backup:
  cron: "0 0 * * SUN"   # Sunday at midnight

retention:
  logs: 7      # days
  backups: 30  # days
```

Edit `config.yaml` to match your environment. The dashboard watches `widgets.json` and reloads instantly when you change it.

---

## 📌 Usage

### Log sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

| Option       | Description                                                                  |
|--------------|-------------------------------------------------------------------------------|
| `--temp`     | Temperature in °C (required).                                               |
| `--humidity` | Relative humidity in % (required).                                           |
| `--noise`    | Ambient noise level in dB (required).                                       |

### Record a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

| Option   | Description                                          |
|----------|------------------------------------------------------|
| `--score`| Integer 1–5 (1 = least comfortable, 5 = most).      |
| `--note` | Optional descriptive text.                          |

### Dashboard

Run `npm start` and visit <http://localhost:3000>. Any changes to `widgets.json` are applied instantly.

### Backups & Retention

Backups run according to the `cron` expression in `config.yaml`. Retention rules control how long logs and backup archives are kept.

---

## 🎛️ Features

* Real‑time logging of temperature, humidity, and noise.
* Mood capture with a 1–5 score and optional notes.
* Customisable UI via `widgets.json`.
* Analytics dashboard that correlates environment data with mood.
* Automated cron‑based backups with configurable retention.
* Extensible: add sensor drivers or widgets with minimal effort.

---

## 💡 Tips

* Pair ComfortZone with a smart thermostat to observe how temperature changes affect focus or relaxation.
* The noise widget flags irregular dB spikes that may disturb concentration.
* Log a mood before starting a task; the analytics engine can suggest the ideal environment for that activity.

---

## 🤝 Contributing

Pull requests are welcome! Please:

1. Keep your branch up‑to‑date with `main`.  
2. Follow the style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under the MIT license.

---

## 📜 License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

---

## 🔄 Changelog

* **2026‑09‑20** – README cleanup, added quick‑start guide.  
* **2026‑09‑18** – Minor documentation fixes.  
* **2026‑09‑07** – Updated feature list.  
* **2026‑09‑01** – Added quick‑start guide and updated configuration section.  
* **2026‑08‑30** – Introduced `config.yaml`.  
* **2026‑08‑28** – Initial README rewrite.
