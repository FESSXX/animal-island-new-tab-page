import { Button, Input, Select } from "animal-island-ui";
import "animal-island-ui/dist/index.css";
import { FormEvent, useEffect, useState } from "react";

const shortcuts = [
  { name: "Google", mark: "G", color: "google", href: "https://www.google.com" },
  { name: "Bing", mark: "b", color: "bing", href: "https://www.bing.com" },
  { name: "DuckDuckGo", mark: "D", color: "duck", href: "https://duckduckgo.com" },
  { name: "Dogfight", mark: "d", color: "dogfight", href: "https://dogfight360.com" },
  { name: "X", mark: "X", color: "x", href: "https://x.com" },
  { name: "Facebook", mark: "f", color: "facebook", href: "https://www.facebook.com" },
  { name: "YouTube", mark: "▶", color: "youtube", href: "https://www.youtube.com" },
];

const shortcutPages = [
  shortcuts,
  [
    { name: "Gmail", mark: "M", color: "google", href: "https://mail.google.com" },
    { name: "Maps", mark: "⌖", color: "bing", href: "https://maps.google.com" },
    { name: "Drive", mark: "△", color: "duck", href: "https://drive.google.com" },
    { name: "Docs", mark: "D", color: "google", href: "https://docs.google.com" },
    { name: "News", mark: "N", color: "dogfight", href: "https://news.google.com" },
    { name: "Reddit", mark: "r", color: "youtube", href: "https://www.reddit.com" },
    { name: "Figma", mark: "F", color: "x", href: "https://www.figma.com" },
  ],
];

const searchUrls = {
  bing: "https://www.bing.com/search?q=",
  google: "https://www.google.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
};

const searchOptions = [
  { key: "bing", label: "Bing" },
  { key: "google", label: "Google" },
  { key: "duckduckgo", label: "DuckDuckGo" },
];

const fallbackWeather: WeatherData = {
  label: "北京天气",
  state: "加载中",
  code: 3,
  temperature: 33,
  min: 21,
  max: 33,
  humidity: 28,
};

type WeatherData = {
  label: string;
  state: string;
  code: number;
  temperature: number;
  min: number;
  max: number;
  humidity: number;
};

type WeatherResponse = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    weather_code?: number;
  };
  daily?: {
    temperature_2m_min?: number[];
    temperature_2m_max?: number[];
  };
};

const weatherText: Record<number, string> = {
  0: "晴",
  1: "多云",
  2: "多云",
  3: "阴",
  45: "雾",
  48: "雾",
  51: "小雨",
  53: "小雨",
  55: "小雨",
  61: "雨",
  63: "雨",
  65: "大雨",
  71: "雪",
  73: "雪",
  75: "大雪",
  80: "阵雨",
  81: "阵雨",
  82: "强阵雨",
  95: "雷雨",
};

function humidityText(humidity: number) {
  if (humidity < 35) return "偏干";
  if (humidity > 70) return "偏湿";
  return "舒适";
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="clock-icon">
      <circle cx="32" cy="32" r="24" />
      <path d="M32 17v17l12 8" />
    </svg>
  );
}

function WeatherIcon({ code }: { code: number }) {
  if (code === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="weather-icon">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }

  if (code === 3) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="weather-icon">
        <path d="M17.5 19H7a5 5 0 1 1 4.8-6.4A4.5 4.5 0 1 1 17.5 19Z" />
        <path d="M7 19h11" />
      </svg>
    );
  }

  if (code === 45 || code === 48) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="weather-icon">
        <path d="M17.5 16H7a5 5 0 1 1 4.8-6.4A4.5 4.5 0 1 1 17.5 16Z" />
        <path d="M4 19h16M7 22h10" />
      </svg>
    );
  }

  if (code >= 71 && code <= 77) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="weather-icon">
        <path d="M17.5 14H7a5 5 0 1 1 4.8-6.4A4.5 4.5 0 1 1 17.5 14Z" />
        <path d="M8 18h.01M12 20h.01M16 18h.01" />
      </svg>
    );
  }

  if (code >= 51 && code <= 82) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="weather-icon">
        <path d="M17.5 14H7a5 5 0 1 1 4.8-6.4A4.5 4.5 0 1 1 17.5 14Z" />
        <path d="M8 18v2M12 17v2M16 18v2" />
      </svg>
    );
  }

  if (code >= 95) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="weather-icon">
        <path d="M17.5 14H7a5 5 0 1 1 4.8-6.4A4.5 4.5 0 1 1 17.5 14Z" />
        <path d="m13 15-3 5h4l-2 3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="weather-icon">
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m19.07 4.93-1.41 1.41" />
      <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function formatClock(date: Date) {
  return {
    main: date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }),
    seconds: String(date.getSeconds()).padStart(2, "0"),
  };
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="search-icon">
      <circle cx="21" cy="21" r="12" />
      <path d="m30 30 10 10" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="chevron-icon">
      <path d={direction === "left" ? "M19 8 11 16l8 8" : "m13 8 8 8-8 8"} />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="settings-icon">
      <path d="M24 15a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
      <path d="m24 5 3 6 7-1 1 7 6 3-4 6 4 6-6 3-1 7-7-1-3 6-3-6-7 1-1-7-6-3 4-6-4-6 6-3 1-7 7 1Z" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg viewBox="0 0 72 58" aria-hidden="true" className="leaf-mark">
      <path d="M37 47C20 46 8 35 7 16c17 1 29 12 30 31Z" />
      <path d="M38 48c4-18 16-31 31-35 3 17-11 31-31 35Z" />
      <path d="M39 48C28 34 25 20 31 5c14 10 17 25 8 43Z" />
    </svg>
  );
}

