╔══════════════════════════════════════════════════════════════════════════╗
║  ██████  ██████  ███    ███ ███████  ██████  ██████  ████████ ███████  ║
║ ██      ██    ██ ████  ████ ██      ██    ██ ██   ██    ██    ██       ║
║ ██      ██    ██ ██ ████ ██ █████   ██    ██ ██████     ██    █████    ║
║ ██      ██    ██ ██  ██  ██ ██      ██    ██ ██   ██    ██    ██       ║
║  ██████  ██████  ██      ██ ██       ██████  ██   ██    ██    ███████  ║
║  ██████  ██████  ██      ██ ██       ██████  ██   ██    ██    ███████  ║
║ ██      ██    ██ ██      ██ ██      ██    ██ ██   ██    ██         ██  ║
║ ██      ██    ██ ██      ██ ███████ ██    ██ ██████     ██    ███████  ║
╚══════════════════════════════════════════════════════════════════════════╝
                    ░░░░░░░░░░ comfortzone ░░░░░░░░░░
          Personal Comfort Zone Tracker — Python / JavaScript

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com/shubhyagami/comfortzone)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/badge/Stars-★-yellow?style=flat-square)](https://github.com/shubhyagami/comfortzone)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2026--07--31-informational?style=flat-square)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node 14+](https://img.shields.io/badge/Node-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Maintained](https://img.shields.io/badge/Maintained%20by-TVA-ff69b4?style=flat-square)](https://github.com/shubhyagami)

---

## 🔥 What Is This?

**ComfortZone** is your personal sanctuary of data – a hybrid Python/JS toolkit that tracks, visualises, and nudges you toward your ideal comfort metrics. Whether it's room temperature, ambient noise, humidity, or your subjective mood, ComfortZone turns raw sensor readings into act

---

## 🕰️ Contributing to the Sacred Timeline

> *“I *am* a variant.” — And so is your pull request.*

Welcome, Analyst! The Time Variance Authority has detected a branching timeline originating from your local development environment. Before you commit that code, please ensure your PR aligns with the **Sacred Timeline** of the `comfortzone` project. Unchecked variables will be pruned.

### 📜 Pruning Protocol (Before You Branch)
1. **Check Your Nexus:** Ensure your local branch is up to date with the **Sacred Timeline** (`main`). Timeline divergence from outdated codebases will not be tolerated.
2. **Minimize Variance:** Keep your commits focused. Massive reality-altering refactors without prior approval from a TVA Engineer may result in a Reset Charge deployed on your PR.
3. **Temps.commits:** We use conventional commits to maintain chronological order. Format: `feat: [change]`, `fix: [change]`, or `docs: [update to the TVA handbook]`.

### ⚙️ The Sacred Workflow
To submit a correc

---

## 🌟 Featured Use Case: The Cozy Home Office

Transform your workspace into a productivity haven with **ComfortZone**. Here’s how one Analyst uses it daily:

```python
# Example: Set your ideal comfort targets
targets = {
    "temperature": 22.0,   # °C – sweet spot for focus
    "humidity": 45,        # % – no dry eyes, no sticky keys
    "noise": 35,           # dB – library quiet, not silent
    "mood": 7              # out of 10 – baseline contentment
}

# Log a reading
from comfortzone import SensorLog
log = SensorLog()
log.add(temperature=23.1, humidity=42, noise=38, mood=8)
log.visualize()            # see your day in a sparkline
log.nudge()                # "Time to open a window!"
```

> **Pro Tip:** Combine with a smart plug and a fan. When ComfortZone detects temperature > 26°C for 15 minutes, it can trigger an IFTTT webhook to turn on the fan. Your future self will thank you.

---

## 💡 Pro Tips

| Tip | Why It Works |
|-----|--------------|
| 🌡️ **Measure at chest height** | Sensors near the floor/ceiling give skewed readings. Mount yours at desk level. |
| 🧠 **Log mood three times a day** | Morning, noon, evening – patterns emerge after a week. You’ll discover your peak comfort hours. |
| 🛌 **Pair with sleep data** | Export your comfort logs and cross‑reference with sleep quality. A 19°C room might be your golden ticket. |
| 🎧 **Use the JS frontend for live alerts** | The Node.js dashboard can push desktop notifications when metrics drift. |
| 📊 **Set a weekly review** | Every Sunday, run `comfortzone report --weekly` and look for trends. Adjust your targets accordingly. |

---

## 📅 Changelog – 2026-08-03

- **feat:** Added `nudge()` method that sends desktop alerts when any metric exceeds the comfort threshold for more than 5 minutes.
- **fix:** Corrected humidity scaling in Python sensor driver – no more negative percentages.
- **docs:** Updated API reference with examples for IFTTT integration.
- **style:** ASCII banner now responsive in terminal widths below 80 columns.

---

## 🧘 Motivational Quote

> *“Comfort is not a state of stagnation, but a dynamic equilibrium you curate every day.”*  
> — Unknown Analyst, TVA Archives

---

## ⚡ Quick Start

```bash
# Clone the Sacred Timeline
git clone https://github.com/shubhyagami/comfortzone.git
cd comfortzone

# Python setup (virtual environment recommended)
python -m venv venv
source venv/bin/activate   # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# JS setup (for dashboard)
cd frontend
npm install
npm run dev

# Run the tracker
cd ..
python comfortzone.py --demo
```

Open `http://localhost:3000` to see your first live comfort graph.

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| ⭐ Stars | 42 (and climbing) |
| 🔀 Forks | 7 |
| 🐛 Open Issues | 3 |
| 🚀 Latest Release | v1.2.0 (2026-07-15) |
| 📦 Lines of Code | 8,432 |
| 🌍 Used in | 12 countries |

---

*Maintained by the Time Variance Authority – for the Sacred Timeline, and for your comfort.*