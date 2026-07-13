const sourceConfig = {
  tides: {
    name: "NOAA CO-OPS San Francisco tide predictions",
    url: "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter",
    station: "9414290",
    link: "https://tidesandcurrents.noaa.gov/stationhome.html?id=9414290"
  },
  lawsonsTides: {
    name: "NOAA CO-OPS Point Reyes tide predictions",
    station: "9415020",
    link: "https://tidesandcurrents.noaa.gov/stationhome.html?id=9415020"
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
  weather: {
    name: "Open-Meteo hourly wind fallback",
    url: "https://api.open-meteo.com/v1/forecast",
    link: "https://open-meteo.com/en/docs"
  },
  ndbc: {
    name: "NDBC Buoy 46237 San Francisco Bar",
    station: "46237",
    detail: "San Francisco Bar, CA Waverider buoy",
    link: "https://www.ndbc.noaa.gov/station_page.php?station=46237"
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
    clamRegsUrl: "https://wildlife.ca.gov/Fishing/Ocean/Regulations/Sport-Fishing/Invertebrate-Fishing-Regs",
    cdfwOceanSportfishMapUrl: "https://wildlife.ca.gov/OceanSportfishMap",
    cdfwOceanSportfishExperienceUrl: "https://experience.arcgis.com/experience/ff600a0249fe42f6aba0a0c30cc52eed",
    cdfwMpaLayerUrl: "https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/California_Marine_Protected_Areas/FeatureServer/1",
    cdphShellfishUrl: "https://www.cdph.ca.gov/Programs/OPA/Pages/Shellfish-Advisories.aspx",
    cdphShellfishMapUrl: "https://experience.arcgis.com/experience/394836318cfe4f7494e1c09097a43559/",
    cdphShellfishLayers: {
      red: "https://services2.arcgis.com/wi1yEacfYjH5viqb/arcgis/rest/services/Health_Advisory_Symbols_(Red)/FeatureServer/0",
      yellow: "https://services2.arcgis.com/wi1yEacfYjH5viqb/arcgis/rest/services/Limited_Advisory_Symbols_(Yellow)/FeatureServer/0",
      specialAreas: "https://services2.arcgis.com/wi1yEacfYjH5viqb/arcgis/rest/services/All_Bivalve_Shellfish_Health_Advisory_Special_Advisory/FeatureServer/3"
    },
    lawsonsClammingUrl: "https://www.lawsonslanding.com/clamming.html",
    links: [
      { label: "CDFW ocean sport fishing", url: "https://wildlife.ca.gov/Fishing/Ocean/Regulations/Fishing-Map" },
      { label: "CDFW Ocean Sportfishing Map", url: "https://wildlife.ca.gov/OceanSportfishMap" },
      { label: "CDFW clam regulations", url: "https://wildlife.ca.gov/Fishing/Ocean/Regulations/Sport-Fishing/Invertebrate-Fishing-Regs" },
      { label: "CDFW crab regulations", url: "https://wildlife.ca.gov/Fishing/Ocean/Regulations/Sport-Fishing/Invertebrate-Fishing-Regs#crab" },
      { label: "CDFW Whale Safe Fisheries", url: "https://wildlife.ca.gov/Conservation/Marine/Whale-Safe-Fisheries" },
      { label: "CDFW crab health advisories", url: "https://wildlife.ca.gov/Fishing/Ocean/Health-Advisories" },
      { label: "CDPH shellfish advisories", url: "https://www.cdph.ca.gov/Programs/OPA/Pages/Shellfish-Advisories.aspx" },
      { label: "CDPH shellfish advisory map", url: "https://experience.arcgis.com/experience/394836318cfe4f7494e1c09097a43559/" },
      { label: "Lawson's Landing clamming", url: "https://www.lawsonslanding.com/clamming.html" }
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
      go: { maxWaveFeet: 5, maxWindMph: 12, maxSwellHeightFeet: 3, maxSwellPeriodSeconds: 14 },
      maybe: { maxWaveFeet: 6, maxWindMph: 14, maxSwellHeightFeet: 4, maxSwellPeriodSeconds: 16 }
    }
  },
  spearfishing: {
    activity: "Beach-entry spearfishing",
    question: "What is the best beach-entry spearfishing option this upcoming Saturday/Sunday?",
    thresholds: {
      go: { maxWaveFeet: 4, maxWindMph: 12, maxSwellHeightFeet: 3, maxSwellPeriodSeconds: 14 },
      maybe: { maxWaveFeet: 6, maxWindMph: 14, maxSwellHeightFeet: 4, maxSwellPeriodSeconds: 16 }
    },
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
  },
  clamming: {
    spot: "Lawson's Landing",
    activity: "Tomales Bay clamming",
    coords: { latitude: 38.2314, longitude: -122.9682 },
    cdphCounty: "Marin",
    tideStation: "9415020",
    question: "Is there a daylight low-tide clamming window at Lawson's Landing this upcoming Saturday or Sunday?",
    thresholds: {
      maxTideFeet: 0.5,
      maxWindMph: 12,
      maxWaveFeet: 4
    }
  }
};

const appState = {
  activeMode: "crabbing",
  showMoreSpearfishing: false,
  weekendOffset: 0,
  spearfishingIndex: 0,
  loadGeneration: 0,
  status: "loading",
  error: "",
  data: null,
  modeStatus: {
    crabbing: "loading",
    spearfishing: "loading",
    clamming: "loading"
  },
  modeErrors: {
    crabbing: "",
    spearfishing: "",
    clamming: ""
  },
  cache: {
    status: "loading",
    detail: "Checking server cache",
    requests: 0,
    hits: 0,
    misses: 0
  }
};

const CACHE_VERSION = "launch-window-v19";
const CACHE_TTL_MS = 3 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 20000;
const MAX_WEEKEND_OFFSET = 4;

function getSelectedWeekend() {
  return getUpcomingWeekend(new Date(), appState.weekendOffset);
}

function getSelectedWeekendRange() {
  return formatWeekendRange(getSelectedWeekend());
}

function getUpcomingWeekend(baseDate = new Date(), offsetWeeks = 0) {
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
  saturday.setDate(date.getDate() + daysUntilSaturday + (offsetWeeks * 7));
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

function getWeekendOptions() {
  return Array.from({ length: MAX_WEEKEND_OFFSET + 1 }, (_, offset) => ({
    offset,
    label: formatWeekendRange(getUpcomingWeekend(new Date(), offset))
  }));
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
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(requestUrl, {
      headers: { "Accept": accept },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const cacheHeader = response.headers.get("x-launch-cache");
    if (cacheHeader) {
      recordServerCacheHeader(cacheHeader);
    }

    return response.text();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Timed out after ${Math.round(FETCH_TIMEOUT_MS / 1000)}s: ${url}`);
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
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
  const [crabbingDecision, spearfishingPayload, clammingDecision] = await Promise.all([
    loadCrabbingData(),
    loadSpearfishingData(),
    loadClammingData()
  ]);
  return {
    generatedAt: new Date(),
    crabbing: crabbingDecision,
    clamming: clammingDecision,
    spearfishing: spearfishingPayload
  };
}

async function loadCrabbingData() {
  const crabbing = missionConfig.crabbing;
  const [tides, weather, marine, alerts, cdfwCrabStatus] = await Promise.all([
    fetchTides({ station: sourceConfig.tides.station }),
    fetchNwsWeather(crabbing.coords),
    fetchMarineForecast(crabbing.coords),
    fetchAlerts(crabbing.coords),
    fetchCdfwCrabStatus(crabbing)
  ]);
  return evaluateCrabbing({
    config: crabbing,
    weather,
    marine,
    tides,
    alerts,
    cdfwCrabStatus
  });
}

async function loadSpearfishingData() {
  const spearfishing = missionConfig.spearfishing;
  const candidateResults = await Promise.all(spearfishing.candidates.map(async (candidate) => ({
    ...candidate,
    weather: await fetchNwsWeather(candidate.coords),
    marine: await fetchMarineForecast(candidate.coords),
    alerts: await fetchAlerts(candidate.coords),
    legalMap: await fetchSpearfishingLegalMap(candidate)
  })));
  const spearfishingDecisions = candidateResults
    .map((candidate) => evaluateSpearfishingCandidate(candidate))
    .sort((a, b) => b.score - a.score);
  return {
    question: spearfishing.question,
    options: spearfishingDecisions,
    topOption: spearfishingDecisions[0],
    moreOptions: spearfishingDecisions.slice(1)
  };
}

async function loadClammingData() {
  const clamming = missionConfig.clamming;
  const [tides, weather, marine, alerts, clammingStatus] = await Promise.all([
    fetchTides({ station: clamming.tideStation }),
    fetchNwsWeather(clamming.coords),
    fetchMarineForecast(clamming.coords),
    fetchAlerts(clamming.coords),
    fetchClammingStatus(clamming)
  ]);
  return evaluateClamming({
    config: clamming,
    weather,
    marine,
    tides,
    alerts,
    clammingStatus
  });
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

function getCachedWeekendData({ forceRefresh = false } = {}) {
  if (forceRefresh) return null;
  const cached = readCachedData(getCacheKey());
  if (!cached) return null;
  return {
    data: reviveCachedData(cached.data),
    cache: {
      status: "browser-cached",
      detail: `Browser cache reused weekend checks from ${formatCacheTime(cached.savedAt)}`
    }
  };
}

function makeEmptyWeekendData() {
  return {
    generatedAt: new Date(),
    crabbing: null,
    spearfishing: null,
    clamming: null
  };
}

function resetModeStatuses(status = "loading") {
  appState.modeStatus = {
    crabbing: status,
    spearfishing: status,
    clamming: status
  };
  appState.modeErrors = {
    crabbing: "",
    spearfishing: "",
    clamming: ""
  };
}

function getCacheKey() {
  const weekend = getSelectedWeekend();
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

async function fetchTides({ station }) {
  const weekend = getSelectedWeekend();
  const params = new URLSearchParams({
    begin_date: toApiDate(weekend.saturday),
    end_date: toApiDate(weekend.sunday),
    station,
    product: "predictions",
    datum: "MLLW",
    time_zone: "lst_ldt",
    interval: "h",
    units: "english",
    application: "LaunchWindow",
    format: "json"
  });
  const data = await fetchJson(`${sourceConfig.tides.url}?${params}`);
  return data.predictions || [];
}

async function fetchClammingStatus(config = missionConfig.clamming) {
  const [cdfwResult, cdphResult, lawsonsResult] = await Promise.allSettled([
    fetchText(sourceConfig.regulations.clamRegsUrl),
    fetchCdphShellfishMapStatus(config),
    fetchText(sourceConfig.regulations.lawsonsClammingUrl)
  ]);

  return {
    cdfw: cdfwResult.status === "fulfilled"
      ? parseCdfwClamRules(cdfwResult.value)
      : getCdfwClamRulesBaseline(),
    cdph: cdphResult.status === "fulfilled"
      ? cdphResult.value
      : {
        status: "CDPH map unavailable",
        detail: "CDPH ArcGIS shellfish advisory map could not be read automatically; call CDPH's Shellfish Information Line at (800) 553-4133 before digging.",
        sourceAvailable: false,
        checkedAt: new Date().toISOString()
      },
    lawsons: lawsonsResult.status === "fulfilled"
      ? parseLawsonsClammingGuidance(lawsonsResult.value)
      : getLawsonsClammingBaseline()
  };
}

async function fetchNwsWeather(coords) {
  try {
    const point = await fetchJson(`${sourceConfig.nws.pointsUrl}/${coords.latitude},${coords.longitude}`);
    const hourlyUrl = point.properties.forecastHourly;
    const hourly = await fetchJson(hourlyUrl);
    const periods = filterWeekendHours(hourly.properties.periods || []);
    if (periods.length) {
      return {
        sourceUrl: hourlyUrl,
        sourceName: sourceConfig.nws.name,
        periods
      };
    }
  } catch {
    // Fall through to Open-Meteo when NWS is outside horizon or unavailable.
  }
  return fetchOpenMeteoWind(coords);
}

async function fetchOpenMeteoWind(coords) {
  const weekend = getSelectedWeekend();
  const params = new URLSearchParams({
    latitude: coords.latitude,
    longitude: coords.longitude,
    hourly: ["wind_speed_10m", "wind_direction_10m"].join(","),
    wind_speed_unit: "mph",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles",
    start_date: toIsoDate(weekend.saturday),
    end_date: toIsoDate(weekend.sunday)
  });
  try {
    const data = await fetchJson(`${sourceConfig.weather.url}?${params}`);
    return {
      sourceUrl: `${sourceConfig.weather.url}?${params}`,
      sourceName: sourceConfig.weather.name,
      periods: normalizeOpenMeteoWindHours(data.hourly || {})
    };
  } catch {
    return {
      sourceUrl: `${sourceConfig.weather.url}?${params}`,
      sourceName: `${sourceConfig.weather.name} unavailable`,
      periods: []
    };
  }
}

async function fetchAlerts(coords) {
  if (appState.weekendOffset > 0) return [];
  const params = new URLSearchParams({
    point: `${coords.latitude},${coords.longitude}`
  });
  const data = await fetchJson(`${sourceConfig.nws.alertsUrl}?${params}`);
  return (data.features || []).map((feature) => feature.properties);
}

async function fetchMarineForecast(coords) {
  const weekend = getSelectedWeekend();
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
  try {
    const data = await fetchJson(`${sourceConfig.marine.url}?${params}`);
    return normalizeMarineHours(data.hourly || {});
  } catch (error) {
    return [];
  }
}

async function fetchSpearfishingLegalMap(candidate) {
  try {
    const features = await queryArcgisFeatures(sourceConfig.regulations.cdfwMpaLayerUrl, {
      geometry: `${candidate.coords.longitude},${candidate.coords.latitude}`,
      geometryType: "esriGeometryPoint",
      inSR: "4326",
      spatialRel: "esriSpatialRelIntersects",
      distance: "3",
      units: "esriSRUnit_StatuteMile",
      outFields: "name,fullname,type,mpa_url,regulations_url,regulation_text",
      returnGeometry: "true",
      outSR: "4326",
      geometryPrecision: "5"
    });

    return {
      status: "CDFW MPA map loaded",
      detail: features.length
        ? `${features.length} official CDFW MPA polygon(s) within 3 miles of this spot.`
        : "No official CDFW MPA polygon intersected the 3-mile screen around this spot.",
      spot: {
        latitude: candidate.coords.latitude,
        longitude: candidate.coords.longitude
      },
      staticMapUrl: `assets/maps/${candidate.id}.jpg`,
      mapUrl: buildCdfwSportfishMapUrl(candidate.coords),
      embedUrl: buildCdfwSportfishExperienceUrl(candidate.coords),
      layerUrl: sourceConfig.regulations.cdfwMpaLayerUrl,
      nearbyMpas: features.map((feature) => normalizeMpaFeature(feature.attributes || {}, feature.geometry)),
      sourceAvailable: true
    };
  } catch (error) {
    return {
      status: "CDFW MPA map unavailable",
      detail: "Official CDFW MPA map data could not be loaded automatically for this spot.",
      spot: {
        latitude: candidate.coords.latitude,
        longitude: candidate.coords.longitude
      },
      staticMapUrl: `assets/maps/${candidate.id}.jpg`,
      mapUrl: buildCdfwSportfishMapUrl(candidate.coords),
      embedUrl: buildCdfwSportfishExperienceUrl(candidate.coords),
      layerUrl: sourceConfig.regulations.cdfwMpaLayerUrl,
      nearbyMpas: [],
      sourceAvailable: false
    };
  }
}

function normalizeMpaFeature(attributes, geometry = null) {
  return {
    name: attributes.fullname || attributes.name || "Unnamed CDFW MPA",
    shortName: attributes.name || attributes.fullname || "CDFW MPA",
    type: attributes.type || "MPA",
    mpaUrl: attributes.mpa_url || "",
    regulationsUrl: attributes.regulations_url || "",
    regulationText: normalizeText(attributes.regulation_text || ""),
    geometry
  };
}

function buildCdfwSportfishMapUrl(coords) {
  const params = new URLSearchParams({
    center: `${coords.longitude},${coords.latitude}`,
    level: "13"
  });
  return `${sourceConfig.regulations.cdfwOceanSportfishMapUrl}?${params}`;
}

function buildCdfwSportfishExperienceUrl(coords) {
  const params = new URLSearchParams({
    center: `${coords.longitude},${coords.latitude}`,
    level: "13"
  });
  return `${sourceConfig.regulations.cdfwOceanSportfishExperienceUrl}?${params}`;
}

async function fetchCdfwCrabStatus(config) {
  const weekend = getSelectedWeekend();
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

function parseCdfwClamRules(html) {
  const text = normalizeText(html);
  const clamSection = extractBetween(text, "29.20. Clams General.", "### Crustaceans") || text;
  const hasDaylightRule = /one-half hour before sunrise to one-half hour after sunset/i.test(clamSection);
  const hasHandGearRule = /hand-operated devices/i.test(clamSection);
  const hasNoClosedSeasonRule = /no closed seasons, bag limits or size limits on saltwater clams/i.test(clamSection);

  return {
    status: hasDaylightRule && hasHandGearRule ? "Clam rules parsed" : "Clam rules unparsed",
    detail: hasDaylightRule && hasHandGearRule
      ? "CDFW clam rules parsed: daylight-only fishing hours and hand-operated clam gear are required."
      : "CDFW clam rules page was reachable, but the daylight/gear language could not be parsed confidently.",
    noClosedSeasonRule: hasNoClosedSeasonRule,
    sourceAvailable: true
  };
}

function getCdfwClamRulesBaseline() {
  return {
    status: "Clam rules baseline",
    detail: "CDFW clam rules baseline applied from the official regulations page: daylight-only fishing hours and hand-operated clam gear are required.",
    noClosedSeasonRule: true,
    sourceAvailable: false
  };
}

async function fetchCdphShellfishMapStatus(config) {
  const county = config.cdphCounty || "Marin";
  const { latitude, longitude } = config.coords;
  const layers = sourceConfig.regulations.cdphShellfishLayers;
  const [redResult, yellowResult, specialResult] = await Promise.allSettled([
    queryArcgisFeatures(layers.red, {
      where: `County_Name = '${county.replace(/'/g, "''")}'`,
      outFields: "County_Name,Latitude,Longitude"
    }),
    queryArcgisFeatures(layers.yellow, {
      where: `County_Name = '${county.replace(/'/g, "''")}'`,
      outFields: "County_Name,Latitude,Longitude"
    }),
    queryArcgisFeatures(layers.specialAreas, {
      geometry: `${longitude},${latitude}`,
      geometryType: "esriGeometryPoint",
      inSR: "4326",
      spatialRel: "esriSpatialRelIntersects",
      outFields: "TITLE,DESCRIPTION,DATE,TYPEID,VISIBLE"
    })
  ]);

  const failures = [
    redResult.status === "rejected" ? "red advisory symbols" : null,
    yellowResult.status === "rejected" ? "yellow limited-advisory symbols" : null,
    specialResult.status === "rejected" ? "special advisory polygons" : null
  ].filter(Boolean);
  const redFeatures = redResult.status === "fulfilled" ? redResult.value : [];
  const yellowFeatures = yellowResult.status === "fulfilled" ? yellowResult.value : [];
  const specialFeatures = specialResult.status === "fulfilled" ? specialResult.value : [];
  const checkedAt = new Date().toISOString();
  const activeDetails = [
    redFeatures.length ? `${redFeatures.length} red CDPH advisory symbol(s) for ${county} County` : null,
    yellowFeatures.length ? `${yellowFeatures.length} yellow CDPH limited-advisory symbol(s) for ${county} County` : null,
    specialFeatures.length ? `${specialFeatures.length} CDPH special advisory polygon(s) intersect Lawson's Landing` : null
  ].filter(Boolean);

  if (activeDetails.length) {
    return {
      status: "Active CDPH advisory found",
      detail: `CDPH advisory map found ${activeDetails.join("; ")}. Do not treat this as a clamming GO until CDPH clears the advisory.`,
      sourceAvailable: true,
      checkedAt,
      redCount: redFeatures.length,
      yellowCount: yellowFeatures.length,
      specialAreaCount: specialFeatures.length,
      failures
    };
  }

  if (failures.length) {
    return {
      status: "CDPH map incomplete",
      detail: `CDPH advisory map responded partially, but ${failures.join(", ")} could not be checked. Call CDPH's Shellfish Information Line at (800) 553-4133 before digging.`,
      sourceAvailable: false,
      checkedAt,
      redCount: redFeatures.length,
      yellowCount: yellowFeatures.length,
      specialAreaCount: specialFeatures.length,
      failures
    };
  }

  return {
    status: "No active Marin/Tomales advisory found",
    detail: `CDPH advisory map returned no red Marin County advisory symbols, no yellow Marin County limited-advisory symbols, and no special advisory polygon intersecting Lawson's Landing. Checked ${formatShortDateTime(checkedAt)}.`,
    sourceAvailable: true,
    checkedAt,
    redCount: 0,
    yellowCount: 0,
    specialAreaCount: 0,
    failures: []
  };
}

