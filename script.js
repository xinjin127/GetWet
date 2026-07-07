const sourceConfig = {
  tides: {
    name: "NOAA CO-OPS San Francisco tide predictions",
    url: "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter",
    station: "9414290",
    link: "https://tidesandcurrents.noaa.gov/stationhome.html?id=9414290"
  },
  nws: {
    name: "NOAA/NWS hourly forecast and active alerts",
    pointsUrl: "https://api.weather.gov/points",
    alertsUrl: "https://api.weather.gov/alerts/active",
    link: "https://www.weather.gov/mtr/"
  },
  marine: {
    name: "Open-Meteo marine wave forecast",
    url: "https://marine-api.open-meteo.com/v1/marine",
    link: "https://open-meteo.com/en/docs/marine-weather-api"
  },
  cdfwCrab: {
    name: "CDFW Dungeness crab season and closure checks",
    healthUrl: "https://wildlife.ca.gov/Fishing/Ocean/Health-Advisories",
    whaleSafeUrl: "https://wildlife.ca.gov/Conservation/Marine/Whale-Safe-Fisheries",
    seasonPdfUrl: "https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=195690&inline=",
    rampZone: "4",
    countyGroup: "all other counties"
  },
  regulations: {
    name: "CDFW regulations and California fishing checks",
    links: [
      { label: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean/Regulations/Fishing-Map" },
      { label: "CDFW crab regulations", url: "https://wildlife.ca.gov/Fishing/Ocean/Regulations/Sport-Fishing/Invertebrate-Fishing-Regs#crab" },
      { label: "CDFW Whale Safe Fisheries", url: "https://wildlife.ca.gov/Conservation/Marine/Whale-Safe-Fisheries" },
      { label: "CDFW crab health advisories", url: "https://wildlife.ca.gov/Fishing/Ocean/Health-Advisories" }
    ]
  }
};

const missionConfig = {
  crabbing: {
    spot: "China Beach",
    activity: "Paddleboard / kayak crabbing",
    coords: { latitude: 37.7889, longitude: -122.4898 },
    cdfwCountyGroup: "all other counties",
    cdfwRampZone: "4",
    question: "Can I crab from a paddleboard or kayak at China Beach this upcoming Saturday or Sunday?",
    thresholds: {
      go: { maxWaveFeet: 2, maxSwellPeriodSeconds: 10, maxWindMph: 8 },
      maybe: { maxWaveFeet: 3, maxSwellPeriodSeconds: 12, maxWindMph: 11 }
    }
  },
  spearfishing: {
    activity: "Beach-entry spearfishing",
    question: "What is the best beach-entry spearfishing option this upcoming Saturday/Sunday?",
    candidates: [
      {
        id: "carmel_bay_stillwater_legal_zones",
        spot: "Carmel Bay Legal Zones / Stillwater Cove Area",
        region: "Monterey/Carmel",
        rank: 1,
        driveHours: 2.5,
        coords: { latitude: 36.5626, longitude: -121.9447 },
        exposure: "protected pockets",
        accessType: "shore",
        legalStatus: "Known legal water assumed",
        mpaWarning: "Use the known legal Carmel/Stillwater water for this spot; this card evaluates weekend conditions and access.",
        suitability: "Intermediate",
        strengths: ["Reef and kelp habitat", "Better average visibility", "Protected pockets"],
        risks: ["Surge risk", "Cold water", "Rocky structure", "Low visibility"],
        species: ["Rockfish", "Lingcod", "Cabezon", "Greenling", "California halibut", "Surfperch"],
        sourceUrls: [
          { title: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean" }
        ]
      },
      {
        id: "monterey_breakwater_legal_side",
        spot: "Monterey Breakwater / Legal Side Only",
        region: "Monterey/Carmel",
        rank: 2,
        driveHours: 2.0,
        coords: { latitude: 36.6075, longitude: -121.8919 },
        exposure: "harbor shelter",
        accessType: "shore",
        legalStatus: "Known legal water assumed",
        mpaWarning: "Use the known legal side of the Breakwater; this card evaluates weekend conditions, access, and traffic.",
        suitability: "Beginner/intermediate in calm, legal water",
        strengths: ["Convenient shore access", "Protected access", "Common training water"],
        risks: ["Boat traffic", "Low visibility", "Harbor edge", "Surge risk"],
        species: ["Rockfish", "Lingcod", "Cabezon", "Greenling", "Perch", "Halibut"],
        sourceUrls: [
          { title: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean" }
        ]
      },
      {
        id: "stillwater_cove_sonoma",
        spot: "Stillwater Cove, Sonoma Coast",
        region: "Sonoma Coast",
        rank: 3,
        driveHours: 2.5,
        coords: { latitude: 38.5488, longitude: -123.2972 },
        exposure: "protected cove",
        accessType: "shore",
        legalStatus: "Known legal water assumed",
        mpaWarning: "Legal water is assumed for this Sonoma Coast spot; this card evaluates weekend conditions and access.",
        suitability: "Intermediate",
        strengths: ["Public park access", "Known diving area", "Protected North Coast cove"],
        risks: ["Cold water", "Surge risk", "Low visibility", "Shark risk"],
        species: ["Rockfish", "Lingcod", "Cabezon", "Greenling", "Surfperch"],
        sourceUrls: [
          { title: "Sonoma County Regional Parks", url: "https://parks.sonomacounty.ca.gov/visit/find-a-park/stillwater-cove-regional-park" },
          { title: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean" }
        ]
      },
      {
        id: "fort_ross_cove",
        spot: "Fort Ross Cove",
        region: "Sonoma Coast",
        rank: 4,
        driveHours: 2.75,
        coords: { latitude: 38.5137, longitude: -123.2441 },
        exposure: "cove",
        accessType: "shore",
        legalStatus: "Known legal water assumed",
        mpaWarning: "Legal water is assumed for Fort Ross Cove; this card evaluates weekend conditions and access.",
        suitability: "Intermediate/advanced",
        strengths: ["State park access", "Classic dive area", "Rocky reef habitat"],
        risks: ["Cold water", "Surge risk", "Advanced entry", "Shark risk"],
        species: ["Rockfish", "Lingcod", "Cabezon", "Greenling", "Surfperch"],
        sourceUrls: [
          { title: "California State Parks Fort Ross", url: "https://www.parks.ca.gov/?page_id=449" },
          { title: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean" }
        ]
      },
      {
        id: "ocean_cove_sonoma",
        spot: "Ocean Cove, Sonoma Coast",
        region: "Sonoma Coast",
        rank: 5,
        driveHours: 3.0,
        coords: { latitude: 38.5581, longitude: -123.3066 },
        exposure: "protected cove",
        accessType: "kayak_optional",
        legalStatus: "Known legal water assumed",
        mpaWarning: "Legal water is assumed for Ocean Cove; this card evaluates weekend conditions and access.",
        suitability: "Intermediate",
        strengths: ["Protected cove geography", "Campground/day-use access", "Nearby reef structure"],
        risks: ["Cold water", "Surge risk", "Low visibility", "Shark risk"],
        species: ["Rockfish", "Lingcod", "Cabezon", "Greenling", "Surfperch"],
        sourceUrls: [
          { title: "Ocean Cove access", url: "https://www.oceancove.org/" },
          { title: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean" }
        ]
      },
      {
        id: "van_damme_mendocino",
        spot: "Van Damme State Park / Van Damme SMCA",
        region: "Mendocino Coast",
        rank: 6,
        driveHours: 3.75,
        coords: { latitude: 39.2744, longitude: -123.7912 },
        exposure: "protected cove",
        accessType: "shore",
        legalStatus: "Known legal water assumed",
        mpaWarning: "Legal Van Damme water is assumed; this card evaluates weekend conditions and access.",
        suitability: "Intermediate",
        strengths: ["Protected cove", "Popular diver/kayak area", "Strong reef habitat nearby"],
        risks: ["Cold water", "Surge risk", "Shark risk", "Cove can change quickly"],
        species: ["Rockfish", "Lingcod", "Cabezon", "Greenling", "Surfperch"],
        sourceUrls: [
          { title: "California State Parks Van Damme", url: "https://www.parks.ca.gov/?page_id=433" },
          { title: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean" }
        ]
      }
    ]
  }
};

const appState = {
  activeMode: "crabbing",
  showMoreSpearfishing: false,
  status: "loading",
  error: "",
  data: null,
  cache: {
    status: "loading",
    detail: "Checking server cache",
    requests: 0,
    hits: 0,
    misses: 0
  }
};

const weekend = getUpcomingWeekend();
const weekendRange = formatWeekendRange(weekend);
const CACHE_VERSION = "launch-window-v4";
const CACHE_TTL_MS = 3 * 60 * 60 * 1000;

function getUpcomingWeekend(baseDate = new Date()) {
  const date = new Date(baseDate);
  const day = date.getDay();
  let daysUntilSaturday;

  if (day === 0) {
    daysUntilSaturday = 6;
  } else if (day === 6) {
    daysUntilSaturday = 0;
  } else {
    daysUntilSaturday = 6 - day;
  }

  const saturday = new Date(date);
  saturday.setDate(date.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);

  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);

  return { saturday, sunday };
}

function formatWeekendRange({ saturday, sunday }) {
  const sameMonth = saturday.getMonth() === sunday.getMonth();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const satText = `${weekdays[saturday.getDay()]} ${months[saturday.getMonth()]} ${saturday.getDate()}`;
  const sunText = sameMonth
    ? `${weekdays[sunday.getDay()]} ${sunday.getDate()}`
    : `${weekdays[sunday.getDay()]} ${months[sunday.getMonth()]} ${sunday.getDate()}`;
  return `${satText} - ${sunText}`;
}

function toApiDate(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

async function fetchJson(url) {
  const text = await fetchViaCache(url, "application/geo+json, application/json");
  return JSON.parse(text);
}

async function fetchText(url) {
  return fetchViaCache(url, "text/html, text/plain, application/pdf");
}

async function fetchViaCache(url, accept) {
  const shouldUseServerCache = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const requestUrl = shouldUseServerCache ? `/api/fetch?url=${encodeURIComponent(url)}` : url;
  const response = await fetch(requestUrl, {
    headers: { "Accept": accept }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const cacheHeader = response.headers.get("x-launch-cache");
  if (cacheHeader) {
    recordServerCacheHeader(cacheHeader);
  }

  return response.text();
}

function resetServerCacheStats() {
  appState.cache = {
    status: "loading",
    detail: "Checking server cache",
    requests: 0,
    hits: 0,
    misses: 0
  };
}

function recordServerCacheHeader(cacheHeader) {
  appState.cache.requests += 1;
  if (cacheHeader === "HIT") appState.cache.hits += 1;
  if (cacheHeader === "MISS") appState.cache.misses += 1;
}

function summarizeServerCacheStats() {
  const { requests, hits, misses } = appState.cache;
  if (!requests) {
    appState.cache.status = "direct";
    appState.cache.detail = "Direct browser fetches; start with server.js for server-side caching";
    return;
  }
  appState.cache.status = hits ? "cached" : "fresh";
  appState.cache.detail = hits
    ? `Server cache reused ${hits}/${requests} checks; refreshed ${misses}`
    : `Server cache refreshed ${misses}/${requests} checks`;
}

async function loadLiveData() {
  const crabbing = missionConfig.crabbing;
  const spearfishing = missionConfig.spearfishing;

  const [tides, crabbingWeather, crabbingMarine, crabbingAlerts, cdfwCrabStatus, candidateResults] = await Promise.all([
    fetchTides(),
    fetchNwsWeather(crabbing.coords),
    fetchMarineForecast(crabbing.coords),
    fetchAlerts(crabbing.coords),
    fetchCdfwCrabStatus(crabbing),
    Promise.all(spearfishing.candidates.map(async (candidate) => ({
      ...candidate,
      weather: await fetchNwsWeather(candidate.coords),
      marine: await fetchMarineForecast(candidate.coords),
      alerts: await fetchAlerts(candidate.coords)
    })))
  ]);

  const crabbingDecision = evaluateCrabbing({
    config: crabbing,
    weather: crabbingWeather,
    marine: crabbingMarine,
    tides,
    alerts: crabbingAlerts,
    cdfwCrabStatus
  });

  const spearfishingDecisions = candidateResults
    .map((candidate) => evaluateSpearfishingCandidate(candidate))
    .sort((a, b) => b.score - a.score);

  return {
    generatedAt: new Date(),
    crabbing: crabbingDecision,
    spearfishing: {
      question: spearfishing.question,
      topOption: spearfishingDecisions[0],
      moreOptions: spearfishingDecisions.slice(1)
    }
  };
}

async function loadCachedOrFreshData({ forceRefresh = false } = {}) {
  const cacheKey = getCacheKey();
  if (!forceRefresh) {
    const cached = readCachedData(cacheKey);
    if (cached) {
      return {
        data: reviveCachedData(cached.data),
        cache: {
          status: "browser-cached",
          detail: `Browser cache reused weekend checks from ${formatCacheTime(cached.savedAt)}`
        }
      };
    }
  }

  const data = await loadLiveData();
  writeCachedData(cacheKey, data);
  summarizeServerCacheStats();
  const serverDetail = appState.cache.requests ? `; ${appState.cache.detail.toLowerCase()}` : "";
  return {
    data,
    cache: {
      status: "fresh",
      detail: `Browser cache refreshed at ${formatCacheTime(new Date().toISOString())}${serverDetail}`
    }
  };
}

function getCacheKey() {
  return `${CACHE_VERSION}:${toIsoDate(weekend.saturday)}:${toIsoDate(weekend.sunday)}`;
}

function readCachedData(cacheKey) {
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached?.savedAt || !cached?.data) return null;
    const age = Date.now() - new Date(cached.savedAt).getTime();
    if (!Number.isFinite(age) || age > CACHE_TTL_MS) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    return cached;
  } catch {
    return null;
  }
}

function writeCachedData(cacheKey, data) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      savedAt: new Date().toISOString(),
      data
    }));
  } catch {
    appState.cache = {
      status: "fresh",
      detail: "Fresh checks loaded; browser cache storage is unavailable"
    };
  }
}

function reviveCachedData(data) {
  return data;
}

function formatCacheTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown time";
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

async function fetchTides() {
  const params = new URLSearchParams({
    begin_date: toApiDate(weekend.saturday),
    end_date: toApiDate(weekend.sunday),
    station: sourceConfig.tides.station,
    product: "predictions",
    datum: "MLLW",
    time_zone: "lst_ldt",
    interval: "hilo",
    units: "english",
    application: "LaunchWindow",
    format: "json"
  });
  const data = await fetchJson(`${sourceConfig.tides.url}?${params}`);
  return data.predictions || [];
}

async function fetchNwsWeather(coords) {
  const point = await fetchJson(`${sourceConfig.nws.pointsUrl}/${coords.latitude},${coords.longitude}`);
  const hourlyUrl = point.properties.forecastHourly;
  const hourly = await fetchJson(hourlyUrl);
  return {
    sourceUrl: hourlyUrl,
    periods: filterWeekendHours(hourly.properties.periods || [])
  };
}

async function fetchAlerts(coords) {
  const params = new URLSearchParams({
    point: `${coords.latitude},${coords.longitude}`
  });
  const data = await fetchJson(`${sourceConfig.nws.alertsUrl}?${params}`);
  return (data.features || []).map((feature) => feature.properties);
}

async function fetchMarineForecast(coords) {
  const params = new URLSearchParams({
    latitude: coords.latitude,
    longitude: coords.longitude,
    hourly: [
      "wave_height",
      "wave_period",
      "wave_direction",
      "swell_wave_height",
      "swell_wave_period",
      "swell_wave_direction",
      "wind_wave_height"
    ].join(","),
    wind_speed_unit: "mph",
    length_unit: "imperial",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles",
    start_date: toIsoDate(weekend.saturday),
    end_date: toIsoDate(weekend.sunday)
  });
  const data = await fetchJson(`${sourceConfig.marine.url}?${params}`);
  return normalizeMarineHours(data.hourly || {});
}

async function fetchCdfwCrabStatus(config) {
  const statutorySeason = getCdfwDungenessSeasonWindow(weekend.saturday, config.cdfwCountyGroup);
  const inStatutorySeason = isWeekendInsideRange(weekend, statutorySeason.start, statutorySeason.end);
  const [healthResult, whaleSafeResult] = await Promise.allSettled([
    fetchText(sourceConfig.cdfwCrab.healthUrl),
    fetchText(sourceConfig.cdfwCrab.whaleSafeUrl)
  ]);

  const health = healthResult.status === "fulfilled"
    ? parseCdfwHealthStatus(healthResult.value)
    : {
      status: "Unverified",
      detail: "CDFW health-advisory page could not be read automatically from this browser.",
      sourceAvailable: false
    };

  const whaleSafe = whaleSafeResult.status === "fulfilled"
    ? parseCdfwWhaleSafeStatus(whaleSafeResult.value, config.cdfwRampZone)
    : {
      status: "Unverified",
      detail: "CDFW Whale Safe Fisheries page could not be read automatically from this browser.",
      sourceAvailable: false
    };

  return {
    location: "China Beach, San Francisco County",
    rampZone: config.cdfwRampZone,
    countyGroup: config.cdfwCountyGroup,
    statutorySeason,
    inStatutorySeason,
    status: getCdfwCombinedStatus({ inStatutorySeason, health, whaleSafe }),
    health,
    whaleSafe
  };
}

function getCdfwDungenessSeasonWindow(baseDate, countyGroup) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const seasonStartYear = month >= 10 ? year : year - 1;
  const start = new Date(seasonStartYear, 10, 1);
  const endMonth = countyGroup === "mendocino and north" ? 6 : 5;
  const endDay = countyGroup === "mendocino and north" ? 30 : 30;
  const end = new Date(seasonStartYear + 1, endMonth, endDay, 23, 59, 59);

  return {
    start,
    end,
    label: countyGroup === "mendocino and north"
      ? "Nov 1 - Jul 30 for Mendocino County and north"
      : "Nov 1 - Jun 30 for San Francisco and other counties"
  };
}

function isWeekendInsideRange({ saturday, sunday }, start, end) {
  return saturday <= end && sunday >= start;
}

function parseCdfwHealthStatus(html) {
  const text = normalizeText(html);
  const dungenessSection = extractBetween(text, "Recreational Fisheries for Dungeness Crab and Rock Crab", "Rock crab") || text;
  const noClosures = /no closures in the recreational Dungeness crab fishery/i.test(dungenessSection);
  const closureMention = /(closure|closed|delay|prohibited)/i.test(dungenessSection);

  if (noClosures) {
    return {
      status: "No toxin closure found",
      detail: "CDFW Health Advisories page says there are currently no recreational Dungeness crab closures due to naturally occurring marine toxins.",
      sourceAvailable: true
    };
  }

  return {
    status: closureMention ? "Possible closure language found" : "No matching Dungeness status found",
    detail: closureMention
      ? "CDFW health page contains closure or delay language; review the official page before launching."
      : "CDFW health page was reachable, but the Dungeness recreational status could not be parsed confidently.",
    sourceAvailable: true
  };
}

function parseCdfwWhaleSafeStatus(html, rampZone) {
  const text = normalizeText(html);
  const recreationalSection = extractBetween(text, "Recreational Fishery:", "Risk Assessment and Mitigation Program") || text;
  const zonePattern = new RegExp(`Zones?[^.\\n]*${rampZone}[^.\\n]*(Crab Trap Prohibition|Season Closed|Open to all permitted methods|Fleet Advisory)`, "i");
  const broadTrapPattern = /Fishing Zones? 3-5:\s*Crab Trap Prohibition/i;
  const allPermittedPattern = /Fishing Zones?[^.]*4[^.]*Open to all permitted methods/i;
  const matched = recreationalSection.match(zonePattern);

  if (broadTrapPattern.test(recreationalSection) || /Crab Trap Prohibition/i.test(matched?.[0] || "")) {
    return {
      status: "Crab trap prohibition",
      detail: `CDFW Whale Safe Fisheries lists a recreational crab trap prohibition affecting Fishing Zone ${rampZone}.`,
      sourceAvailable: true
    };
  }

  if (allPermittedPattern.test(recreationalSection) || /Open to all permitted methods/i.test(matched?.[0] || "")) {
    return {
      status: "Open to all permitted methods",
      detail: `CDFW Whale Safe Fisheries indicates Fishing Zone ${rampZone} is open to all permitted recreational crab methods.`,
      sourceAvailable: true
    };
  }

  return {
    status: "Unparsed",
    detail: `CDFW Whale Safe Fisheries was reachable, but Zone ${rampZone} trap status could not be parsed confidently.`,
    sourceAvailable: true
  };
}

function getCdfwCombinedStatus({ inStatutorySeason, health, whaleSafe }) {
  if (!inStatutorySeason) return "Closed by season date";
  if (health.status === "Possible closure language found") return "Possible health closure";
  if (whaleSafe.status === "Crab trap prohibition") return "Trap prohibition";
  if (!health.sourceAvailable
    || !whaleSafe.sourceAvailable
    || health.status === "No matching Dungeness status found"
    || whaleSafe.status === "Unparsed") return "Automatic CDFW check incomplete";
  return "Season appears open, subject to method and day-of checks";
}

function normalizeText(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractBetween(text, startNeedle, endNeedle) {
  const start = text.indexOf(startNeedle);
  if (start === -1) return "";
  const end = text.indexOf(endNeedle, start + startNeedle.length);
  return end === -1 ? text.slice(start) : text.slice(start, end);
}

function normalizeMarineHours(hourly) {
  return (hourly.time || []).map((time, index) => ({
    startTime: time,
    waveHeight: Number(hourly.wave_height?.[index]),
    wavePeriod: Number(hourly.wave_period?.[index]),
    waveDirection: Number(hourly.wave_direction?.[index]),
    swellHeight: Number(hourly.swell_wave_height?.[index]),
    swellPeriod: Number(hourly.swell_wave_period?.[index]),
    swellDirection: Number(hourly.swell_wave_direction?.[index]),
    windWaveHeight: Number(hourly.wind_wave_height?.[index])
  }));
}

function filterWeekendHours(periods) {
  return periods.filter((period) => {
    const start = new Date(period.startTime);
    return isWeekendDate(start);
  });
}

function isWeekendDate(date) {
  return date.toDateString() === weekend.saturday.toDateString()
    || date.toDateString() === weekend.sunday.toDateString();
}

function morningHours(hours) {
  return hours.filter((hour) => {
    const date = new Date(hour.startTime);
    const localHour = date.getHours();
    return isWeekendDate(date) && localHour >= 6 && localHour <= 11;
  });
}

function parseWindMph(value) {
  const numbers = String(value || "").match(/\d+/g);
  if (!numbers) return null;
  return Math.max(...numbers.map(Number));
}

function maxNumber(values) {
  const finite = values.filter(Number.isFinite);
  return finite.length ? Math.max(...finite) : null;
}

function minNumber(values) {
  const finite = values.filter(Number.isFinite);
  return finite.length ? Math.min(...finite) : null;
}

function averageNumber(values) {
  const finite = values.filter(Number.isFinite);
  return finite.length ? finite.reduce((sum, value) => sum + value, 0) / finite.length : null;
}

function formatNumber(value, suffix = "") {
  return Number.isFinite(value) ? `${value.toFixed(value >= 10 ? 0 : 1)}${suffix}` : "Unavailable";
}

function formatTimeLabel(dateValue) {
  const date = new Date(dateValue);
  return date.toLocaleTimeString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" });
}

function evaluateCrabbing({ config, weather, marine, tides, alerts, cdfwCrabStatus }) {
  const weatherMorning = morningHours(weather.periods);
  const marineMorning = morningHours(marine);
  const allWeather = weather.periods;
  const allMarine = marine;

  const maxMorningWind = maxNumber(weatherMorning.map((period) => parseWindMph(period.windSpeed)));
  const maxMorningWave = maxNumber(marineMorning.map((hour) => hour.waveHeight));
  const maxMorningSwellPeriod = maxNumber(marineMorning.map((hour) => hour.swellPeriod || hour.wavePeriod));
  const maxWeekendWave = maxNumber(allMarine.map((hour) => hour.waveHeight));
  const maxWeekendWind = maxNumber(allWeather.map((period) => parseWindMph(period.windSpeed)));
  const hasAdvisory = alerts.length > 0;

  let verdict = "NO GO THIS WEEKEND";
  let bestWindow = "No safe Sat/Sun window found";
  let returnBy = null;

  const go = config.thresholds.go;
  const maybe = config.thresholds.maybe;
  const morningPassesMaybe = maxMorningWave !== null
    && maxMorningWind !== null
    && maxMorningSwellPeriod !== null
    && maxMorningWave <= maybe.maxWaveFeet
    && maxMorningWind <= maybe.maxWindMph
    && maxMorningSwellPeriod <= maybe.maxSwellPeriodSeconds
    && !hasAdvisory
    && cdfwAllowsCrabbing(cdfwCrabStatus);
  const morningPassesGo = morningPassesMaybe
    && maxMorningWave <= go.maxWaveFeet
    && maxMorningWind <= go.maxWindMph
    && maxMorningSwellPeriod <= go.maxSwellPeriodSeconds;

  if (morningPassesGo) {
    verdict = "GO EARLY SATURDAY";
    bestWindow = "Sat/Sun morning window looks within conservative thresholds";
    returnBy = "Before late-morning wind builds";
  } else if (morningPassesMaybe) {
    verdict = "MAYBE SATURDAY";
    bestWindow = "Early morning only, pending same-day recheck";
    returnBy = "Before late-morning wind builds";
  }

  if (!cdfwAllowsCrabbing(cdfwCrabStatus)) {
    verdict = "NO GO THIS WEEKEND";
    bestWindow = "No Sat/Sun crab window selected";
    returnBy = null;
  }

  const headlineReason = getCrabbingHeadlineReason({
    cdfwCrabStatus,
    alerts,
    maxMorningWave,
    maxMorningSwellPeriod,
    maxMorningWind
  });

  return {
    spot: config.spot,
    activity: config.activity,
    question: config.question,
    verdict,
    headlineVerdict: verdict.includes("NO GO") ? `NO GO: ${headlineReason}` : verdict,
    headlineReason,
    bestWindow,
    returnBy,
    sourceSummary: {
      tideEvents: tides,
      waveSeries: buildWaveSeries(allMarine),
      windSeries: buildWindSeries(allWeather),
      maxMorningWind,
      maxMorningWave,
      maxMorningSwellPeriod,
      maxWeekendWave,
      maxWeekendWind,
      alerts,
      cdfwCrabStatus
    },
    risks: {
      entryExit: maxMorningWave !== null && maxMorningWave <= 2 ? "Lower but exposed" : "High caution",
      windDrift: maxMorningWind !== null && maxMorningWind <= 8 ? "Lower morning drift" : "Return risk",
      current: "High caution",
      currentDetail: "China Beach sits inside the Golden Gate influence zone; paddle return current remains a standing caution for this launch.",
      confidence: hasAdvisory ? `NWS alert: ${summarizeAlerts(alerts)}` : "Live data loaded"
    },
    reasons: buildCrabbingReasons({
      maxMorningWind,
      maxMorningWave,
      maxMorningSwellPeriod,
      maxWeekendWave,
      alerts,
      cdfwCrabStatus
    }),
    legalReminder: `CDFW check: ${cdfwCrabStatus.status}. Verify license, method, size, bag limit, gear marking, and same-day emergency updates before each trip.`
  };
}

function cdfwAllowsCrabbing(cdfwCrabStatus) {
  return cdfwCrabStatus.inStatutorySeason
    && cdfwCrabStatus.status !== "Possible health closure"
    && cdfwCrabStatus.status !== "Automatic CDFW check incomplete";
}

function getCrabbingHeadlineReason({ cdfwCrabStatus, alerts, maxMorningWave, maxMorningSwellPeriod, maxMorningWind }) {
  if (!cdfwCrabStatus.inStatutorySeason) return "CDFW SEASON CLOSED";
  if (cdfwCrabStatus.status === "Possible health closure") return "POSSIBLE CDFW HEALTH CLOSURE";
  if (cdfwCrabStatus.status === "Automatic CDFW check incomplete") return "CDFW STATUS UNVERIFIED";
  if (cdfwCrabStatus.status === "Trap prohibition") return "CRAB TRAP PROHIBITION";
  if (alerts.length) return "ACTIVE MARINE ALERT";
  if (maxMorningWave !== null && maxMorningWave > 3) return "WAVES ABOVE THRESHOLD";
  if (maxMorningSwellPeriod !== null && maxMorningSwellPeriod > 12) return "LONG-PERIOD SWELL";
  if (maxMorningWind !== null && maxMorningWind > 11) return "RETURN WIND RISK";
  return "CONSERVATIVE THRESHOLDS NOT MET";
}

function summarizeAlerts(alerts) {
  if (!alerts.length) return "No active NWS alerts";
  const names = alerts
    .map((alert) => alert.event || alert.headline || alert.areaDesc)
    .filter(Boolean);
  if (!names.length) return `${alerts.length} active NWS alert(s)`;
  const unique = [...new Set(names)];
  return unique.length === 1 ? unique[0] : `${unique[0]} + ${unique.length - 1} more`;
}

function buildCrabbingReasons({ maxMorningWind, maxMorningWave, maxMorningSwellPeriod, maxWeekendWave, alerts, cdfwCrabStatus }) {
  const reasons = [];
  reasons.push({
    type: cdfwCrabStatus.inStatutorySeason ? "good" : "bad",
    text: `CDFW season-date check for San Francisco area: ${cdfwCrabStatus.statutorySeason.label}.`
  });
  reasons.push({
    type: cdfwCrabStatus.status === "Season appears open, subject to method and day-of checks" ? "good" : "warn",
    text: `CDFW automatic status: ${cdfwCrabStatus.status}. ${cdfwCrabStatus.health.detail}`
  });
  reasons.push({
    type: cdfwCrabStatus.whaleSafe.status === "Open to all permitted methods" ? "good" : "warn",
    text: `Whale Safe Fisheries Zone ${cdfwCrabStatus.rampZone}: ${cdfwCrabStatus.whaleSafe.detail}`
  });
  if (alerts.length) {
    reasons.push({ type: "bad", text: `NWS alert screen returned ${summarizeAlerts(alerts)} for the area.` });
  }
  reasons.push({
    type: maxMorningWave !== null && maxMorningWave <= 2 ? "good" : "bad",
    text: `Open-Meteo marine forecast has Sat/Sun morning wave height at ${formatNumber(maxMorningWave, " ft")}.`
  });
  reasons.push({
    type: maxMorningSwellPeriod !== null && maxMorningSwellPeriod <= 12 ? "warn" : "bad",
    text: `Swell period reaches ${formatNumber(maxMorningSwellPeriod, " sec")}; long-period sets matter at an exposed beach launch.`
  });
  reasons.push({
    type: maxMorningWind !== null && maxMorningWind <= 11 ? "warn" : "bad",
    text: `NWS hourly forecast puts Sat/Sun morning wind up to ${formatNumber(maxMorningWind, " mph")}; return drift matters near the Gate.`
  });
  reasons.push({
    type: "warn",
    text: `Weekend peak wave height is ${formatNumber(maxWeekendWave, " ft")}; recheck Friday evening and before departure.`
  });
  return reasons;
}

function evaluateSpearfishingCandidate(candidate) {
  const marineMorning = morningHours(candidate.marine);
  const weatherMorning = morningHours(candidate.weather.periods);
  const avgMorningWave = averageNumber(marineMorning.map((hour) => hour.waveHeight));
  const maxMorningSwellPeriod = maxNumber(marineMorning.map((hour) => hour.swellPeriod || hour.wavePeriod));
  const maxMorningWind = maxNumber(weatherMorning.map((period) => parseWindMph(period.windSpeed)));
  const hasAdvisory = candidate.alerts.length > 0;
  const exposurePenalty = getExposurePenalty(candidate.exposure);
  const researchRankBonus = Math.max(0, 7 - candidate.rank) * 1.5;
  const physicalScore = 100
    - (avgMorningWave ?? 8) * 12
    - (maxMorningSwellPeriod ?? 18) * 2.5
    - (maxMorningWind ?? 18) * 1.8
    - exposurePenalty * 7
    - (hasAdvisory ? 30 : 0)
    + researchRankBonus;

  let verdict = "NO GO THIS WEEKEND";
  if (!hasAdvisory && physicalScore >= 35) verdict = "MAYBE SATURDAY";
  if (!hasAdvisory && physicalScore >= 48 && candidate.legalStatus === "Known legal water assumed") verdict = "GO SATURDAY";
  const headlineReason = getSpearfishingHeadlineReason({
    hasAdvisory,
    avgMorningWave,
    maxMorningSwellPeriod,
    maxMorningWind,
    exposure: candidate.exposure
  });

  return {
    spot: candidate.spot,
    activity: missionConfig.spearfishing.activity,
    id: candidate.id,
    region: candidate.region,
    rank: candidate.rank,
    driveHours: candidate.driveHours,
    accessType: candidate.accessType,
    mpaWarning: candidate.mpaWarning,
    suitability: candidate.suitability,
    strengths: candidate.strengths,
    risksList: candidate.risks,
    species: candidate.species,
    sourceUrls: candidate.sourceUrls,
    verdict,
    headlineVerdict: verdict.includes("NO GO") ? `NO GO: ${headlineReason}` : verdict,
    headlineReason,
    bestWindow: "Saturday/Sunday morning, recheck day-of",
    returnBy: "Before late-morning wind and surge build",
    score: physicalScore,
    risks: {
      surge: describeSurge(avgMorningWave, maxMorningSwellPeriod, candidate.exposure),
      visibility: inferVisibility(avgMorningWave, maxMorningSwellPeriod),
      legal: candidate.legalStatus,
      confidence: hasAdvisory ? "Low: active marine alert" : "Medium condition confidence"
    },
    reasons: buildSpearfishingReasons({
      avgMorningWave,
      maxMorningSwellPeriod,
      maxMorningWind,
      hasAdvisory,
      exposure: candidate.exposure
    }),
    tags: [
      candidate.region,
      `${candidate.driveHours}h from SF`,
      describeSurge(avgMorningWave, maxMorningSwellPeriod, candidate.exposure),
      candidate.legalStatus
    ],
    sourceSummary: {
      waveSeries: buildWaveSeries(candidate.marine),
      windSeries: buildWindSeries(candidate.weather.periods),
      avgMorningWave,
      maxMorningSwellPeriod,
      maxMorningWind,
      alerts: candidate.alerts
    }
  };
}

function buildWaveSeries(hours) {
  return (hours || [])
    .filter((hour) => isWeekendDate(new Date(hour.startTime)))
    .filter((_, index) => index % 3 === 0)
    .map((hour) => ({
      time: hour.startTime,
      waveHeight: hour.waveHeight,
      swellPeriod: hour.swellPeriod || hour.wavePeriod,
      swellHeight: hour.swellHeight
    }));
}

function buildWindSeries(periods) {
  return (periods || [])
    .filter((period) => isWeekendDate(new Date(period.startTime)))
    .filter((_, index) => index % 3 === 0)
    .map((period) => ({
      time: period.startTime,
      windMph: parseWindMph(period.windSpeed),
      direction: period.windDirection
    }));
}

function getExposurePenalty(exposure) {
  if (exposure === "harbor shelter") return 0.5;
  if (exposure === "protected cove") return 0.75;
  if (exposure === "protected pockets") return 1.25;
  if (exposure === "cove") return 1.5;
  if (exposure === "partial shelter") return 2.5;
  if (exposure === "open coast") return 4;
  return 3;
}

function getSpearfishingHeadlineReason({ hasAdvisory, avgMorningWave, maxMorningSwellPeriod, maxMorningWind, exposure }) {
  if (hasAdvisory) return "ACTIVE MARINE ALERT";
  if (avgMorningWave !== null && avgMorningWave > 3) return "HIGH ENTRY SURGE";
  if (maxMorningSwellPeriod !== null && maxMorningSwellPeriod > 12) return "LONG-PERIOD SURGE";
  if (maxMorningWind !== null && maxMorningWind > 14) return "WIND CHOP";
  if (exposure === "open coast") return "OPEN-COAST EXPOSURE";
  return "SAFETY THRESHOLDS NOT MET";
}

function describeSurge(waveHeight, swellPeriod, exposure) {
  if (!Number.isFinite(waveHeight) || !Number.isFinite(swellPeriod)) return "Surge unknown";
  const exposed = exposure === "open coast" || exposure === "partial shelter";
  if (waveHeight <= 2 && swellPeriod <= 10 && !exposed) return "Lower surge";
  if (waveHeight <= 3 && swellPeriod <= 12) return "Moderate surge";
  return "High surge";
}

function inferVisibility(waveHeight, swellPeriod) {
  if (!Number.isFinite(waveHeight) || !Number.isFinite(swellPeriod)) return "Unknown";
  if (waveHeight <= 2 && swellPeriod <= 10) return "Probably better, unverified";
  if (waveHeight <= 3) return "Uncertain";
  return "Likely poor";
}

function buildSpearfishingReasons({ avgMorningWave, maxMorningSwellPeriod, maxMorningWind, hasAdvisory, exposure }) {
  const reasons = [];
  if (hasAdvisory) {
    reasons.push({ type: "bad", text: "Active NWS alert found near this candidate." });
  }
  reasons.push({
    type: avgMorningWave <= 2 ? "good" : avgMorningWave <= 3 ? "warn" : "bad",
    text: `Open-Meteo morning wave height averages ${formatNumber(avgMorningWave, " ft")}.`
  });
  reasons.push({
    type: maxMorningSwellPeriod <= 10 ? "good" : maxMorningSwellPeriod <= 12 ? "warn" : "bad",
    text: `Swell period reaches ${formatNumber(maxMorningSwellPeriod, " sec")}, which drives surge at entries and exits.`
  });
  reasons.push({
    type: maxMorningWind <= 10 ? "good" : maxMorningWind <= 14 ? "warn" : "bad",
    text: `NWS morning wind reaches ${formatNumber(maxMorningWind, " mph")}.`
  });
  reasons.push({
    type: "warn",
    text: `${exposure} entry; this card assumes known legal water and evaluates physical entry/exit conditions.`
  });
  return reasons;
}

function getVerdictClass(verdict) {
  if (verdict.includes("NO GO")) return "verdict-no-go";
  if (verdict.includes("GO") && !verdict.includes("NO GO") && !verdict.includes("MAYBE")) return "verdict-go";
  return "verdict-maybe";
}

function getReasonMark(type) {
  if (type === "good") return "+";
  return "!";
}

function renderReasons(reasons) {
  return `
    <ul class="reason-list">
      ${reasons.map((reason) => `
        <li class="reason-${escapeHtml(reason.type)}">
          <span class="reason-mark">${getReasonMark(reason.type)}</span>
          <span>${escapeHtml(reason.text)}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderMetrics(metrics) {
  return `
    <div class="summary-grid">
      ${metrics.map((metric) => `
        <div class="metric">
          <span>${escapeHtml(metric.label)}</span>
          <strong>${escapeHtml(metric.value)}</strong>
          ${metric.detail ? `<p>${escapeHtml(metric.detail)}</p>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function renderConditionGraphs(item, tideEvents = []) {
  const summary = item.sourceSummary || {};
  const surfGraph = renderSurfGraph(summary.waveSeries || [], summary.windSeries || []);
  const tideGraph = tideEvents.length ? renderTideGraph(tideEvents) : "";
  if (!surfGraph && !tideGraph) return "";

  return `
    <section class="graph-grid">
      ${surfGraph}
      ${tideGraph}
    </section>
  `;
}

function renderSurfGraph(waveSeries, windSeries) {
  if (!waveSeries.length) return "";
  const waveValues = waveSeries.map((point) => point.waveHeight).filter(Number.isFinite);
  const periodValues = waveSeries.map((point) => point.swellPeriod).filter(Number.isFinite);
  const windValues = windSeries.map((point) => point.windMph).filter(Number.isFinite);
  const maxWave = maxNumber(waveValues) || 1;
  const maxPeriod = maxNumber(periodValues) || 1;
  const maxWind = maxNumber(windValues) || 1;
  const wavePoints = buildChartPoints(waveSeries, "waveHeight", maxWave, 220, 82);
  const periodPoints = buildChartPoints(waveSeries, "swellPeriod", maxPeriod, 220, 82);
  const windBars = buildWindBars(windSeries, maxWind, 220, 82);
  const timeLabels = buildFixedHourAxisLabels();

  return `
    <article class="graph-card">
      <div class="graph-header">
        <div>
          <span>Surf trend</span>
          <strong>${formatNumber(maxWave, " ft")} max waves · ${formatNumber(maxPeriod, " sec")} max period</strong>
        </div>
        <p>${formatNumber(maxWind, " mph")} max wind</p>
      </div>
      <svg class="condition-graph" viewBox="0 0 286 150" role="img" aria-label="Weekend surf and wind trend graph">
        <defs>
          <linearGradient id="waveFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#54c7ec" stop-opacity="0.42"></stop>
            <stop offset="100%" stop-color="#54c7ec" stop-opacity="0.03"></stop>
          </linearGradient>
        </defs>
        <line x1="36" y1="100" x2="256" y2="100" class="graph-axis"></line>
        <line x1="36" y1="18" x2="36" y2="100" class="graph-axis"></line>
        <line x1="36" y1="18" x2="256" y2="18" class="graph-grid-line"></line>
        <line x1="36" y1="59" x2="256" y2="59" class="graph-grid-line"></line>
        <text x="2" y="21" class="graph-label">${formatNumber(maxWave, " ft")}</text>
        <text x="8" y="62" class="graph-label">${formatNumber(maxWave / 2, " ft")}</text>
        <text x="18" y="103" class="graph-label">0</text>
        <text x="7" y="143" class="graph-axis-title">y: wave ft / period sec / wind mph</text>
        ${windBars}
        <polyline points="${wavePoints}" class="graph-fill-line"></polyline>
        <polyline points="${periodPoints}" class="graph-period-line"></polyline>
        ${timeLabels}
      </svg>
      <div class="graph-legend">
        <span><i class="legend-wave"></i>Wave height</span>
        <span><i class="legend-period"></i>Swell period</span>
        <span><i class="legend-wind"></i>Wind</span>
      </div>
    </article>
  `;
}

function renderTideGraph(tideEvents) {
  const events = tideEvents
    .map((event) => ({ ...event, value: Number(event.v) }))
    .filter((event) => Number.isFinite(event.value));
  if (!events.length) return "";
  const minTide = minNumber(events.map((event) => event.value)) ?? 0;
  const maxTide = maxNumber(events.map((event) => event.value)) ?? 1;
  const range = Math.max(1, maxTide - minTide);
  const points = events.map((event, index) => {
    const x = 36 + (index / Math.max(1, events.length - 1)) * 220;
    const y = 100 - ((event.value - minTide) / range) * 76;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const tideTimeLabels = buildFixedHourAxisLabels();

  return `
    <article class="graph-card">
      <div class="graph-header">
        <div>
          <span>Tide curve</span>
          <strong>${formatNumber(minTide, " ft")} low · ${formatNumber(maxTide, " ft")} high</strong>
        </div>
        <p>NOAA CO-OPS</p>
      </div>
      <svg class="condition-graph" viewBox="0 0 286 150" role="img" aria-label="Weekend tide high and low graph">
        <line x1="36" y1="100" x2="256" y2="100" class="graph-axis"></line>
        <line x1="36" y1="18" x2="36" y2="100" class="graph-axis"></line>
        <line x1="36" y1="18" x2="256" y2="18" class="graph-grid-line"></line>
        <line x1="36" y1="59" x2="256" y2="59" class="graph-grid-line"></line>
        <text x="2" y="21" class="graph-label">${formatNumber(maxTide, " ft")}</text>
        <text x="2" y="62" class="graph-label">${formatNumber((maxTide + minTide) / 2, " ft")}</text>
        <text x="2" y="103" class="graph-label">${formatNumber(minTide, " ft")}</text>
        <text x="7" y="143" class="graph-axis-title">y: tide height ft MLLW</text>
        <polyline points="${points}" class="graph-tide-line"></polyline>
        ${events.map((event, index) => {
          const x = 36 + (index / Math.max(1, events.length - 1)) * 220;
          const y = 100 - ((event.value - minTide) / range) * 76;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" class="${event.type === "H" ? "tide-high-dot" : "tide-low-dot"}"></circle>`;
        }).join("")}
        ${tideTimeLabels}
      </svg>
      <div class="graph-legend">
        <span><i class="legend-tide"></i>High/low predictions</span>
        <span><i class="legend-low"></i>Low tide</span>
      </div>
    </article>
  `;
}

function buildChartPoints(series, key, maxValue, width, height) {
  return series.map((point, index) => {
    const value = Number(point[key]);
    const safeValue = Number.isFinite(value) ? value : 0;
    const x = 36 + (index / Math.max(1, series.length - 1)) * width;
    const y = 100 - (safeValue / Math.max(1, maxValue)) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function buildFixedHourAxisLabels() {
  const ticks = [
    { x: 64, label: "6a" },
    { x: 92, label: "12p" },
    { x: 120, label: "6p" },
    { x: 174, label: "6a" },
    { x: 202, label: "12p" },
    { x: 230, label: "6p" }
  ];
  return `
    ${ticks.map((tick) => `<text x="${tick.x}" y="118" class="graph-label graph-hour-label">${tick.label}</text>`).join("")}
    <text x="82" y="131" class="graph-axis-title">Sat</text>
    <text x="192" y="131" class="graph-axis-title">Sun</text>
  `;
}

function buildWindBars(series, maxValue, width, height) {
  return series.map((point, index) => {
    const value = Number(point.windMph);
    const safeValue = Number.isFinite(value) ? value : 0;
    const x = 36 + (index / Math.max(1, series.length - 1)) * width - 2;
    const barHeight = (safeValue / Math.max(1, maxValue)) * height;
    const y = 100 - barHeight;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="4" height="${barHeight.toFixed(1)}" class="graph-wind-bar"></rect>`;
  }).join("");
}

function renderSourceLinks() {
  return `
    <section class="source-card">
      <h2>Live Sources</h2>
      <p class="cache-note">${escapeHtml(appState.cache.detail || "Server cache enabled")}</p>
      <a href="${sourceConfig.nws.link}" target="_blank" rel="noreferrer">${sourceConfig.nws.name}</a>
      <a href="${sourceConfig.tides.link}" target="_blank" rel="noreferrer">${sourceConfig.tides.name}</a>
      <a href="${sourceConfig.marine.link}" target="_blank" rel="noreferrer">${sourceConfig.marine.name}</a>
      ${sourceConfig.regulations.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
    </section>
  `;
}

function renderCdfwCrabStatus(status) {
  return `
    <section class="source-card cdfw-card">
      <h2>CDFW Crab Season Check</h2>
      <div class="status-line">
        <span class="status-dot ${status.inStatutorySeason ? "status-good" : "status-bad"}"></span>
        <strong>${escapeHtml(status.status)}</strong>
      </div>
      <p>${escapeHtml(status.location)} · RAMP Fishing Zone ${escapeHtml(status.rampZone)}</p>
      <p>${escapeHtml(status.statutorySeason.label)}</p>
      <p>${escapeHtml(status.health.detail)}</p>
      <p>${escapeHtml(status.whaleSafe.detail)}</p>
    </section>
  `;
}

function renderTides(tideEvents) {
  if (!tideEvents.length) return "";
  return `
    <div class="tide-strip">
      ${tideEvents.slice(0, 8).map((event) => `
        <span>${escapeHtml(event.type === "H" ? "High" : "Low")} ${escapeHtml(formatTimeLabel(event.t))} · ${escapeHtml(Number(event.v).toFixed(1))} ft</span>
      `).join("")}
    </div>
  `;
}

function renderSpotDetails(item) {
  if (!item.region) return "";

  return `
    <section class="spot-detail-card">
      <h2>Spot Research</h2>
      <div class="detail-grid">
        <div><span>Region</span><strong>${escapeHtml(item.region)}</strong></div>
        <div><span>Drive from SF</span><strong>${escapeHtml(item.driveHours)} hr</strong></div>
        <div><span>Access</span><strong>${escapeHtml(formatAccessType(item.accessType))}</strong></div>
        <div><span>Best for</span><strong>${escapeHtml(item.suitability)}</strong></div>
        <div><span>Legal assumption</span><strong>${escapeHtml(item.risks.legal)}</strong></div>
      </div>
      <p class="mpa-warning">${escapeHtml(item.mpaWarning)}</p>
      ${renderPillGroup("Strengths", item.strengths)}
      ${renderPillGroup("Target species to verify", item.species)}
      ${renderPillGroup("Condition risk badges", item.risksList)}
      ${renderSourceList(item.sourceUrls)}
    </section>
  `;
}

function formatAccessType(accessType) {
  return String(accessType || "").replace(/_/g, " ");
}

function renderPillGroup(title, values = []) {
  if (!values.length) return "";
  return `
    <div class="pill-group">
      <h3>${escapeHtml(title)}</h3>
      <div class="tags">
        ${values.map((value) => `<span class="tag">${escapeHtml(value)}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderSourceList(sourceUrls = []) {
  if (!sourceUrls.length) return "";
  return `
    <div class="spot-sources">
      <h3>Spot Sources</h3>
      ${sourceUrls.map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.title)}</a>`).join("")}
    </div>
  `;
}

function renderDecisionCard({ item, question, extraMetrics = [], legalReminder = "", tideEvents = [] }) {
  const headlineVerdict = item.headlineVerdict || item.verdict;
  const metrics = [
    {
      label: "Upcoming weekend",
      value: weekendRange,
      detail: "All checks are scoped to this Saturday/Sunday window."
    },
    {
      label: "Best window",
      value: item.bestWindow,
      detail: item.bestWindow.toLowerCase().includes("no ")
        ? "No window is selected; the panels below show each independent legal, marine, wind, and current finding."
        : "Chosen from the safest matching morning conditions."
    },
    {
      label: "Return by",
      value: item.returnBy || "Not applicable",
      detail: item.returnBy ? "Conservative cutoff before wind, surge, or exit risk increases." : "No departure window is recommended, so no return time is assigned."
    },
    ...extraMetrics
  ];

  return `
    <article class="decision-card">
      <div class="card-top">
        <div class="meta-row">
          <span>${escapeHtml(item.activity)}</span>
          <span>Sat/Sun window</span>
        </div>
        <h2 class="spot-title">${escapeHtml(item.spot)}</h2>
        <p>${escapeHtml(question)}</p>
        <span class="verdict-pill ${getVerdictClass(item.verdict)}">${escapeHtml(headlineVerdict)}</span>
        ${item.headlineReason ? `<p class="headline-reason">Top blocker: ${escapeHtml(item.headlineReason)}</p>` : ""}
      </div>
      ${renderMetrics(metrics)}
      ${renderConditionGraphs(item, tideEvents)}
      ${renderTides(tideEvents)}
      ${renderSpotDetails(item)}
      ${renderReasons(item.reasons)}
      ${legalReminder ? `<p class="legal-note">${escapeHtml(legalReminder)}</p>` : ""}
    </article>
  `;
}

function renderCrabbing() {
  const data = appState.data.crabbing;
  const summary = data.sourceSummary;
  const cdfwStatus = summary.cdfwCrabStatus;
  return `
    ${renderDecisionCard({
      item: data,
      question: data.question,
      legalReminder: data.legalReminder,
      tideEvents: data.sourceSummary.tideEvents,
      extraMetrics: [
        {
          label: "Entry / exit risk",
          value: data.risks.entryExit,
          detail: `Morning wave height reaches ${formatNumber(summary.maxMorningWave, " ft")}; exposed beach launches need a calm exit and return.`
        },
        {
          label: "Wind drift risk",
          value: data.risks.windDrift,
          detail: `NWS morning wind reaches ${formatNumber(summary.maxMorningWind, " mph")}; wind can make the paddle back harder than launch.`
        },
        {
          label: "Current risk",
          value: data.risks.current,
          detail: data.risks.currentDetail
        },
        {
          label: "Confidence",
          value: data.risks.confidence,
          detail: summary.alerts.length
            ? `The NWS alert check independently returned ${summarizeAlerts(summary.alerts)} for the area.`
            : "NWS alert, wind, wave, and tide source checks returned successfully for this card."
        }
      ]
    })}
    ${renderCdfwCrabStatus(data.sourceSummary.cdfwCrabStatus)}
    ${renderSourceLinks()}
  `;
}

function getSpearfishingMetrics(item) {
  return [
    {
      label: "Region / drive",
      value: `${item.region} · ${item.driveHours} hr from SF`,
      detail: `${formatAccessType(item.accessType)} access; best for ${item.suitability}.`
    },
    {
      label: "Surge risk",
      value: item.risks.surge,
      detail: `Live marine forecast: avg morning waves ${formatNumber(item.sourceSummary.avgMorningWave, " ft")}, swell period ${formatNumber(item.sourceSummary.maxMorningSwellPeriod, " sec")}.`
    },
    {
      label: "Visibility estimate",
      value: item.risks.visibility,
      detail: "Estimated from wave/swell calmness as an app conclusion; no separate local vis report source is wired yet."
    },
    {
      label: "Legal assumption",
      value: item.risks.legal,
      detail: item.mpaWarning
    },
    {
      label: "Confidence",
      value: item.risks.confidence,
      detail: item.sourceSummary.alerts.length
        ? `NWS alert screen returned ${summarizeAlerts(item.sourceSummary.alerts)} for this candidate.`
        : "Physical-condition screen loaded independently; legal fishing water is treated as preselected for this spot."
    }
  ];
}

function renderMoreOptions(options) {
  if (!appState.showMoreSpearfishing) return "";

  return `
    <div class="more-options">
      ${options.map((option) => renderDecisionCard({
        item: option,
        question: `Independent candidate check for ${option.region}, ${option.driveHours} hr from San Francisco.`,
        extraMetrics: getSpearfishingMetrics(option)
      })).join("")}
    </div>
  `;
}

function renderSpearfishing() {
  const data = appState.data.spearfishing;
  const item = data.topOption;
  return `
    ${renderDecisionCard({
      item,
      question: data.question,
      extraMetrics: getSpearfishingMetrics(item)
    })}
    <button class="expand-button" type="button" data-expand-spearfishing>
      ${appState.showMoreSpearfishing ? "Hide extra spearfishing options" : "Show more spearfishing options"}
    </button>
    ${renderMoreOptions(data.moreOptions)}
    ${renderSourceLinks()}
  `;
}

function renderLoading() {
  return `
    <article class="decision-card">
      <div class="card-top">
        <div class="meta-row"><span>Live source check</span><span>Upcoming weekend</span></div>
        <h2 class="spot-title">Pulling real marine data...</h2>
        <p>Checking NWS wind and alerts, NOAA tides, and marine wave forecasts for ${escapeHtml(weekendRange)}.</p>
        <span class="verdict-pill verdict-maybe">LOADING</span>
      </div>
      ${renderMetrics([
        { label: "NWS", value: "Hourly forecast + alerts" },
        { label: "NOAA CO-OPS", value: "San Francisco tides" },
        { label: "Marine forecast", value: "Wave and swell fields" },
        { label: "CDFW crab status", value: "Season + closures + trap status" }
      ])}
    </article>
  `;
}

function renderError() {
  return `
    <article class="decision-card">
      <div class="card-top">
        <div class="meta-row"><span>Live source check</span><span>Upcoming weekend</span></div>
        <h2 class="spot-title">Live data unavailable</h2>
        <p>The app did not substitute mocked conditions. Open this page with network access and retry.</p>
        <span class="verdict-pill verdict-no-go">NO DATA - NO GO</span>
      </div>
      ${renderMetrics([
        { label: "Error", value: appState.error || "Unknown fetch error" },
        { label: "Weekend", value: weekendRange }
      ])}
    </article>
    ${renderSourceLinks()}
  `;
}

function renderLockPreview() {
  const widget = document.querySelector("#lock-widget");
  let title = "Launch Window";
  let verdict = appState.status === "loading" ? "Checking sources" : "NO DATA - NO GO";
  let detail = `Upcoming weekend: ${weekendRange}`;

  if (appState.status === "ready") {
    const item = appState.activeMode === "crabbing"
      ? appState.data.crabbing
      : appState.data.spearfishing.topOption;
    title = appState.activeMode === "crabbing" ? `Crabbing · ${item.spot}` : `Spearfishing · ${item.spot}`;
    verdict = (item.headlineVerdict || item.verdict).replace("THIS WEEKEND", "weekend");
    detail = `${item.bestWindow}. ${item.risks.legal || item.risks.windDrift || ""}`;
  }

  widget.innerHTML = `
    <p class="lock-title">${escapeHtml(title)}</p>
    <p class="lock-verdict">${escapeHtml(verdict)}</p>
    <p class="lock-detail">${escapeHtml(detail)}</p>
  `;
}

function render() {
  document.querySelectorAll("[data-weekend-range]").forEach((element) => {
    element.textContent = weekendRange;
  });
  document.querySelector("[data-lock-weekend]").textContent = weekendRange;

  document.querySelectorAll(".mode-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.mode === appState.activeMode);
  });

  const content = document.querySelector("#mode-content");
  if (appState.status === "loading") {
    content.innerHTML = renderLoading();
  } else if (appState.status === "error") {
    content.innerHTML = renderError();
  } else {
    content.innerHTML = appState.activeMode === "crabbing" ? renderCrabbing() : renderSpearfishing();
  }

  renderLockPreview();
}

document.querySelector(".mode-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  appState.activeMode = button.dataset.mode;
  render();
});

document.querySelector("#mode-content").addEventListener("click", (event) => {
  const button = event.target.closest("[data-expand-spearfishing]");
  if (!button) return;
  appState.showMoreSpearfishing = !appState.showMoreSpearfishing;
  render();
});

render();
resetServerCacheStats();
loadCachedOrFreshData()
  .then(({ data, cache }) => {
    appState.status = "ready";
    appState.data = data;
    appState.cache = cache;
    render();
  })
  .catch((error) => {
    appState.status = "error";
    appState.error = error.message;
    render();
  });
