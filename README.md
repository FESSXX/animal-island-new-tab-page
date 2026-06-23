# Animal Island New Tab

一个动物森友会风格的 Chrome / Edge 新标签页浏览器扩展。基于 React、WXT 和 `animal-island-ui` 构建，提供实时钟表、搜索框、常用网站入口和实时天气。

![New tab overview](docs/screenshots/new-tab-overview.png)

## 功能

- 动物岛风格的新标签页界面
- Chrome / Edge 浏览器扩展，无需单独部署
- 实时时钟，包含秒数
- Bing / Google / DuckDuckGo 搜索引擎切换
- 常用网站快捷入口和分页切换
- 基于浏览器定位的实时天气
- 多天气状态图标：晴、多云、阴、雾、雨、雪、雷雨
- 使用 WXT 管理扩展入口，后续可继续添加 popup、options、background、content script

## 截图

### 首页

![New tab overview](docs/screenshots/new-tab-overview.png)

### 搜索框聚焦效果

![Search focus](docs/screenshots/search-focus.png)

### 实时天气

![Live weather](docs/screenshots/live-weather.png)

## 技术栈

- React 19
- TypeScript
- WXT
- `animal-island-ui`
- Open-Meteo Forecast API

## 环境要求

- Node.js 20+
- npm
- Chrome 或 Microsoft Edge

## 本地开发

```bash
git clone https://github.com/FESSXX/animal-island-new-tab-page.git
cd animal-island-new-tab-page
npm install
npm run dev
```

## 构建扩展

```bash
npm run build
```

构建产物在：

```text
.output/chrome-mv3/
```

## 在 Chrome / Edge 中加载

1. 执行 `npm run build`
2. 打开 `chrome://extensions` 或 `edge://extensions`
3. 开启开发者模式
4. 点击“加载已解压的扩展程序”
5. 选择 `.output/chrome-mv3/`
6. 新建一个标签页

## 打包 Zip

```bash
npm run zip
```

WXT 会在 `.output/` 下生成可分发的扩展压缩包。

## 天气说明

天气数据来自 Open-Meteo。扩展会先尝试使用浏览器定位获取当前位置天气；如果用户拒绝定位或接口请求失败，会回退到北京天气。

扩展权限：

- `geolocation`
- `https://api.open-meteo.com/*`

## 项目结构

```text
entrypoints/newtab/   WXT 新标签页入口
src/App.tsx           页面结构和数据逻辑
src/App.css           视觉样式
wxt.config.ts         WXT 和扩展 manifest 配置
EXTENSION.md          简短扩展加载说明
```

## 脚本

```bash
npm run dev      # 启动 WXT 开发模式
npm run build    # 类型检查并构建扩展
npm run zip      # 构建并打包扩展
npm run prepare  # 生成 WXT 类型
```

## English

Animal Island New Tab is a Chrome and Edge new-tab extension built with React, WXT, and `animal-island-ui`. It replaces the browser new-tab page with an Animal Crossing-inspired dashboard that includes a live clock, search, shortcuts, and real-time weather.

### Features

- Animal Island / Animal Crossing-style new-tab page
- Chrome and Edge extension output through WXT
- Live clock with seconds
- Search engine selector for Bing, Google, and DuckDuckGo
- Shortcut carousel for frequently used sites
- Real-time weather through Open-Meteo
- Weather icons for clear, cloudy, overcast, fog, rain, snow, and thunderstorm states
- No server deployment required

### Build

```bash
npm install
npm run build
```

Load `.output/chrome-mv3/` as an unpacked extension in Chrome or Edge.