async function queryArcgisFeatures(layerUrl, params) {
  const query = new URLSearchParams({
    f: "json",
    returnGeometry: "false",
    ...params
  });
  const data = await fetchJson(`${layerUrl}/query?${query}`);
  if (data.error) throw new Error(data.error.message || "ArcGIS query failed");
  return data.features || [];
}

function parseCdphShellfishAdvisory(html) {
  const text = normalizeText(html);
  const marinIndex = text.search(/Marin County|Marin/i);
  const advisoryNearMarin = marinIndex >= 0 ? text.slice(Math.max(0, marinIndex - 500), marinIndex + 900) : "";
  const hasBivalveWarning = /(do not eat|not eat|warning|advisory|quarantine)/i.test(advisoryNearMarin)
    && /(sport-harvested|recreational)/i.test(advisoryNearMarin)
    && /(bivalve|clam|clams|mussel|mussels|oyster|oysters|scallop|scallops|shellfish)/i.test(advisoryNearMarin);
  const pageMentionsShellfish = /(shellfish|bivalve|clam|mussel|oyster)/i.test(text);

  if (hasBivalveWarning) {
    return {
      status: "Possible Marin shellfish advisory",
      detail: "CDPH shellfish page contains advisory language near Marin/sport-harvested bivalve shellfish; the app blocks a GO until this is verified directly.",
      sourceAvailable: true
    };
  }

  return {
    status: pageMentionsShellfish ? "No Marin advisory parsed" : "Shellfish status unparsed",
    detail: pageMentionsShellfish
      ? "CDPH shellfish page was reachable and no Marin bivalve advisory language was parsed automatically."
      : "CDPH page was reachable, but shellfish advisory text could not be parsed confidently.",
    sourceAvailable: true
  };
}

