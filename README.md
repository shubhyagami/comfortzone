# ComfortZone
-------------
[![Python 3.8+](https://img.shields.io/badge/Python-3.8+-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

## Overview
ComfortZone is a hybrid Python and JavaScript toolkit that tracks, visualizes, and optimizes your personal environmental comfort. By connecting to local IoT sensors and incorporating subjective user inputs, it helps you maintain an ideal workspace condition.

## Features
### Environmental Comfort Tracking
Log ambient temperature, humidity, and noise levels from various IoT sensors.
### Subjective Mood Logging
A Python CLI tool for logging your mood and comfort level alongside collected sensor data.
### Customizable Dashboard
A local web dashboard built with Node.js that visualizes metrics, with layouts customizable via the `widgets.json` configuration file.

## Setup and Getting Started
To begin, install Python 3.8+ and Node.js 14+ on your machine. Ensure your network permissions allow the dashboard to connect to local IoT sensors.

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/shubhyagami/comfortzone.git
   cd comfortzone
   ```

2. Install dependencies
   ```bash
   pip install -r requirements.txt
   npm install
   ```

3. Initialize and run
   ```bash
   python -m comfortzone --init
   npm start
   ```

Once running, your local dashboard will be available at `http://localhost:3000`.

## Tips and Use Cases
- **Optimize Workspace Conditions:** Pair ComfortZone with an IoT thermostat to map productivity against room temperature.
- **Noise Insights:** Use the ambient noise tracker with your daily routine to visualize noise spikes.
- **Mood-Based Insights:** Regularly log manual mood inputs via the CLI to help the optimization algorithm learn your ideal comfort conditions faster.
- **Regular Backups:** Configure the application to back up logs weekly to preserve historical tracking data.
- **Customize Your Dashboard:** Add or rearrange widgets in `widgets.json` to focus on the metrics that matter most to you.

## Contributing
Contributions are welcome! Before opening a pull request, ensure your local branch is up to date with `main`. We use conventional commits to maintain a clear project history. See `CONTRIBUTING.md` for more details.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog
### 2026-08-26
- **Improved README:** Reorganized sections, clarified setup instructions, and refined feature descriptions.

### 2026-08-25
- **Initial README:** Reflected logical flow and reworded awkward phrasing.

---

I have removed the auto-generated blocks, organized sections logically, and added small useful touches to the README. I have also removed unnecessary information and made it concise while maintaining clarity.
