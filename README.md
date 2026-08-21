# ComfortZone

[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

ComfortZone is a hybrid Python and JavaScript toolkit for tracking, visualizing, and optimizing personal environmental comfort. It connects to local IoT sensors to monitor temperature, humidity, and ambient noise. By combining hardware data with subjective user inputs, ComfortZone helps you identify and maintain your ideal workspace conditions.

## Features

- **Sensor Integration:** Automatically logs ambient temperature and humidity by connecting to standard IoT thermostats and hygrometers.
- **Ambient Noise Tracking:** Monitors environmental noise levels to help identify disruptions in your focus.
- **Subjective Mood Logging:** A Python CLI tool to manually log your current mood and comfort level alongside the collected sensor data.
- **Customizable Dashboard:** A local web dashboard built with Node.js that visualizes metrics. Layouts can be customized using the `widgets.json` configuration file.

## Getting Started

**Prerequisites:** Ensure you have Python 3.8+ and Node.js 14+ installed. The project requires read access to local IoT sensors, so verify that your network permissions allow the dashboard to connect to them.

**Setup:**

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhyagami/comfortzone.git
   cd comfortzone
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   npm install
   ```

3. **Initialize and run**
   ```bash
   python -m comfortzone --init
   npm start
   ```

Once running, your local dashboard will be available at `http://localhost:3000`.

> **Note:** If the dashboard fails to load sensor data, verify that your IoT devices are accessible on your local network and that your firewall allows traffic on port 3000.

## Usage Tips

- **Find Your Goldilocks Zone:** Use ComfortZone alongside an IoT thermostat to map productivity against room temperature. Many users find their optimal workspace is around 21.5°C (71°F) with 45% relative humidity.
- **Track Focus Disruptions:** Pair the ambient noise tracker with your daily routine. The dashboard visualizes noise spikes, helping you identify exactly when your environment disrupts your focus.
- **Log Mood Inputs:** The optimization algorithm learns your ideal comfort conditions faster when you regularly log manual mood inputs via the CLI.
- **Export Regularly:** Configure the application to back up logs weekly to preserve historical tracking data.
- **Customize Widgets:** Add or rearrange dashboard widgets by modifying `widgets.json` to focus on the metrics that matter most to you.

## Contributing

Contributions are welcome! Before opening a pull request, please ensure your local branch is up to date with `main`. We use conventional commits to maintain a clear project history (format: `feat: [change]`, `fix: [change]`). Keep your commits focused, and open an issue to discuss any major refactors before submitting a PR. See `CONTRIBUTING.md` for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog

### 2026-08-21
- **Docs:** Improved README flow, cleaned up section structures, and refined phrasing for clarity.

### 2026-08-20
- **Docs:** Refined overall README flow, added a troubleshooting note to the Getting Started section, and standardized formatting across sections.

### 2026-08-19
- **Docs:** Finalized README polish for clarity, logical flow, and prerequisite notes.

### 2026-08-12
- **Docs:** Restructured sections for logical flow, improved the project description, and clarified setup and usage instructions.