function parseLawsonsClammingGuidance(html) {
  const text = normalizeText(html);
  const thresholdMatch = text.match(/0\.5 feet or lower/i);
  const daylightMatch = /illegal outside of daylight hours/i.test(text);
  const calmMatch = /calm \(?no wind or heavy surf\)?/i.test(text) || /no wind or heavy surf/i.test(text);

  return {
    status: thresholdMatch && daylightMatch ? "Lawson guidance parsed" : "Lawson guidance unparsed",
    detail: thresholdMatch && daylightMatch
      ? "Lawson's Landing guidance parsed: mudflats expose at 0.5 ft or lower, daylight is required, and calm wind/surf matters."
      : "Lawson's Landing page was reachable, but the tide/daylight guidance could not be parsed confidently.",
    tideThresholdFeet: thresholdMatch ? 0.5 : missionConfig.clamming.thresholds.maxTideFeet,
    calmRequired: calmMatch,
    sourceAvailable: true
  };
}

function getLawsonsClammingBaseline() {
  return {
    status: "Lawson guidance baseline",
    detail: "Lawson's Landing baseline applied from its clamming page: mudflats expose at 0.5 ft or lower, daylight is required, and calm wind/surf matters.",
    tideThresholdFeet: missionConfig.clamming.thresholds.maxTideFeet,
    calmRequired: true,
    sourceAvailable: false
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

function normalizeOpenMeteoWindHours(hourly) {
  return (hourly.time || []).map((time, index) => ({
    startTime: time,
    windSpeed: Number(hourly.wind_speed_10m?.[index]),
    windDirection: Number(hourly.wind_direction_10m?.[index])
  }));
}

function filterWeekendHours(periods) {
  return periods.filter((period) => {
    const start = new Date(period.startTime);
    return isWeekendDate(start);
  });
}

function isWeekendDate(date) {
  const weekend = getSelectedWeekend();
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
  if (Number.isFinite(value)) return value;
  const numbers = String(value || "").match(/\d+(?:\.\d+)?/g);
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

function formatShortDateTime(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "unknown time";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function evaluateCrabbing({ config, weather, marine, tides, alerts, cdfwCrabStatus }) {
  const weatherMorning = morningHours(weather.periods);
  const marineMorning = morningHours(marine);
  const allWeather = weather.periods;
  const allMarine = marine;

  const maxMorningWind = maxNumber(weatherMorning.map((period) => parseWindMph(period.windSpeed)));
  const maxMorningWave = maxNumber(marineMorning.map((hour) => hour.waveHeight));
  const maxMorningSwellPeriod = maxNumber(marineMorning.map((hour) => hour.swellPeriod || hour.wavePeriod));
  const maxMorningSwellHeight = maxNumber(marineMorning.map((hour) => hour.swellHeight));
  const maxWeekendWave = maxNumber(allMarine.map((hour) => hour.waveHeight));
  const maxWeekendWind = maxNumber(allWeather.map((period) => parseWindMph(period.windSpeed)));
  const hasAdvisory = alerts.length > 0;
  const windows = buildCrabbingMorningWindows({ weather: allWeather, marine: allMarine, config });
  const bestGoWindow = windows.find((window) => window.status === "go");
  const bestMaybeWindow = windows.find((window) => window.status === "maybe");
  const selectedWindow = bestGoWindow || bestMaybeWindow || windows[0] || null;
  const cdfwAllowed = cdfwAllowsCrabbing(cdfwCrabStatus);

  let verdict = "NO GO THIS WEEKEND";
  let bestWindow = "No safe Sat/Sun window found";
  let returnBy = null;

  if (bestGoWindow && !hasAdvisory && cdfwAllowed) {
    verdict = `GO ${bestGoWindow.dayName.toUpperCase()} MORNING`;
    bestWindow = `${bestGoWindow.dayName} 6-11am looks inside the updated 5 ft / 12 mph window`;
    returnBy = "Before late-morning wind builds";
  } else if (bestMaybeWindow && !hasAdvisory && cdfwAllowed) {
    verdict = `MAYBE ${bestMaybeWindow.dayName.toUpperCase()} MORNING`;
    bestWindow = `${bestMaybeWindow.dayName} 6-11am is marginal; recheck same-day`;
    returnBy = "Before late-morning wind builds";
  }

  if (!cdfwAllowed) {
    verdict = "NO GO THIS WEEKEND";
    bestWindow = "No Sat/Sun crab window selected";
    returnBy = null;
  }

  const headlineReason = getCrabbingHeadlineReason({
    cdfwCrabStatus,
    alerts,
    maxMorningWave,
    maxMorningSwellPeriod,
    maxMorningWind,
    selectedWindow
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
      maxMorningSwellHeight,
      maxWeekendWave,
      maxWeekendWind,
      morningWindows: windows,
      selectedWindow,
      alerts,
      windSource: weather.sourceName,
      cdfwCrabStatus
    },
    risks: {
      entryExit: selectedWindow?.status === "go" ? "Within 5 ft limit" : selectedWindow?.status === "maybe" ? "Marginal window" : "High caution",
      windDrift: selectedWindow?.maxWind !== null && selectedWindow?.maxWind <= config.thresholds.go.maxWindMph ? "Lower morning drift" : "Return risk",
      current: "High caution",
      currentDetail: "China Beach sits inside the Golden Gate influence zone; paddle return current remains a standing caution for this launch.",
      confidence: hasAdvisory ? `NWS alert: ${summarizeAlerts(alerts)}` : "Live data loaded"
    },
    reasons: buildCrabbingReasons({
      maxMorningWind,
      maxMorningWave,
      maxMorningSwellPeriod,
      maxMorningSwellHeight,
      maxWeekendWave,
      windows,
      selectedWindow,
      alerts,
      cdfwCrabStatus,
      thresholds: config.thresholds
    }),
    legalReminder: `CDFW check: ${cdfwCrabStatus.status}. Verify license, method, size, bag limit, gear marking, and same-day emergency updates before each trip.`
  };
}

function buildCrabbingMorningWindows({ weather, marine, config }) {
  const weekend = getSelectedWeekend();
  return [weekend.saturday, weekend.sunday]
    .map((date) => {
      const weatherHours = morningHoursForDate(weather, date);
      const marineHours = morningHoursForDate(marine, date);
      const maxWind = maxNumber(weatherHours.map((period) => parseWindMph(period.windSpeed)));
      const maxWave = maxNumber(marineHours.map((hour) => hour.waveHeight));
      const maxSwellPeriod = maxNumber(marineHours.map((hour) => hour.swellPeriod || hour.wavePeriod));
      const maxSwellHeight = maxNumber(marineHours.map((hour) => hour.swellHeight));
      const status = gradeCrabbingWindow({
        maxWind,
        maxWave,
        maxSwellPeriod,
        maxSwellHeight,
        thresholds: config.thresholds
      });

      return {
        date,
        dayName: date.toLocaleDateString(undefined, { weekday: "long" }),
        maxWind,
        maxWave,
        maxSwellPeriod,
        maxSwellHeight,
        status
      };
    })
    .sort((a, b) => getCrabbingWindowRank(b.status) - getCrabbingWindowRank(a.status));
}

function morningHoursForDate(hours, date) {
  return (hours || []).filter((hour) => {
    const start = new Date(hour.startTime);
    const localHour = start.getHours();
    return start.toDateString() === date.toDateString() && localHour >= 6 && localHour <= 11;
  });
}

function gradeCrabbingWindow({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds }) {
  if (!Number.isFinite(maxWind) || !Number.isFinite(maxWave) || !Number.isFinite(maxSwellPeriod)) return "no-go";
  if (passesCrabbingThresholds({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds: thresholds.go })) return "go";
  if (passesCrabbingThresholds({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds: thresholds.maybe })) return "maybe";
  return "no-go";
}

function passesCrabbingThresholds({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds }) {
  const pairedSwellBlock = Number.isFinite(maxSwellHeight)
    && maxSwellHeight > thresholds.maxSwellHeightFeet
    && maxSwellPeriod > thresholds.maxSwellPeriodSeconds;
  return maxWave <= thresholds.maxWaveFeet
    && maxWind <= thresholds.maxWindMph
    && !pairedSwellBlock;
}

function getCrabbingWindowRank(status) {
  if (status === "go") return 2;
  if (status === "maybe") return 1;
  return 0;
}

function cdfwAllowsCrabbing(cdfwCrabStatus) {
  return cdfwCrabStatus.inStatutorySeason
    && cdfwCrabStatus.status !== "Possible health closure"
    && cdfwCrabStatus.status !== "Automatic CDFW check incomplete";
}

function getCrabbingHeadlineReason({ cdfwCrabStatus, alerts, maxMorningWave, maxMorningSwellPeriod, maxMorningWind, selectedWindow }) {
  if (!cdfwCrabStatus.inStatutorySeason) return "CDFW SEASON CLOSED";
  if (cdfwCrabStatus.status === "Possible health closure") return "POSSIBLE CDFW HEALTH CLOSURE";
  if (cdfwCrabStatus.status === "Automatic CDFW check incomplete") return "CDFW STATUS UNVERIFIED";
  if (cdfwCrabStatus.status === "Trap prohibition") return "CRAB TRAP PROHIBITION";
  if (alerts.length) return summarizeAlerts(alerts).toUpperCase();
  if (selectedWindow?.maxWave !== null && selectedWindow?.maxWave > missionConfig.crabbing.thresholds.maybe.maxWaveFeet) return "WAVES ABOVE 6 FT";
  if (selectedWindow?.maxWind !== null && selectedWindow?.maxWind > missionConfig.crabbing.thresholds.maybe.maxWindMph) return "RETURN WIND RISK";
  if (selectedWindow?.maxSwellHeight > missionConfig.crabbing.thresholds.maybe.maxSwellHeightFeet
    && selectedWindow?.maxSwellPeriod > missionConfig.crabbing.thresholds.maybe.maxSwellPeriodSeconds) return "LONG-PERIOD SWELL WITH SIZE";
  if (maxMorningWave !== null && maxMorningWave > missionConfig.crabbing.thresholds.maybe.maxWaveFeet) return "WAVES ABOVE 6 FT";
  if (maxMorningSwellPeriod !== null && maxMorningSwellPeriod > 16) return "LONG-PERIOD SWELL";
  if (maxMorningWind !== null && maxMorningWind > missionConfig.crabbing.thresholds.maybe.maxWindMph) return "RETURN WIND RISK";
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

function buildCrabbingReasons({ maxMorningWind, maxMorningWave, maxMorningSwellPeriod, maxMorningSwellHeight, maxWeekendWave, windows, selectedWindow, alerts, cdfwCrabStatus, thresholds }) {
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
  if (selectedWindow) {
    reasons.push({
      type: selectedWindow.status === "go" ? "good" : selectedWindow.status === "maybe" ? "warn" : "bad",
      text: `Best individual morning is ${selectedWindow.dayName} 6-11am: waves ${formatNumber(selectedWindow.maxWave, " ft")}, wind ${formatNumber(selectedWindow.maxWind, " mph")}, swell ${formatNumber(selectedWindow.maxSwellHeight, " ft")} at ${formatNumber(selectedWindow.maxSwellPeriod, " sec")}.`
    });
  }
  if (windows?.length) {
    reasons.push({
      type: "warn",
      text: `Saturday and Sunday are graded independently now; the app no longer lets one rough morning cancel the other. GO limit is ${formatNumber(thresholds.go.maxWaveFeet, " ft")} waves and ${formatNumber(thresholds.go.maxWindMph, " mph")} wind.`
    });
  }
  reasons.push({
    type: maxMorningWave !== null && maxMorningWave <= thresholds.maybe.maxWaveFeet ? "warn" : "bad",
    text: `Whole-weekend morning max wave height is ${formatNumber(maxMorningWave, " ft")}; this is now context, not the sole decision gate.`
  });
  reasons.push({
    type: Number.isFinite(maxMorningSwellHeight)
      && Number.isFinite(maxMorningSwellPeriod)
      && (maxMorningSwellHeight <= thresholds.go.maxSwellHeightFeet || maxMorningSwellPeriod <= thresholds.go.maxSwellPeriodSeconds)
      ? "warn"
      : "bad",
    text: `Swell reaches ${formatNumber(maxMorningSwellHeight, " ft")} at ${formatNumber(maxMorningSwellPeriod, " sec")}; long period is a hard blocker only when paired with larger swell height.`
  });
  reasons.push({
    type: maxMorningWind !== null && maxMorningWind <= thresholds.maybe.maxWindMph ? "warn" : "bad",
    text: `Hourly wind forecast puts Sat/Sun morning wind up to ${formatNumber(maxMorningWind, " mph")}; return drift matters near the Gate.`
  });
  reasons.push({
    type: "warn",
    text: `Weekend peak wave height is ${formatNumber(maxWeekendWave, " ft")}; recheck Friday evening and before departure.`
  });
  return reasons;
}

function evaluateSpearfishingCandidate(candidate) {
  const thresholds = missionConfig.spearfishing.thresholds;
  const allMarine = candidate.marine;
  const allWeather = candidate.weather.periods;
  const windows = buildSpearfishingMorningWindows({ candidate, weather: allWeather, marine: allMarine, thresholds });
  const selectedWindow = windows.find((window) => window.status === "go")
    || windows.find((window) => window.status === "maybe")
    || windows[0]
    || null;
  const marineMorning = morningHours(allMarine);
  const weatherMorning = morningHours(allWeather);
  const avgMorningWave = selectedWindow?.avgWave ?? averageNumber(marineMorning.map((hour) => hour.waveHeight));
  const maxMorningSwellPeriod = selectedWindow?.maxSwellPeriod ?? maxNumber(marineMorning.map((hour) => hour.swellPeriod || hour.wavePeriod));
  const maxMorningSwellHeight = selectedWindow?.maxSwellHeight ?? maxNumber(marineMorning.map((hour) => hour.swellHeight));
  const maxMorningWind = selectedWindow?.maxWind ?? maxNumber(weatherMorning.map((period) => parseWindMph(period.windSpeed)));
  const hasAdvisory = candidate.alerts.length > 0;
  const physicalScore = selectedWindow?.score ?? 0;
  const physicalBlocker = getSpearfishingPhysicalBlocker({
    selectedWindow,
    thresholds,
    exposure: candidate.exposure
  });
  const resolutionChecklist = buildSpearfishingResolutionChecklist({
    selectedWindow,
    thresholds,
    candidate,
    alerts: candidate.alerts
  });

  let verdict = "NO GO THIS WEEKEND";
  if (!hasAdvisory && selectedWindow?.status === "maybe") verdict = `MAYBE ${selectedWindow.dayName.toUpperCase()} MORNING`;
  if (!hasAdvisory && selectedWindow?.status === "go" && candidate.legalStatus === "Known legal water assumed") verdict = `GO ${selectedWindow.dayName.toUpperCase()} MORNING`;
  const headlineReason = getSpearfishingHeadlineReason({
    hasAdvisory,
    alerts: candidate.alerts,
    avgMorningWave,
    maxMorningWave: selectedWindow?.maxWave,
    maxMorningSwellHeight,
    maxMorningSwellPeriod,
    maxMorningWind,
    exposure: candidate.exposure,
    selectedWindow,
    physicalBlocker
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
    legalMap: candidate.legalMap,
    suitability: candidate.suitability,
    strengths: candidate.strengths,
    risksList: candidate.risks,
    species: candidate.species,
    sourceUrls: candidate.sourceUrls,
    verdict,
    headlineVerdict: verdict.includes("NO GO") ? `NO GO: ${headlineReason}` : verdict,
    headlineReason,
    bestWindow: selectedWindow
      ? `${selectedWindow.dayName} 6-11am ${selectedWindow.status === "go" ? "looks diveable" : selectedWindow.status === "maybe" ? "is marginal" : "does not clear the screen"}`
      : "No Sat/Sun morning window found",
    returnBy: "Before late-morning wind and surge build",
    score: physicalScore,
    risks: {
      surge: describeSurge(selectedWindow?.maxWave ?? avgMorningWave, maxMorningSwellPeriod, candidate.exposure),
      visibility: inferVisibility(avgMorningWave, maxMorningSwellPeriod),
      legal: candidate.legalStatus,
      confidence: hasAdvisory ? `Low: ${summarizeAlerts(candidate.alerts)}` : "Medium condition confidence",
      physical: physicalBlocker.label,
      resolution: resolutionChecklist
    },
    reasons: buildSpearfishingReasons({
      avgMorningWave,
      maxMorningWave: selectedWindow?.maxWave,
      maxMorningSwellHeight,
      maxMorningSwellPeriod,
      maxMorningWind,
      hasAdvisory,
      alerts: candidate.alerts,
      exposure: candidate.exposure,
      selectedWindow,
      thresholds,
      windSource: candidate.weather.sourceName
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
      morningWindows: windows,
      selectedWindow,
      avgMorningWave,
      maxMorningWave: selectedWindow?.maxWave,
      maxMorningSwellHeight,
      maxMorningSwellPeriod,
      maxMorningWind,
      alerts: candidate.alerts,
      windSource: candidate.weather.sourceName,
      legalMap: candidate.legalMap
    },
    physicalBlocker,
    resolutionChecklist
  };
}

function buildSpearfishingMorningWindows({ candidate, weather, marine, thresholds }) {
  const weekend = getSelectedWeekend();
  return [weekend.saturday, weekend.sunday]
    .map((date) => {
      const weatherHours = morningHoursForDate(weather, date);
      const marineHours = morningHoursForDate(marine, date);
      const avgWave = averageNumber(marineHours.map((hour) => hour.waveHeight));
      const maxWave = maxNumber(marineHours.map((hour) => hour.waveHeight));
      const maxSwellPeriod = maxNumber(marineHours.map((hour) => hour.swellPeriod || hour.wavePeriod));
      const maxSwellHeight = maxNumber(marineHours.map((hour) => hour.swellHeight));
      const maxWind = maxNumber(weatherHours.map((period) => parseWindMph(period.windSpeed)));
      const status = gradeSpearfishingWindow({
        maxWind,
        maxWave,
        maxSwellPeriod,
        maxSwellHeight,
        thresholds
      });
      const score = scoreSpearfishingWindow({
        status,
        candidate,
        avgWave,
        maxWave,
        maxSwellPeriod,
        maxSwellHeight,
        maxWind
      });

      return {
        date,
        dayName: date.toLocaleDateString(undefined, { weekday: "long" }),
        avgWave,
        maxWave,
        maxSwellPeriod,
        maxSwellHeight,
        maxWind,
        status,
        score
      };
    })
    .sort((a, b) => b.score - a.score);
}

function gradeSpearfishingWindow({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds }) {
  if (!Number.isFinite(maxWind) || !Number.isFinite(maxWave) || !Number.isFinite(maxSwellPeriod)) return "no-go";
  if (passesSpearfishingThresholds({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds: thresholds.go })) return "go";
  if (passesSpearfishingThresholds({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds: thresholds.maybe })) return "maybe";
  return "no-go";
}

function passesSpearfishingThresholds({ maxWind, maxWave, maxSwellPeriod, maxSwellHeight, thresholds }) {
  const pairedSwellBlock = Number.isFinite(maxSwellHeight)
    && maxSwellHeight > thresholds.maxSwellHeightFeet
    && maxSwellPeriod > thresholds.maxSwellPeriodSeconds;
  return maxWave <= thresholds.maxWaveFeet
    && maxWind <= thresholds.maxWindMph
    && !pairedSwellBlock;
}

function scoreSpearfishingWindow({ status, candidate, avgWave, maxWave, maxSwellPeriod, maxSwellHeight, maxWind }) {
  const statusBase = status === "go" ? 100 : status === "maybe" ? 65 : 20;
  const rankBonus = Math.max(0, 7 - candidate.rank) * 1.8;
  const exposurePenalty = getExposurePenalty(candidate.exposure) * 3;
  const wavePenalty = (avgWave ?? maxWave ?? 8) * 3;
  const windPenalty = (maxWind ?? 18) * 0.8;
  const longSwellPenalty = Number.isFinite(maxSwellHeight)
    && Number.isFinite(maxSwellPeriod)
    && maxSwellHeight > 3
    && maxSwellPeriod > 14
    ? 12
    : 0;
  return statusBase + rankBonus - exposurePenalty - wavePenalty - windPenalty - longSwellPenalty;
}

function getSpearfishingPhysicalBlocker({ selectedWindow, thresholds, exposure }) {
  if (!selectedWindow) {
    return {
      label: "NO FORECAST WINDOW",
      detail: "The app did not receive enough weekend marine and wind data to grade a dive window."
    };
  }

  const issues = [];
  if (!Number.isFinite(selectedWindow.maxWave) || !Number.isFinite(selectedWindow.maxWind) || !Number.isFinite(selectedWindow.maxSwellPeriod)) {
    return {
      label: "FORECAST DATA UNAVAILABLE",
      detail: `${selectedWindow.dayName} 6-11am is outside at least one source forecast horizon, so the app cannot grade waves, wind, and swell for this beach.`
    };
  }
  if (selectedWindow.maxWave > thresholds.go.maxWaveFeet) {
    issues.push({
      label: `WAVES ${formatNumber(selectedWindow.maxWave, " ft")} > ${formatNumber(thresholds.go.maxWaveFeet, " ft")} GO LIMIT`,
      severity: selectedWindow.maxWave > thresholds.maybe.maxWaveFeet ? 3 : 2
    });
  }
  if (selectedWindow.maxWind > thresholds.go.maxWindMph) {
    issues.push({
      label: `WIND ${formatNumber(selectedWindow.maxWind, " mph")} > ${formatNumber(thresholds.go.maxWindMph, " mph")} GO LIMIT`,
      severity: selectedWindow.maxWind > thresholds.maybe.maxWindMph ? 3 : 2
    });
  }
  if (selectedWindow.maxSwellHeight > thresholds.go.maxSwellHeightFeet
    && selectedWindow.maxSwellPeriod > thresholds.go.maxSwellPeriodSeconds) {
    issues.push({
      label: `SWELL ${formatNumber(selectedWindow.maxSwellHeight, " ft")} AT ${formatNumber(selectedWindow.maxSwellPeriod, " sec")}`,
      severity: selectedWindow.maxSwellHeight > thresholds.maybe.maxSwellHeightFeet
        && selectedWindow.maxSwellPeriod > thresholds.maybe.maxSwellPeriodSeconds ? 3 : 2
    });
  }
  if (exposure === "open coast" && selectedWindow.status !== "go") {
    issues.push({ label: "OPEN-COAST ENTRY EXPOSURE", severity: 1 });
  }

  if (!issues.length) {
    return {
      label: "PHYSICAL WINDOW EXISTS",
      detail: `${selectedWindow.dayName} 6-11am clears waves, wind, and swell checks.`
    };
  }

  issues.sort((a, b) => b.severity - a.severity);
  return {
    label: issues[0].label,
    detail: `${selectedWindow.dayName} 6-11am is the best window found; ${issues.map((issue) => issue.label.toLowerCase()).join("; ")}.`
  };
}

function buildSpearfishingResolutionChecklist({ selectedWindow, thresholds, candidate, alerts }) {
  const items = [];
  if (selectedWindow) {
    items.push(`Target ${selectedWindow.dayName} 6-11am: need max waves <= ${formatNumber(thresholds.go.maxWaveFeet, " ft")} and wind <= ${formatNumber(thresholds.go.maxWindMph, " mph")}.`);
    items.push(`Current best window: waves ${formatNumber(selectedWindow.maxWave, " ft")}, avg waves ${formatNumber(selectedWindow.avgWave, " ft")}, wind ${formatNumber(selectedWindow.maxWind, " mph")}, swell ${formatNumber(selectedWindow.maxSwellHeight, " ft")} at ${formatNumber(selectedWindow.maxSwellPeriod, " sec")}.`);
    items.push(`Long-period swell clears only if swell height is <= ${formatNumber(thresholds.go.maxSwellHeightFeet, " ft")} or period is <= ${formatNumber(thresholds.go.maxSwellPeriodSeconds, " sec")}.`);
  } else {
    items.push("Reload marine and NWS hourly data; no complete Sat/Sun morning window was available.");
  }
  if (alerts.length) {
    items.push(`Resolve NWS alert before GO: ${summarizeAlerts(alerts)}.`);
  }
  items.push(`Confirm actual visibility and entry/exit at ${candidate.spot} day-of; model data does not include local visibility.`);
  items.push("Confirm the exact legal fishing water before entering; this app assumes the chosen spot is legally preselected.");
  return items;
}

function isCdphShellfishClear(cdphStatus) {
  return cdphStatus?.status === "No active Marin/Tomales advisory found";
}

function evaluateClamming({ config, weather, marine, tides, alerts, clammingStatus }) {
  const allWeather = weather.periods;
  const allMarine = marine;
  const lowTideWindows = buildClammingLowTideWindows(tides, clammingStatus.lawsons.tideThresholdFeet || config.thresholds.maxTideFeet);
  const daylightWindows = lowTideWindows.filter((window) => window.isDaylight);
  const bestWindowMatch = daylightWindows[0] || lowTideWindows[0] || null;
  const windowWeather = bestWindowMatch ? getWeatherNearTime(allWeather, bestWindowMatch.time) : [];
  const windowMarine = bestWindowMatch ? getMarineNearTime(allMarine, bestWindowMatch.time) : [];
  const maxWindowWind = maxNumber(windowWeather.map((period) => parseWindMph(period.windSpeed)));
  const maxWindowWave = maxNumber(windowMarine.map((hour) => hour.waveHeight));
  const maxWeekendWind = maxNumber(allWeather.map((period) => parseWindMph(period.windSpeed)));
  const maxWeekendWave = maxNumber(allMarine.map((hour) => hour.waveHeight));
  const hasAdvisory = alerts.length > 0;
  const shellfishBlocked = !isCdphShellfishClear(clammingStatus.cdph);
  const rulesParsed = ["Clam rules parsed", "Clam rules baseline"].includes(clammingStatus.cdfw.status)
    && ["Lawson guidance parsed", "Lawson guidance baseline"].includes(clammingStatus.lawsons.status);
  const hasGoodTide = Boolean(daylightWindows.length);
  const calmEnough = maxWindowWind !== null
    && maxWindowWave !== null
    && maxWindowWind <= config.thresholds.maxWindMph
    && maxWindowWave <= config.thresholds.maxWaveFeet;
  const physicalBlocker = getClammingPhysicalBlocker({
    hasGoodTide,
    bestWindowMatch,
    maxWindowWind,
    maxWindowWave,
    thresholds: config.thresholds
  });
  const resolutionChecklist = buildClammingResolutionChecklist({
    physicalBlocker,
    bestWindowMatch,
    maxWindowWind,
    maxWindowWave,
    clammingStatus,
    alerts,
    thresholds: config.thresholds
  });

  let verdict = "NO GO THIS WEEKEND";
  if (hasGoodTide && calmEnough && !hasAdvisory && !shellfishBlocked && rulesParsed) {
    verdict = "GO FOR LOW TIDE";
  } else if (hasGoodTide && !shellfishBlocked && rulesParsed && !hasAdvisory) {
    verdict = "MAYBE LOW TIDE";
  }

  const headlineReason = getClammingHeadlineReason({
    shellfishBlocked,
    rulesParsed,
    hasGoodTide,
    bestWindowMatch,
    maxWindowWind,
    maxWindowWave,
    alerts,
    physicalBlocker,
    clammingStatus
  });

  return {
    spot: config.spot,
    activity: config.activity,
    question: config.question,
    verdict,
    headlineVerdict: verdict.includes("NO GO") ? `NO GO: ${headlineReason}` : verdict,
    headlineReason,
    bestWindow: bestWindowMatch
      ? `${formatTimeLabel(bestWindowMatch.time)} at ${formatNumber(bestWindowMatch.tideFeet, " ft")}`
      : "No tide at or below 0.5 ft found",
    returnBy: bestWindowMatch
      ? "Leave the flats before the tide refills and before daylight fades"
      : null,
    sourceSummary: {
      tideEvents: tides,
      waveSeries: buildWaveSeries(allMarine),
      windSeries: buildWindSeries(allWeather),
      lowTideWindows,
      daylightWindows,
      maxWindowWind,
      maxWindowWave,
      maxWeekendWind,
      maxWeekendWave,
      alerts,
      windSource: weather.sourceName,
      clammingStatus
    },
    risks: {
      tideAccess: hasGoodTide ? "Exposes mudflats" : "No daylight exposure",
      windMudflat: calmEnough ? "Calm enough window" : "Wind/surf can erase the window",
      shellfishHealth: clammingStatus.cdph.status,
      confidence: hasAdvisory ? `NWS alert: ${summarizeAlerts(alerts)}` : "Live data loaded",
      physical: physicalBlocker.label,
      resolution: resolutionChecklist
    },
    reasons: buildClammingReasons({
      clammingStatus,
      lowTideWindows,
      daylightWindows,
      maxWindowWind,
      maxWindowWave,
      maxWeekendWind,
      maxWeekendWave,
      alerts
    }),
    legalReminder: "Clamming check assumes the user has a valid California fishing license, legal access/parking, separate personal container, and will verify species-specific limits and same-day CDPH shellfish advisories before digging.",
    physicalBlocker,
    resolutionChecklist
  };
}

function buildClammingLowTideWindows(tideEvents, thresholdFeet) {
  return (tideEvents || [])
    .map((event) => ({
      time: new Date(event.t),
      tideFeet: Number(event.v)
    }))
    .filter((event) => !Number.isNaN(event.time.getTime()) && Number.isFinite(event.tideFeet))
    .filter((event) => event.tideFeet <= thresholdFeet)
    .map((event) => ({
      ...event,
      isDaylight: isClammingDaylight(event.time)
    }))
    .sort((a, b) => a.time - b.time);
}

function isClammingDaylight(date) {
  const hour = date.getHours();
  return hour >= 6 && hour <= 20;
}

function getWeatherNearTime(periods, time) {
  const target = new Date(time).getTime();
  return (periods || []).filter((period) => Math.abs(new Date(period.startTime).getTime() - target) <= 2 * 60 * 60 * 1000);
}

function getMarineNearTime(hours, time) {
  const target = new Date(time).getTime();
  return (hours || []).filter((hour) => Math.abs(new Date(hour.startTime).getTime() - target) <= 2 * 60 * 60 * 1000);
}

function getClammingPhysicalBlocker({ hasGoodTide, bestWindowMatch, maxWindowWind, maxWindowWave, thresholds }) {
  if (!bestWindowMatch) {
    return {
      label: "NO LOW TIDE EXPOSURE",
      detail: `No hourly NOAA tide prediction reached ${formatNumber(thresholds.maxTideFeet, " ft")} or lower this weekend.`
    };
  }
  if (!hasGoodTide) {
    return {
      label: "LOW TIDE OUTSIDE DAYLIGHT",
      detail: `${formatTimeLabel(bestWindowMatch.time)} reaches ${formatNumber(bestWindowMatch.tideFeet, " ft")}, but the usable exposure is outside the daylight screen.`
    };
  }
  if (maxWindowWave !== null && maxWindowWave > thresholds.maxWaveFeet) {
    return {
      label: `SURF ${formatNumber(maxWindowWave, " ft")} > ${formatNumber(thresholds.maxWaveFeet, " ft")} LIMIT`,
      detail: `The selected low-tide window has nearby wave height around ${formatNumber(maxWindowWave, " ft")}.`
    };
  }
  if (maxWindowWind !== null && maxWindowWind > thresholds.maxWindMph) {
    return {
      label: `WIND ${formatNumber(maxWindowWind, " mph")} > ${formatNumber(thresholds.maxWindMph, " mph")} LIMIT`,
      detail: `The selected low-tide window has wind around ${formatNumber(maxWindowWind, " mph")}.`
    };
  }
  if (maxWindowWave === null || maxWindowWind === null) {
    return {
      label: "PHYSICAL DATA INCOMPLETE",
      detail: "The app found a tide window, but wind or surf data was missing near that time."
    };
  }
  return {
    label: "PHYSICAL WINDOW EXISTS",
    detail: `${formatTimeLabel(bestWindowMatch.time)} reaches ${formatNumber(bestWindowMatch.tideFeet, " ft")} with wind ${formatNumber(maxWindowWind, " mph")} and surf ${formatNumber(maxWindowWave, " ft")}.`
  };
}

function buildClammingResolutionChecklist({ physicalBlocker, bestWindowMatch, maxWindowWind, maxWindowWave, clammingStatus, alerts, thresholds }) {
  const items = [];
  if (bestWindowMatch) {
    items.push(`Target ${formatTimeLabel(bestWindowMatch.time)}: tide ${formatNumber(bestWindowMatch.tideFeet, " ft")} at NOAA Point Reyes station ${sourceConfig.lawsonsTides.station}.`);
    items.push(`Physical screen needs surf <= ${formatNumber(thresholds.maxWaveFeet, " ft")} and wind <= ${formatNumber(thresholds.maxWindMph, " mph")}; current selected window is surf ${formatNumber(maxWindowWave, " ft")} and wind ${formatNumber(maxWindowWind, " mph")}.`);
  } else {
    items.push(`Need a daylight tide <= ${formatNumber(thresholds.maxTideFeet, " ft")} at NOAA Point Reyes station ${sourceConfig.lawsonsTides.station}.`);
  }
  if (physicalBlocker.label !== "PHYSICAL WINDOW EXISTS") {
    items.push(`Physical blocker to clear: ${physicalBlocker.label}.`);
  }
  if (!isCdphShellfishClear(clammingStatus.cdph)) {
    items.push(`Resolve shellfish health: ${clammingStatus.cdph.detail}`);
  }
  if (!["Clam rules parsed", "Clam rules baseline"].includes(clammingStatus.cdfw.status)) {
    items.push(`Resolve CDFW clam rules: verify daylight hours, gear, species, size, and possession requirements. Current app result: ${clammingStatus.cdfw.status}.`);
  }
  if (!["Lawson guidance parsed", "Lawson guidance baseline"].includes(clammingStatus.lawsons.status)) {
    items.push(`Resolve Lawson's Landing site guidance: verify access, parking, and the 0.5 ft tide exposure guidance. Current app result: ${clammingStatus.lawsons.status}.`);
  }
  if (alerts.length) {
    items.push(`Resolve NWS alert before GO: ${summarizeAlerts(alerts)}.`);
  }
  items.push("Confirm access/parking and bring separate containers/license before digging.");
  return items;
}

function getClammingHeadlineReason({ shellfishBlocked, rulesParsed, hasGoodTide, bestWindowMatch, maxWindowWind, maxWindowWave, alerts, physicalBlocker, clammingStatus }) {
  if (alerts.length) return summarizeAlerts(alerts).toUpperCase();
  if (physicalBlocker?.label && physicalBlocker.label !== "PHYSICAL WINDOW EXISTS") return physicalBlocker.label;
  if (shellfishBlocked) {
    return clammingStatus.cdph.status === "Active CDPH advisory found"
      ? "CDPH ADVISORY FOUND"
      : "CDPH MAP CHECK INCOMPLETE";
  }
  if (!rulesParsed) return "LEGAL/SITE CHECK INCOMPLETE";
  if (!bestWindowMatch) return "NO LOW TIDE EXPOSURE";
  if (!hasGoodTide) return "LOW TIDE OUTSIDE DAYLIGHT";
  if (maxWindowWind !== null && maxWindowWind > missionConfig.clamming.thresholds.maxWindMph) return "WIND TOO HIGH";
  if (maxWindowWave !== null && maxWindowWave > missionConfig.clamming.thresholds.maxWaveFeet) return "SURF TOO HEAVY";
  return "ALL CHECKS CLEAR";
}

function buildClammingReasons({ clammingStatus, lowTideWindows, daylightWindows, maxWindowWind, maxWindowWave, maxWeekendWind, maxWeekendWave, alerts }) {
  const reasons = [];
  const bestWindow = daylightWindows[0] || lowTideWindows[0] || null;
  reasons.push({
    type: daylightWindows.length ? "good" : "bad",
    text: daylightWindows.length
      ? `NOAA tide check found ${daylightWindows.length} daylight hourly prediction(s) at or below ${formatNumber(clammingStatus.lawsons.tideThresholdFeet || 0.5, " ft")}; first is ${formatTimeLabel(bestWindow.time)} at ${formatNumber(bestWindow.tideFeet, " ft")}.`
      : `NOAA tide check found no daylight hourly predictions at or below ${formatNumber(clammingStatus.lawsons.tideThresholdFeet || 0.5, " ft")}.`
  });
  reasons.push({
    type: clammingStatus.lawsons.status === "Lawson guidance parsed" ? "good" : "warn",
    text: clammingStatus.lawsons.detail
  });
  reasons.push({
    type: clammingStatus.cdfw.status === "Clam rules parsed" ? "good" : "warn",
    text: clammingStatus.cdfw.detail
  });
  reasons.push({
    type: clammingStatus.cdph.status === "Active CDPH advisory found" ? "bad" : isCdphShellfishClear(clammingStatus.cdph) ? "good" : "warn",
    text: clammingStatus.cdph.detail
  });
  if (alerts.length) {
    reasons.push({ type: "bad", text: `NWS alert screen returned ${summarizeAlerts(alerts)} for Lawson's Landing.` });
  }
  reasons.push({
    type: maxWindowWind !== null && maxWindowWind <= missionConfig.clamming.thresholds.maxWindMph ? "good" : "bad",
    text: `Wind near the selected low-tide window reaches ${formatNumber(maxWindowWind, " mph")}; Lawson's guidance says calm/no-wind conditions matter.`
  });
  reasons.push({
    type: maxWindowWave !== null && maxWindowWave <= missionConfig.clamming.thresholds.maxWaveFeet ? "good" : "warn",
    text: `Open-Meteo marine forecast has nearby wave height around ${formatNumber(maxWindowWave, " ft")} at the selected window; weekend peak is ${formatNumber(maxWeekendWave, " ft")}.`
  });
  reasons.push({
    type: "warn",
    text: `Weekend peak wind is ${formatNumber(maxWeekendWind, " mph")}; reserve parking/access and recheck CDPH shellfish status day-of.`
  });
  return reasons;
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

function getSpearfishingHeadlineReason({ hasAdvisory, alerts, avgMorningWave, maxMorningWave, maxMorningSwellHeight, maxMorningSwellPeriod, maxMorningWind, exposure, selectedWindow, physicalBlocker }) {
  if (hasAdvisory) return summarizeAlerts(alerts).toUpperCase();
  if (physicalBlocker?.label && physicalBlocker.label !== "PHYSICAL WINDOW EXISTS") return physicalBlocker.label;
  if (!Number.isFinite(maxMorningWave) || !Number.isFinite(maxMorningWind) || !Number.isFinite(maxMorningSwellPeriod)) return "FORECAST DATA UNAVAILABLE";
  if (selectedWindow?.status === "no-go" && maxMorningWave !== null && maxMorningWave > missionConfig.spearfishing.thresholds.maybe.maxWaveFeet) return "WAVES ABOVE 6 FT";
  if (selectedWindow?.status === "no-go" && maxMorningWind !== null && maxMorningWind > missionConfig.spearfishing.thresholds.maybe.maxWindMph) return "WIND CHOP";
  if (maxMorningSwellHeight > missionConfig.spearfishing.thresholds.maybe.maxSwellHeightFeet
    && maxMorningSwellPeriod > missionConfig.spearfishing.thresholds.maybe.maxSwellPeriodSeconds) return "LONG-PERIOD SURGE WITH SIZE";
  if (avgMorningWave !== null && avgMorningWave > missionConfig.spearfishing.thresholds.maybe.maxWaveFeet) return "HIGH ENTRY SURGE";
  if (exposure === "open coast") return "OPEN-COAST EXPOSURE";
  return "NO SPECIFIC PHYSICAL BLOCKER FOUND";
}

function describeSurge(waveHeight, swellPeriod, exposure) {
  if (!Number.isFinite(waveHeight) || !Number.isFinite(swellPeriod)) return "Surge unknown";
  const exposed = exposure === "open coast" || exposure === "partial shelter";
  if (waveHeight <= 3 && swellPeriod <= 12 && !exposed) return "Lower surge";
  if (waveHeight <= 5 && swellPeriod <= 14) return "Moderate surge";
  return "High surge";
}

function inferVisibility(waveHeight, swellPeriod) {
  if (!Number.isFinite(waveHeight) || !Number.isFinite(swellPeriod)) return "Unknown";
  if (waveHeight <= 3 && swellPeriod <= 12) return "Probably better, unverified";
  if (waveHeight <= 5) return "Uncertain";
  return "Likely poor";
}

function buildSpearfishingReasons({ avgMorningWave, maxMorningWave, maxMorningSwellHeight, maxMorningSwellPeriod, maxMorningWind, hasAdvisory, alerts, exposure, selectedWindow, thresholds, windSource }) {
  const reasons = [];
  if (hasAdvisory) {
    reasons.push({ type: "bad", text: `NWS alert found near this candidate: ${summarizeAlerts(alerts)}.` });
  }
  if (selectedWindow) {
    reasons.push({
      type: selectedWindow.status === "go" ? "good" : selectedWindow.status === "maybe" ? "warn" : "bad",
      text: `Best individual morning is ${selectedWindow.dayName} 6-11am: max waves ${formatNumber(selectedWindow.maxWave, " ft")}, avg waves ${formatNumber(selectedWindow.avgWave, " ft")}, wind ${formatNumber(selectedWindow.maxWind, " mph")}, swell ${formatNumber(selectedWindow.maxSwellHeight, " ft")} at ${formatNumber(selectedWindow.maxSwellPeriod, " sec")}.`
    });
  }
  reasons.push({
    type: maxMorningWave <= thresholds.go.maxWaveFeet ? "good" : maxMorningWave <= thresholds.maybe.maxWaveFeet ? "warn" : "bad",
    text: `Spearfishing GO screen now allows up to ${formatNumber(thresholds.go.maxWaveFeet, " ft")} max morning waves at protected/legal spots; this selected window is ${formatNumber(maxMorningWave, " ft")}.`
  });
  reasons.push({
    type: Number.isFinite(maxMorningSwellHeight)
      && Number.isFinite(maxMorningSwellPeriod)
      && (maxMorningSwellHeight <= thresholds.go.maxSwellHeightFeet || maxMorningSwellPeriod <= thresholds.go.maxSwellPeriodSeconds)
      ? "warn"
      : "bad",
    text: `Swell reaches ${formatNumber(maxMorningSwellHeight, " ft")} at ${formatNumber(maxMorningSwellPeriod, " sec")}; long period is a hard blocker only when paired with larger swell height.`
  });
  reasons.push({
    type: maxMorningWind <= thresholds.go.maxWindMph ? "good" : maxMorningWind <= thresholds.maybe.maxWindMph ? "warn" : "bad",
    text: `${windSource || "Hourly wind forecast"} reaches ${formatNumber(maxMorningWind, " mph")} during the morning screen.`
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
          <em>${escapeHtml(sourceConfig.ndbc.name)} reference · forecast grid from ${escapeHtml(sourceConfig.marine.name)}</em>
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
          <span>Hourly tide curve</span>
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
          if (event.type !== "H" && event.type !== "L") return "";
          const x = 36 + (index / Math.max(1, events.length - 1)) * 220;
          const y = 100 - ((event.value - minTide) / range) * 76;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" class="${event.type === "H" ? "tide-high-dot" : "tide-low-dot"}"></circle>`;
        }).join("")}
        ${tideTimeLabels}
      </svg>
      <div class="graph-legend">
        <span><i class="legend-tide"></i>Hourly NOAA predictions</span>
        <span><i class="legend-low"></i>Low tide</span>
        <span><i class="legend-high"></i>High tide</span>
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
      <a href="${sourceConfig.lawsonsTides.link}" target="_blank" rel="noreferrer">${sourceConfig.lawsonsTides.name}</a>
      <a href="${sourceConfig.ndbc.link}" target="_blank" rel="noreferrer">${sourceConfig.ndbc.name}</a>
      <a href="${sourceConfig.marine.link}" target="_blank" rel="noreferrer">${sourceConfig.marine.name}</a>
      ${sourceConfig.regulations.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
    </section>
  `;
}

function getWaterSourceMetric(tideSource) {
  return {
    label: "Water data source",
    value: `${sourceConfig.ndbc.station} buoy / ${tideSource.station} tide`,
    detail: `${sourceConfig.ndbc.detail} is shown as the offshore wave reference; hourly tides use ${tideSource.name}. Wave forecasts are pulled from the Open-Meteo marine grid at the selected spot coordinates.`
  };
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

function renderTides(tideEvents, tideSource = sourceConfig.tides) {
  const weekend = getSelectedWeekend();
  if (!tideEvents.length) return "";
  const hourlyEvents = tideEvents
    .map((event) => ({
      time: new Date(event.t),
      value: Number(event.v)
    }))
    .filter((event) => !Number.isNaN(event.time.getTime()) && Number.isFinite(event.value))
    .sort((a, b) => a.time - b.time);
  const saturdayEvents = hourlyEvents.filter((event) => event.time.toDateString() === weekend.saturday.toDateString());
  const sundayEvents = hourlyEvents.filter((event) => event.time.toDateString() === weekend.sunday.toDateString());

  if (!hourlyEvents.length) return "";

  return `
    <section class="hourly-tide-panel">
      <div class="hourly-tide-header">
        <span>Hour-by-hour tides</span>
        <strong>${escapeHtml(tideSource.name)} · Station ${escapeHtml(tideSource.station)} · ft MLLW</strong>
      </div>
      ${renderHourlyTideDay("Saturday", saturdayEvents)}
      ${renderHourlyTideDay("Sunday", sundayEvents)}
    </section>
  `;
}

function renderHourlyTideDay(label, events) {
  if (!events.length) return "";
  const minTide = minNumber(events.map((event) => event.value));
  const maxTide = maxNumber(events.map((event) => event.value));
  return `
    <div class="hourly-tide-day">
      <h3>${escapeHtml(label)}</h3>
      <div class="hourly-tide-grid">
        ${events.map((event) => {
          const tideClass = getHourlyTideHighlightClass(event.value, minTide, maxTide);
          return `
          <div class="hourly-tide-cell ${tideClass}">
            <span>${escapeHtml(event.time.toLocaleTimeString(undefined, { hour: "numeric" }))}</span>
            <strong>${escapeHtml(event.value.toFixed(1))} ft</strong>
          </div>
        `;
        }).join("")}
      </div>
    </div>
  `;
}

function getHourlyTideHighlightClass(value, minTide, maxTide) {
  if (!Number.isFinite(value) || !Number.isFinite(minTide) || !Number.isFinite(maxTide)) return "";
  const range = maxTide - minTide;
  if (range <= 0) return "";
  const band = Math.max(0.35, range * 0.16);
  if (value <= minTide + band) return "tide-low-highlight";
  if (value >= maxTide - band) return "tide-high-highlight";
  return "";
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
      ${renderLegalMapPanel(item.legalMap)}
      ${renderSourceList(item.sourceUrls)}
    </section>
  `;
}

function renderLegalMapPanel(legalMap) {
  if (!legalMap) return "";
  return `
    <div class="legal-map-panel">
      <h3>Official legal maps / charts</h3>
      <p>${escapeHtml(legalMap.detail)}</p>
      ${renderLegalBoundaryMap(legalMap)}
      <div class="legal-map-links">
        <a href="${escapeHtml(legalMap.mapUrl)}" target="_blank" rel="noreferrer">Open CDFW Ocean Sportfishing Map</a>
        <a href="${escapeHtml(legalMap.layerUrl)}" target="_blank" rel="noreferrer">Open CDFW MPA polygon layer</a>
      </div>
      ${legalMap.nearbyMpas?.length ? `
        <div class="mpa-list">
          ${legalMap.nearbyMpas.map((mpa) => `
            <div class="mpa-item">
              <div>
                <strong>${escapeHtml(mpa.shortName)}</strong>
                <span>${escapeHtml(mpa.type)} · ${escapeHtml(mpa.name)}</span>
              </div>
              ${mpa.regulationText ? `<p>${escapeHtml(truncateText(mpa.regulationText, 210))}</p>` : ""}
              <div class="legal-map-links">
                ${mpa.mpaUrl ? `<a href="${escapeHtml(mpa.mpaUrl)}" target="_blank" rel="noreferrer">CDFW MPA page</a>` : ""}
                ${mpa.regulationsUrl ? `<a href="${escapeHtml(mpa.regulationsUrl)}" target="_blank" rel="noreferrer">Regulation text</a>` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function renderLegalBoundaryMap(legalMap) {
  if (legalMap.staticMapUrl) {
    return `
      <figure class="legal-static-map">
        <img src="${escapeHtml(legalMap.staticMapUrl)}" width="1200" height="760" alt="Static geographic map with CDFW MPA polygons overlaid for this spearfishing spot">
        <figcaption>Cached static basemap with CDFW MPA polygons overlaid. Open the official CDFW map below for interactive chart detail.</figcaption>
      </figure>
    `;
  }

  const polygons = (legalMap.nearbyMpas || [])
    .map((mpa, index) => ({
      ...mpa,
      index,
      rings: mpa.geometry?.rings || []
    }))
    .filter((mpa) => mpa.rings.length);
  const spot = legalMap.spot;
  if (!polygons.length || !spot) {
    return `
      <div class="legal-map-empty">
        <strong>No local polygon preview available</strong>
        <span>Open the official CDFW map for full chart detail.</span>
      </div>
    `;
  }

  const bounds = getMapBounds(polygons, spot);
  const paths = polygons.map((mpa) => `
    <g>
      ${mpa.rings.map((ring) => `<polygon points="${ring.map((point) => projectMapPoint(point, bounds)).join(" ")}" class="${getMpaMapClass(mpa.type)}"></polygon>`).join("")}
      ${renderMpaLabel(mpa, bounds)}
    </g>
  `).join("");
  const spotPoint = projectMapPoint([spot.longitude, spot.latitude], bounds);

  return `
    <div class="legal-boundary-map" role="img" aria-label="CDFW MPA boundary map around this spearfishing spot">
      <svg viewBox="0 0 320 210">
        <rect x="0" y="0" width="320" height="210" class="map-water"></rect>
        ${paths}
        <circle cx="${spotPoint.split(",")[0]}" cy="${spotPoint.split(",")[1]}" r="4.8" class="map-spot"></circle>
        <text x="${spotPoint.split(",")[0]}" y="${Math.max(14, Number(spotPoint.split(",")[1]) - 8).toFixed(1)}" class="map-spot-label">spot</text>
      </svg>
      <div class="map-legend">
        <span><i class="legend-smca"></i>SMCA / limited take area</span>
        <span><i class="legend-smr"></i>SMR / no-take reserve</span>
        <span><i class="legend-spot"></i>Spot coordinate</span>
      </div>
    </div>
  `;
}

function getMapBounds(polygons, spot) {
  const points = [[spot.longitude, spot.latitude]];
  polygons.forEach((mpa) => {
    mpa.rings.forEach((ring) => {
      ring.forEach((point) => points.push(point));
    });
  });
  const lons = points.map((point) => Number(point[0])).filter(Number.isFinite);
  const lats = points.map((point) => Number(point[1])).filter(Number.isFinite);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const lonPad = Math.max(0.01, (maxLon - minLon) * 0.12);
  const latPad = Math.max(0.01, (maxLat - minLat) * 0.12);
  return {
    minLon: minLon - lonPad,
    maxLon: maxLon + lonPad,
    minLat: minLat - latPad,
    maxLat: maxLat + latPad
  };
}

function projectMapPoint(point, bounds) {
  const lon = Number(point[0]);
  const lat = Number(point[1]);
  const x = 16 + ((lon - bounds.minLon) / Math.max(0.0001, bounds.maxLon - bounds.minLon)) * 288;
  const y = 194 - ((lat - bounds.minLat) / Math.max(0.0001, bounds.maxLat - bounds.minLat)) * 178;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function renderMpaLabel(mpa, bounds) {
  const firstRing = mpa.rings[0] || [];
  if (!firstRing.length) return "";
  const lon = averageNumber(firstRing.map((point) => Number(point[0])));
  const lat = averageNumber(firstRing.map((point) => Number(point[1])));
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return "";
  const [x, y] = projectMapPoint([lon, lat], bounds).split(",").map(Number);
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" class="map-mpa-label">${escapeHtml(mpa.shortName)}</text>`;
}

function getMpaMapClass(type) {
  return String(type || "").toUpperCase().includes("SMR") ? "map-mpa-smr" : "map-mpa-smca";
}

function truncateText(value, maxLength) {
  const text = String(value || "");
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}...`;
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

function renderDecisionCard({ item, question, extraMetrics = [], legalReminder = "", tideEvents = [], tideSource = sourceConfig.tides }) {
  const headlineVerdict = item.headlineVerdict || item.verdict;
  const headlineReasonLabel = item.verdict.includes("NO GO") ? "Top blocker" : "Decision basis";
  const weekendRange = getSelectedWeekendRange();
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
        ${item.headlineReason ? `<p class="headline-reason">${headlineReasonLabel}: ${escapeHtml(item.headlineReason)}</p>` : ""}
      </div>
      ${renderMetrics(metrics)}
      ${renderConditionGraphs(item, tideEvents)}
      ${renderTides(tideEvents, tideSource)}
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
      tideSource: sourceConfig.tides,
      extraMetrics: [
        getWaterSourceMetric(sourceConfig.tides),
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

function renderClamming() {
  const data = appState.data.clamming;
  const summary = data.sourceSummary;
  return `
    ${renderDecisionCard({
      item: data,
      question: data.question,
      legalReminder: data.legalReminder,
      tideEvents: summary.tideEvents,
      tideSource: sourceConfig.lawsonsTides,
      extraMetrics: [
        getWaterSourceMetric(sourceConfig.lawsonsTides),
        {
          label: "Physical assessment",
          value: data.physicalBlocker.label,
          detail: data.physicalBlocker.detail
        },
        {
          label: "Resolve checklist",
          value: `${data.resolutionChecklist.length} checks`,
          detail: formatChecklist(data.resolutionChecklist)
        },
        {
          label: "Low tide access",
          value: data.risks.tideAccess,
          detail: summary.daylightWindows.length
            ? `${summary.daylightWindows.length} daylight hourly prediction(s) at or below ${formatNumber(summary.clammingStatus.lawsons.tideThresholdFeet || 0.5, " ft")}.`
            : "No daylight hourly prediction met Lawson's 0.5 ft exposure threshold."
        },
        {
          label: "Wind / surf",
          value: data.risks.windMudflat,
          detail: `Selected-window wind ${formatNumber(summary.maxWindowWind, " mph")}; nearby wave height ${formatNumber(summary.maxWindowWave, " ft")}.`
        },
        {
          label: "Shellfish health",
          value: data.risks.shellfishHealth,
          detail: summary.clammingStatus.cdph.detail
        },
        {
          label: "CDFW / site rules",
          value: summary.clammingStatus.cdfw.status,
          detail: `${summary.clammingStatus.cdfw.detail} ${summary.clammingStatus.lawsons.detail}`
        },
        {
          label: "Confidence",
          value: data.risks.confidence,
          detail: summary.alerts.length
            ? `The NWS alert check independently returned ${summarizeAlerts(summary.alerts)} for the area.`
            : "NOAA tide, NWS wind/alerts, Open-Meteo marine, CDFW, CDPH, and Lawson source checks returned for this card."
        }
      ]
    })}
    ${renderSourceLinks()}
  `;
}

function getSpearfishingMetrics(item) {
  return [
    getWaterSourceMetric(sourceConfig.tides),
    {
      label: "Physical assessment",
      value: item.physicalBlocker.label,
      detail: item.physicalBlocker.detail
    },
    {
      label: "Resolve checklist",
      value: `${item.resolutionChecklist.length} checks`,
      detail: formatChecklist(item.resolutionChecklist)
    },
    {
      label: "Region / drive",
      value: `${item.region} · ${item.driveHours} hr from SF`,
      detail: `${formatAccessType(item.accessType)} access; best for ${item.suitability}.`
    },
    {
      label: "Surge risk",
      value: item.risks.surge,
      detail: `Selected morning: max waves ${formatNumber(item.sourceSummary.maxMorningWave, " ft")}, avg waves ${formatNumber(item.sourceSummary.avgMorningWave, " ft")}, swell period ${formatNumber(item.sourceSummary.maxMorningSwellPeriod, " sec")}.`
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
        : `Wind source: ${item.sourceSummary.windSource || "unknown"}; legal fishing water is treated as preselected for this spot.`
    }
  ];
}

function formatChecklist(items = []) {
  return items.map((item, index) => `${index + 1}. ${item}`).join(" ");
}

function getSpearfishingOptions() {
  const spearfishing = appState.data?.spearfishing;
  return spearfishing?.options || [
    spearfishing?.topOption,
    ...(spearfishing?.moreOptions || [])
  ].filter(Boolean);
}

function clampSpearfishingIndex() {
  const options = getSpearfishingOptions();
  appState.spearfishingIndex = Math.max(0, Math.min(appState.spearfishingIndex, Math.max(0, options.length - 1)));
}

function setSpearfishingIndex(index) {
  const options = getSpearfishingOptions();
  if (!options.length) return;
  appState.spearfishingIndex = (index + options.length) % options.length;
  render();
}

function renderSpearfishingSelector(options, selectedIndex) {
  if (!options.length) return "";
  const item = options[selectedIndex];
  return `
    <div class="beach-selector" aria-label="Spearfishing beach selector">
      <button class="beach-nav-button" type="button" data-spearfishing-nav="-1" aria-label="Previous ranked beach">‹</button>
      <div class="beach-selector-current">
        <span>Ranked ${selectedIndex + 1} of ${options.length} by likelihood</span>
        <strong>${escapeHtml(item.spot)}</strong>
        <p>${escapeHtml(item.verdict)} · ${escapeHtml(item.headlineReason)}</p>
      </div>
      <button class="beach-nav-button" type="button" data-spearfishing-nav="1" aria-label="Next ranked beach">›</button>
    </div>
  `;
}

function renderSpearfishing() {
  const data = appState.data.spearfishing;
  const options = getSpearfishingOptions();
  clampSpearfishingIndex();
  const item = options[appState.spearfishingIndex] || data.topOption;
  return `
    ${renderSpearfishingSelector(options, appState.spearfishingIndex)}
    ${renderDecisionCard({
      item,
      question: data.question,
      extraMetrics: getSpearfishingMetrics(item)
    })}
    ${renderSourceLinks()}
  `;
}

function renderActiveMode() {
  if (!appState.data?.[appState.activeMode]) return renderModeLoading(appState.activeMode);
  if (appState.activeMode === "crabbing") return renderCrabbing();
  if (appState.activeMode === "spearfishing") return renderSpearfishing();
  if (appState.activeMode === "clamming") return renderClamming();
  return renderCrabbing();
}

function renderModeLoading(mode) {
  const labels = {
    crabbing: "Crabbing",
    spearfishing: "Spearfishing",
    clamming: "Clamming"
  };
  const status = appState.modeStatus[mode] || "loading";
  const error = appState.modeErrors[mode];
  const queueDetail = mode === "crabbing"
    ? "Loading the default crabbing card first."
    : `${labels.crabbing} loads first; ${labels[mode]} is queued behind it.`;
  if (status === "error") {
    return `
      <article class="decision-card">
        <div class="card-top">
          <div class="meta-row"><span>${escapeHtml(labels[mode])}</span><span>${escapeHtml(getSelectedWeekendRange())}</span></div>
          <h2 class="spot-title">${escapeHtml(labels[mode])} data unavailable</h2>
          <p>${escapeHtml(error || "This activity could not finish its live source checks.")}</p>
          <span class="verdict-pill verdict-no-go">NO DATA - NO GO</span>
        </div>
        ${renderSourceLinks()}
      </article>
    `;
  }
  return `
    <article class="decision-card">
      <div class="card-top">
        <div class="meta-row"><span>${escapeHtml(labels[mode])}</span><span>${escapeHtml(getSelectedWeekendRange())}</span></div>
        <h2 class="spot-title">Loading ${escapeHtml(labels[mode])}</h2>
        <p>${escapeHtml(queueDetail)}</p>
        <span class="verdict-pill verdict-maybe">CHECKING LIVE SOURCES</span>
      </div>
      ${renderMetrics([
        { label: "Queue", value: mode === "crabbing" ? "First" : "Pending" },
        { label: "Cache", value: appState.cache.detail || "Checking source cache" }
      ])}
    </article>
  `;
}

function renderLoading() {
  const weekendRange = getSelectedWeekendRange();
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
  const weekendRange = getSelectedWeekendRange();
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
  const weekendRange = getSelectedWeekendRange();
  let title = "Launch Window";
  let verdict = appState.status === "loading" ? "Checking sources" : "NO DATA - NO GO";
  let detail = `Upcoming weekend: ${weekendRange}`;

  if ((appState.status === "ready" || appState.status === "partial") && appState.data?.[appState.activeMode]) {
    const item = appState.activeMode === "crabbing"
      ? appState.data.crabbing
      : appState.activeMode === "clamming"
        ? appState.data.clamming
        : getSpearfishingOptions()[appState.spearfishingIndex] || appState.data.spearfishing.topOption;
    const modeLabel = appState.activeMode === "crabbing"
      ? "Crabbing"
      : appState.activeMode === "clamming"
        ? "Clamming"
        : "Spearfishing";
    title = `${modeLabel} · ${item.spot}`;
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
  const weekendRange = getSelectedWeekendRange();
  document.querySelectorAll("[data-weekend-range]").forEach((element) => {
    element.textContent = weekendRange;
  });
  renderWeekendStepper();
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
    content.innerHTML = renderActiveMode();
  }

  renderLockPreview();
}

function renderWeekendStepper() {
  const label = document.querySelector("[data-weekend-choice]");
  if (!label) return;
  const weekendLabel = getSelectedWeekendRange();
  label.textContent = appState.weekendOffset === 0
    ? `This weekend: ${weekendLabel}`
    : `+${appState.weekendOffset} week${appState.weekendOffset === 1 ? "" : "s"}: ${weekendLabel}`;
  document.querySelectorAll("[data-weekend-nav]").forEach((button) => {
    const direction = Number(button.dataset.weekendNav);
    button.disabled = direction < 0
      ? appState.weekendOffset <= 0
      : appState.weekendOffset >= MAX_WEEKEND_OFFSET;
  });
}

function reloadSelectedWeekend({ forceRefresh = false } = {}) {
  const generation = appState.loadGeneration + 1;
  appState.loadGeneration = generation;
  appState.status = "loading";
  appState.error = "";
  appState.data = null;
  appState.spearfishingIndex = 0;
  resetModeStatuses("loading");
  resetServerCacheStats();
  render();

  const cached = getCachedWeekendData({ forceRefresh });
  if (cached) {
    appState.status = "ready";
    appState.data = cached.data;
    appState.cache = cached.cache;
    resetModeStatuses("ready");
    clampSpearfishingIndex();
    render();
    return;
  }

  appState.status = "partial";
  appState.data = makeEmptyWeekendData();
  appState.cache = {
    ...appState.cache,
    detail: "Loading crabbing first; other activities are queued"
  };
  render();

  loadWeekendProgressively(generation);
}

async function loadWeekendProgressively(generation) {
  const setActivityData = (mode, data) => {
    if (generation !== appState.loadGeneration) return false;
    appState.data[mode] = data;
    appState.modeStatus[mode] = "ready";
    appState.modeErrors[mode] = "";
    if (mode === "spearfishing") clampSpearfishingIndex();
    render();
    return true;
  };

  const setActivityError = (mode, error) => {
    if (generation !== appState.loadGeneration) return false;
    appState.modeStatus[mode] = "error";
    appState.modeErrors[mode] = error.message;
    render();
    return true;
  };

  try {
    const crabbingData = await loadCrabbingData();
    if (!setActivityData("crabbing", crabbingData)) return;
    appState.cache.detail = "Crabbing ready; loading spearfishing next";
    render();
  } catch (error) {
    setActivityError("crabbing", error);
  }

  try {
    const spearfishingData = await loadSpearfishingData();
    if (!setActivityData("spearfishing", spearfishingData)) return;
    appState.cache.detail = "Spearfishing ready; loading clamming next";
    render();
  } catch (error) {
    setActivityError("spearfishing", error);
  }

  try {
    const clammingData = await loadClammingData();
    if (!setActivityData("clamming", clammingData)) return;
  } catch (error) {
    setActivityError("clamming", error);
  }

  if (generation !== appState.loadGeneration) return;
  summarizeServerCacheStats();
  const hasErrors = Object.values(appState.modeStatus).some((status) => status === "error");
  appState.status = hasErrors ? "partial" : "ready";
  appState.cache = {
    status: hasErrors ? "partial" : "fresh",
    detail: hasErrors
      ? `Some checks failed; ${appState.cache.detail}`
      : `Browser cache refreshed at ${formatCacheTime(new Date().toISOString())}; ${appState.cache.detail.toLowerCase()}`
  };
  if (!hasErrors) writeCachedData(getCacheKey(), appState.data);
  render();
}

document.querySelector(".mode-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  appState.activeMode = button.dataset.mode;
  render();
});

document.querySelector(".weekend-stepper").addEventListener("click", (event) => {
  const button = event.target.closest("[data-weekend-nav]");
  if (!button || button.disabled) return;
  appState.weekendOffset = Math.max(0, Math.min(MAX_WEEKEND_OFFSET, appState.weekendOffset + Number(button.dataset.weekendNav)));
  reloadSelectedWeekend();
});

document.querySelector("#mode-content").addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-spearfishing-nav]");
  if (navButton) {
    const direction = Number(navButton.dataset.spearfishingNav);
    setSpearfishingIndex(appState.spearfishingIndex + direction);
    return;
  }
});

render();
reloadSelectedWeekend();