function App() {
  const [engine, setEngine] = useState<keyof typeof searchUrls>("bing");
  const [now, setNow] = useState(() => new Date());
  const [shortcutPage, setShortcutPage] = useState(0);
  const [weather, setWeather] = useState(fallbackWeather);
  const clock = formatClock(now);
  const visibleShortcuts = shortcutPages[shortcutPage];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      const location = await getLocation();
      const params = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: "temperature_2m,relative_humidity_2m,weather_code",
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        forecast_days: "1",
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal });
      const data = (await response.json()) as WeatherResponse;
      const current = data.current;
      const min = data.daily?.temperature_2m_min?.[0];
      const max = data.daily?.temperature_2m_max?.[0];
      if (!current || min === undefined || max === undefined) return;

      setWeather({
        label: location.label,
        state: weatherText[current.weather_code ?? 3] || "多云",
        code: current.weather_code ?? fallbackWeather.code,
        temperature: Math.round(current.temperature_2m ?? fallbackWeather.temperature),
        min: Math.round(min),
        max: Math.round(max),
        humidity: Math.round(current.relative_humidity_2m ?? fallbackWeather.humidity),
      });
    }

    loadWeather().catch(() => {
      if (!controller.signal.aborted) setWeather({ ...fallbackWeather, state: "阴" });
    });

    return () => controller.abort();
  }, []);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = String(data.get("q") || "").trim();
    if (query) {
      window.location.href = `${searchUrls[engine]}${encodeURIComponent(query)}`;
    }
  }

  return (
    <main className="new-tab-shell">
      <section className="hero-grid" aria-label="今日信息">
        <article className="paper-card date-card">
          <div className="tape">今天是</div>
          <p className="date-text">2026年6月23日</p>
          <h1>星期二</h1>
          <span className="lunar-chip">农历 五月初九</span>
        </article>

        <article className="clock-plaque" aria-label={`当前时间 ${clock.main}:${clock.seconds}`}>
          <div className="clock-inner">
            <ClockIcon />
            <div className="clock-time">
              <span>{clock.main}</span>
              <small>{clock.seconds}</small>
            </div>
            <LeafMark />
          </div>
        </article>

        <article className="paper-card weather-card">
          <div className="tape">{weather.label}</div>
          <div className="weather-main">
            <WeatherIcon code={weather.code} />
            <div>
              <p className="weather-state">{weather.state}</p>
              <strong>{weather.temperature}°C</strong>
            </div>
          </div>
          <p className="temperature-range">
            {weather.min}°C ~ {weather.max}°C
          </p>
          <span className="humidity-chip">
            湿度 {weather.humidity}% {humidityText(weather.humidity)}
          </span>
        </article>
      </section>

      <form className="search-panel" onSubmit={search}>
        <div className="search-engine">
          <Select
            aria-label="搜索引擎"
            options={searchOptions}
            value={engine}
            onChange={(key) => setEngine(key as keyof typeof searchUrls)}
          />
        </div>
        <label className="sr-only" htmlFor="search-query">
          搜索内容
        </label>
        <Input className="search-input" id="search-query" name="q" placeholder="准备去哪座岛屿?..." />
        <Button className="search-button" type="primary" htmlType="submit" aria-label="搜索">
          <SearchIcon />
        </Button>
      </form>

      <section className="shortcut-section" aria-label="常用网站">
        <Button
          className="shortcut-nav shortcut-nav-left"
          type="primary"
          htmlType="button"
          aria-label="上一页快捷入口"
          onClick={() => setShortcutPage((page) => (page + shortcutPages.length - 1) % shortcutPages.length)}
        >
          <ChevronIcon direction="left" />
        </Button>
        <div className="shortcut-row">
          {visibleShortcuts.map((shortcut) => (
            <a className="shortcut" href={shortcut.href} key={shortcut.name} aria-label={shortcut.name}>
              <span className={`shortcut-tile ${shortcut.color}`}>{shortcut.mark}</span>
              <span className="shortcut-label">{shortcut.name}</span>
            </a>
          ))}
        </div>
        <Button
          className="shortcut-nav shortcut-nav-right"
          type="primary"
          htmlType="button"
          aria-label="下一页快捷入口"
          onClick={() => setShortcutPage((page) => (page + 1) % shortcutPages.length)}
        >
          <ChevronIcon direction="right" />
        </Button>
        <div className="pager" aria-hidden="true">
          {shortcutPages.map((_, index) => (
            <span className={index === shortcutPage ? "active" : undefined} key={index} />
          ))}
        </div>
      </section>

      <Button className="settings-button" type="primary" aria-label="设置">
        <SettingsIcon />
      </Button>
    </main>
  );
}

function getLocation() {
  const fallback = { latitude: 39.9042, longitude: 116.4074, label: "北京天气" };
  if (!navigator.geolocation) return Promise.resolve(fallback);

  return new Promise<typeof fallback>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: "当前位置天气",
        }),
      () => resolve(fallback),
      { enableHighAccuracy: false, timeout: 3500, maximumAge: 30 * 60 * 1000 },
    );
  });
}

export default App;
