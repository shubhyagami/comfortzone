# ComfortZone
-------------
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

## Overview
ComfortZone is a hybrid Python and JavaScript toolkit that connects to local IoT sensors to track, visualize, and optimize personal environmental comfort. It combines hardware data with subjective user inputs to help you identify and maintain your ideal workspace conditions.

## Key Features
- **Sensor Integration:** Logs ambient temperature and humidity from standard IoT thermostats and hygrometers.
- **Ambient Noise Tracking:** Monitors environmental noise levels to help you identify disruptions in your focus.
- **Subjective Mood Logging:** A Python CLI tool for logging your current mood and comfort level alongside collected sensor data.
- **Customizable Dashboard:** A local web dashboard built with Node.js that visualizes metrics, with layouts customizable via the `widgets.json` configuration file.

## Getting Started
- **Prerequisites:** Ensure you have Python 3.8+ and Node.js 14+ installed. The project requires read access to local IoT sensors, so verify that your network permissions allow the dashboard to connect to them.
- **Setup:**

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

## Usage Tips
- **Find Your Comfort Zone:** Use ComfortZone alongside an IoT thermostat to map productivity against room temperature.
- **Track Focus Disruptions:** Pair the ambient noise tracker with your daily routine to visualize noise spikes.
- **Log Mood Inputs:** Regularly log manual mood inputs via the CLI to help the optimization algorithm learn your ideal comfort conditions faster.
- **Export Regularly:** Configure the application to back up logs weekly to preserve historical tracking data.
- **Customize Widgets:** Add or rearrange dashboard widgets by modifying `widgets.json` to focus on the metrics that matter most to you.

## Contributing
Contributions are welcome! Before opening a pull request, please ensure your local branch is up to date with `main`. We use conventional commits to maintain a clear project history (format: `feat: [change]`, `fix: [change]`). Keep your commits focused, and open an issue to discuss any major refactors before submitting a PR. See `CONTRIBUTING.md` for more details.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog
### 2026-08-25
- **Improved README:** Reflected a logical flow, reworded awkward phrasing, and clarified setup and usage instructions.

### 2026-08-21
- **Refined README:** Improved project description, added a troubleshooting note to the Getting Started section, and standardized formatting across sections.

### 2026-08-20
- **Polished README:** Finalized clarity, logical flow, and prerequisite notes.

### 2026-08-12
- **Restructured README:** Added a concise feature list, improved project overview, and clarified setup and usage instructions.
