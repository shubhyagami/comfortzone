# ComfortZone

**ComfortZone** is a lightweight, cross‑platform toolkit that collects environmental sensor data – temperature, humidity, and ambient noise – together with user‑reported comfort scores. The data is visualised on a live dashboard and automatically backed up.

## ⚙️ Prerequisites

| Component | Minimum version | Notes |
|-----------|-----------------|-------|
| Python | 3.8+ | Only the back‑end requires Python. |
| Node.js | 14+ | Required for the dashboard SPA. |
| npm | 6+ | Included with Node.js. |

> If you prefer a virtual environment for Python:

```bash
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
.\.venv\Scripts\activate     # Windows
```

## 📦 Installation

```bash
# 1️⃣  Clone the repository
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# 2️⃣  Install back‑end dependencies
pip install -r requirements.txt

# 3️⃣  Install front‑end dependencies
npm install
```

## 📁 Configuration

Run the init command once to generate the default files:

```bash
python -m comfortzone --init
```

The command creates:

| File | Purpose |
|------|---------|
| `config.yaml` | Core settings: backup schedule, retention, and driver options. |
| `widgets.json` | Dashboard layout and widget definitions. |

**Sample `config.yaml`**

```yaml
backup:
  cron: "0 0 * * SUN"   # Every Sunday at midnight

retention:
  logs: 7      # Keep logs for 7 days
  backups: 30 # Keep backup archives for 30 days
```

Edit the files to match your environment. The dashboard watches `widgets.json` and reloads instantly when it changes.

## 🚀 Quick Start

```bash
# Generate default config
python -m comfortzone --init

# Run the live dashboard
npm start
```

Open <http://localhost:3000> in a browser. The dashboard auto‑refreshes when you modify `widgets.json`.

## 🔧 Features

| Feature | Description |
|---------|-------------|
| **Real‑time logging** | Continuously records temperature (°C), humidity (%), and ambient noise (dB). |
| **Mood capture** | Users submit a 1–5 comfort score and optional notes. |
| **Customisable UI** | Define widgets and layout in `widgets.json`; changes take effect immediately. |
| **Analytics dashboard** | Correlation charts show how environmental factors influence mood. |
| **Automated backups** | Scheduled via a cron expression in `config.yaml`; retention policies are configurable. |
| **Extensible** | Add new sensor drivers or widgets with minimal Python/JavaScript changes. |

## 📌 Usage

### Logging sensor data

```bash
python -m comfortzone log --temp 22.5 --humidity 45 --noise 38
```

| Option     | Description                                 |
|------------|---------------------------------------------|
| `--temp`   | Temperature in °C (required).               |
| `--humidity`| Relative humidity in % (required).         |
| `--noise` | Ambient noise level in dB (required).      |

### Recording a mood

```bash
python -m comfortzone mood --score 4 --note "Focused"
```

| Option   | Description                                                   |
|----------|---------------------------------------------------------------|
| `--score` | Integer 1–5 (1 = least comfortable, 5 = most). Required.     |
| `--note` | Optional descriptive text.                                   |

### Running the dashboard

After `npm start`, open <http://localhost:3000>. Any changes to `widgets.json` are applied instantly.

### Backups & retention

Backups run according to the `cron` expression in `config.yaml`. The `retention` section determines how long logs and backup archives are kept.

## 💡 Tips

- Pair ComfortZone with a smart thermostat to observe how temperature changes affect focus or relaxation.
- The noise widget highlights irregular dB spikes that may disturb concentration.
- Log a mood before starting a task; the analytics engine can suggest the ideal environment for that activity.

## 🤝 Contributing

Pull requests are welcome!  
1. Keep your branch updated with `main`.  
2. Follow the coding style guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
3. All contributions are licensed under the MIT license.

## 📜 License

MIT © [Shubh Yagami](https://github.com/shubhyagami)

## 🔄 Changelog

- **2026‑09‑18** – README cleanup and grammar fixes.  
- **2026‑09‑07** – Minor documentation cleanup.  
- **2026‑09‑01** – Added quick‑start guide and updated feature list.  
- **2026‑08‑30** – Updated badges; introduced `config.yaml`.  
- **2026‑08‑28** – Initial README rewrite.

---

### Badges

![License: MIT](https://img.shields.io/github/license/shubhyagami/comfortzone?style=flat-square)
![Latest Release](https://img.shields.io/github/v/release/shubhyagami/comfortzone?style=flat-square)
![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)
![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
