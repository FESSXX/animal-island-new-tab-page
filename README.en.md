# Animal Island New Tab

[中文](./README.md)

Animal Island New Tab is a Chrome and Edge new-tab extension built with React, WXT, and `animal-island-ui`. It replaces the browser new-tab page with an Animal Crossing-inspired dashboard that includes a live clock, search, shortcuts, and real-time weather.

![Animal Island New Tab](docs/screenshots/new-tab-overview.png)

## Features

- Animal Island / Animal Crossing-style new-tab page
- Chrome and Edge extension output through WXT
- Live clock with seconds
- Search engine selector for Bing, Google, and DuckDuckGo
- Shortcut carousel for frequently used sites
- Real-time weather through Open-Meteo
- Weather icons for clear, cloudy, overcast, fog, rain, snow, and thunderstorm states
- No server deployment required

## Tech Stack

- React 19
- TypeScript
- WXT
- `animal-island-ui`
- Open-Meteo Forecast API

## Requirements

- Node.js 20+
- npm
- Chrome or Microsoft Edge

## Development

```bash
git clone https://github.com/FESSXX/animal-island-new-tab-page.git
cd animal-island-new-tab-page
npm install
npm run dev
```

## Build

```bash
npm run build
```

The unpacked extension is generated at:

```text
.output/chrome-mv3/
```

## Load in Chrome or Edge

1. Run `npm run build`.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable developer mode.
4. Click **Load unpacked**.
5. Select `.output/chrome-mv3/`.
6. Open a new tab.

## Package as Zip

```bash
npm run zip
```

WXT creates a distributable extension archive under `.output/`.

## Weather

Weather uses browser geolocation and Open-Meteo. If location access or the API request fails, the page falls back to Beijing demo weather.

Extension permissions:

- `geolocation`
- `https://api.open-meteo.com/*`

## Project Structure

```text
entrypoints/newtab/   WXT new-tab entrypoint
src/App.tsx           Main React page and data flow
src/App.css           Visual styling
wxt.config.ts         WXT extension manifest config
EXTENSION.md          Short extension loading notes
```

## Scripts

```bash
npm run dev      # start WXT dev mode
npm run build    # type-check and build the extension
npm run zip      # build and zip the extension
npm run prepare  # generate WXT types
```
