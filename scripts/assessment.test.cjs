const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(require.resolve("../script.js"), "utf8").split('document.querySelector(".mode-tabs").addEventListener')[0];
function app() {
  const context = vm.createContext({ console, URLSearchParams, Date, Intl });
  vm.runInContext(source, context);
  vm.runInContext('getSelectedWeekend = () => ({ saturday: new Date(2026, 10, 7), sunday: new Date(2026, 10, 8) })', context);
  return (code) => vm.runInContext(code, context);
}

// Synthetic boundary cases are isolated to tests; the application uses live sources.
function crabScenario() {
  const run = app();
  run(`
    var weather = { sourceName: 'Test wind', periods: [] };
    var marine = [];
    for (const day of [7, 8]) for (let hour = 6; hour <= 11; hour++) {
      const startTime = '2026-11-' + String(day).padStart(2, '0') + 'T' + String(hour).padStart(2, '0') + ':00';
      weather.periods.push({ startTime, windSpeed: 8 });
      marine.push({ startTime, waveHeight: 3, swellHeight: 2, swellPeriod: 10, wavePeriod: 10 });
    }
    var cdfw = {
      inStatutorySeason: true, status: 'Season appears open, subject to method and day-of checks',
      rampZone: '4', statutorySeason: { label: 'Test season' },
      health: { status: 'No toxin closure found', sourceAvailable: true, detail: 'Test health' },
      whaleSafe: { status: 'Open to all permitted methods', sourceAvailable: true, detail: 'Test status' }
    };
    var alerts = [];
    var daylight = [7,8].map(day => ({day:'2026-11-0'+day,sunrise:'2026-11-0'+day+'T06:00',sunset:'2026-11-0'+day+'T17:00'}));
    fetchDaylight = async () => daylight;
    var decide = () => evaluateCrabbing({config: missionConfig.crabbing, weather, marine, tides: [], alerts, cdfwCrabStatus: cdfw, daylight});
  `);
  return run;
}

test("a GO Saturday never cites Sunday's waves as its blocker", () => {
  const run = crabScenario();
  run("marine.slice(6).forEach(hour => hour.waveHeight = 12)");
  assert.equal(run("decide().verdict"), "GO SATURDAY MORNING");
  assert.equal(run("decide().headlineReason"), "WAVES, WIND AND SWELL WITHIN GO LIMITS");
});

test("a good Sunday survives Saturday weather and an overlapping Saturday warning", () => {
  const run = crabScenario();
  run(`marine.slice(0, 6).forEach(hour => hour.waveHeight = 12);
    alerts = [{ event: 'Gale Warning', onset: '2026-11-07T06:00:00-08:00', expires: '2026-11-07T12:00:00-08:00' }];`);
  assert.equal(run("decide().verdict"), "GO SUNDAY MORNING");
  assert.equal(run("decide().headlineReason"), "WAVES, WIND AND SWELL WITHIN GO LIMITS");
});

test("swell height and period must exceed their paired limits at the same hour", () => {
  const run = crabScenario();
  run(`marine.forEach((hour, i) => { hour.waveHeight = 5; hour.swellHeight = i % 2 ? 1 : 4.5; hour.swellPeriod = i % 2 ? 18 : 10; });`);
  assert.equal(run("decide().verdict"), "GO SATURDAY MORNING");
  run("marine[0].swellPeriod = 18; marine[6].swellPeriod = 18");
  assert.match(run("decide().verdict"), /NO GO/);
});

test("full assessment honors all legal blockers even in calm conditions", () => {
  for (const status of ['Trap prohibition', 'Possible health closure', 'CDFW recreational season closed', 'Automatic CDFW check incomplete']) {
    const run = crabScenario();
    run(`cdfw.status = ${JSON.stringify(status)}`);
    assert.match(run("decide().verdict"), /NO GO/);
  }
});

test("a partial forecast cannot yield GO, even with calm maxima", () => {
  const run = crabScenario();
  run("marine = [marine[0], marine[6]]");
  assert.equal(run("decide().verdict"), "PENDING FORECAST");
});

test("each failed source preserves other checks and cannot authorize GO", async () => {
  for (const failed of ['fetchTides', 'fetchNwsWeather', 'fetchMarineForecast', 'fetchAlerts', 'fetchDaylight']) {
    const run = crabScenario();
    run(`fetchTides = async () => [{t:'2026-11-07 09:00',v:'1.2'}];
      fetchNwsWeather = async () => weather;
      fetchMarineForecast = async () => marine;
      fetchAlerts = async () => [];
      fetchCdfwCrabStatus = async () => cdfw;
      ${failed} = async () => { throw new Error('Upstream 503'); };`);
    const decision = await run('loadCrabbingData()');
    assert.equal(decision.verdict, 'PENDING CHECKS', failed);
    assert.equal(decision.sourceSummary.sourceChecks.filter(check => !check.available).length, 1);
    assert.equal(decision.risks.confidence, 'Required checks incomplete');
    assert.equal(decision.returnBy, null);
    if (failed !== 'fetchMarineForecast') assert.ok(decision.sourceSummary.waveSeries.length);
    if (failed !== 'fetchTides') assert.equal(decision.sourceSummary.tideEvents.length, 1);
  }
});

test("missing hazard check cannot conceal a known physical blocker", async () => {
  const run = crabScenario();
  run(`marine.forEach(hour => hour.waveHeight = 12);
    fetchTides = async () => [{t:'2026-11-07 09:00',v:'1.2'}];
    fetchNwsWeather = async () => weather;
    fetchMarineForecast = async () => marine;
    fetchAlerts = async () => {throw new Error('Upstream 503');};
    fetchCdfwCrabStatus = async () => cdfw;`);
  const decision = await run('loadCrabbingData()');
  assert.equal(decision.verdict, 'NO GO THIS WEEKEND');
  assert.match(decision.headlineReason, /WAVES 12 FT/);
  assert.equal(decision.risks.confidence, 'Required checks incomplete');
});

test("NWS response errors are not interpreted as zero hazards", async () => {
  for (const response of [{}, {error: 'unavailable'}, {features: null}, {features: [{}]}]) {
    const run = app();
    run(`fetchJson = async () => (${JSON.stringify(response)})`);
    await assert.rejects(run('fetchAlerts(missionConfig.crabbing.coords)'), /invalid alert response/);
  }
  const run = app();
  run('fetchJson = async () => ({features: []})');
  assert.equal((await run('fetchAlerts(missionConfig.crabbing.coords)')).length, 0);
});

test("empty successful feeds also withhold GO without discarding measurements", async () => {
  const run = crabScenario();
  run(`fetchTides = async () => [];
    fetchNwsWeather = async () => weather;
    fetchMarineForecast = async () => marine;
    fetchAlerts = async () => [];
    fetchCdfwCrabStatus = async () => cdfw;`);
  const decision = await run('loadCrabbingData()');
  assert.equal(decision.verdict, 'PENDING CHECKS');
  assert.match(decision.headlineReason, /NOAA TIDE PREDICTIONS UNAVAILABLE/);
  assert.ok(decision.sourceSummary.waveSeries.length);
});

test("full decision matrix agrees with the configured wave and wind boundaries", () => {
  const run = crabScenario();
  for (const wave of [0, 3, 5, 5.01, 6, 6.01, 12]) {
    for (const wind of [0, 8, 12, 12.01, 14, 14.01, 25]) {
      run(`marine.forEach(hour => hour.waveHeight = ${wave}); weather.periods.forEach(hour => hour.windSpeed = ${wind});`);
      const expected = wave <= 5 && wind <= 12 ? "GO SATURDAY MORNING"
        : wave <= 6 && wind <= 14 ? "MAYBE SATURDAY MORNING" : "NO GO THIS WEEKEND";
      assert.equal(run("decide().verdict"), expected, `wave=${wave}, wind=${wind}`);
    }
  }
});

test("every weekend of the 2026-27 season respects the official calendar boundaries", () => {
  const run = crabScenario();
  for (let day = new Date(2026, 9, 3); day <= new Date(2027, 7, 7); day.setDate(day.getDate() + 7)) {
    run(`getSelectedWeekend = () => ({saturday:new Date(${day.getFullYear()},${day.getMonth()},${day.getDate()}), sunday:new Date(${day.getFullYear()},${day.getMonth()},${day.getDate()+1})})`);
    const actual = run("buildCrabbingMorningWindows({weather:[],marine:[],config:missionConfig.crabbing}).map(window => window.legalDay)");
    const sunday = new Date(day); sunday.setDate(sunday.getDate() + 1);
    const expected = [day, sunday].map(date => date >= new Date(2026, 10, 7) && date <= new Date(2027, 5, 30, 23, 59, 59));
    assert.deepEqual(Array.from(actual), expected, day.toISOString());
  }
});

test("2026 opener is November 7, including October previews", () => {
  const run = app();
  for (const month of [9, 10]) {
    assert.equal(run(`toIsoDate(getCdfwDungenessSeasonWindow(new Date(2026, ${month}, 1), 'all other counties').start)`), "2026-11-07");
  }
  assert.equal(run("getCdfwDungenessSeasonWindow(new Date(2026, 0, 1), 'all other counties').end.getFullYear()"), 2026);
});

test("missing marine and wind values stay missing", () => {
  const run = app();
  assert.equal(run("normalizeMarineHours({time:['2026-11-07T06:00'],wave_height:[null]})[0].waveHeight"), null);
  assert.equal(run("normalizeOpenMeteoWindHours({time:['2026-11-07T06:00'],wind_speed_10m:[null]})[0].windSpeed"), null);
  assert.equal(run("gradeCrabbingWindow({maxWave:0,maxWind:0,maxSwellPeriod:0,maxSwellHeight:null,thresholds:missionConfig.crabbing.thresholds})"), "no-go");
});

test("CDFW zones cannot borrow neighboring open status", () => {
  const run = app();
  assert.equal(run(`parseCdfwWhaleSafeStatus('Recreational Fishery: Fishing Zone 4: Season Closed Fishing Zone 5: Open to all permitted methods Risk Assessment and Mitigation Program', '4').status`), "Season closed");
  assert.equal(run(`parseCdfwWhaleSafeStatus('Recreational Fishery: Fishing Zones 3-5: Crab Trap Prohibition Risk Assessment and Mitigation Program', '4').status`), "Crab trap prohibition");
  assert.equal(run(`parseCdfwWhaleSafeStatus('Recreational Fishery: Fishing Zone 5: Open to all permitted methods Risk Assessment and Mitigation Program', '4').status`), "Unparsed");
  assert.equal(run(`parseCdfwWhaleSafeStatus('Recreational Fishery: Fishing Zones 1, 2, and 3: Open to all permitted methods Risk Assessment and Mitigation Program', '4').status`), "Unparsed");
  assert.equal(run(`parseCdfwWhaleSafeStatus('Recreational Fishery: Fishing Zones 1\u20133: Open to all permitted methods Risk Assessment and Mitigation Program', '4').status`), "Unparsed");
  assert.equal(run(`parseCdfwWhaleSafeStatus('Recreational Fishery: Season is closed Risk Assessment and Mitigation Program Fishing Zone 4: Open to all permitted methods', '4').status`), "Season closed");
});

test("trap prohibition and unknown health never authorize generic GO", () => {
  const run = app();
  assert.equal(run("cdfwAllowsCrabbing({inStatutorySeason:true,status:'Trap prohibition'})"), false);
  assert.equal(run("getCdfwCombinedStatus({inStatutorySeason:true,health:{sourceAvailable:false},whaleSafe:{status:'Crab trap prohibition',sourceAvailable:true}})"), "Automatic CDFW check incomplete");
});

test("only six aligned morning hours can produce GO", () => {
  const run = crabScenario();
  run(`var wind = Array.from({length:6}, (_,i)=>({startTime:'2026-11-07T'+String(i+6).padStart(2,'0')+':00',windSpeed:8})); var waves = wind.map(row=>({...row,waveHeight:3,swellHeight:2,swellPeriod:10}));`);
  assert.equal(run("hasCompleteMorning(wind, waves)"), true);
  assert.equal(run("hasCompleteMorning(wind.slice(0,1), waves)"), false);
  assert.equal(run("buildCrabbingMorningWindows({weather:wind.slice(0,1),marine:waves,config:missionConfig.crabbing})[0].status"), "no-go");
  assert.equal(run("buildCrabbingMorningWindows({weather:wind,marine:waves,config:missionConfig.crabbing,daylight})[0].status"), "go");
});

test("winter windows start after sunrise and do not grade pre-dawn waves", () => {
  const run = crabScenario();
  run(`daylight.forEach(row => row.sunrise = row.day+'T07:24');
    marine.forEach(row => {if (new Date(row.startTime).getHours() < 8) row.waveHeight = 12;});`);
  assert.equal(run('decide().verdict'), 'GO SATURDAY MORNING');
  assert.match(run('decide().bestWindow'), /8-11am Pacific/);
  assert.match(run('decide().returnBy'), /11am Pacific/);
  run("marine = marine.filter(row => new Date(row.startTime).getHours() !== 9)");
  assert.equal(run('decide().verdict'), 'PENDING FORECAST');
});

test("missing or invalid daylight never authorizes crabbing GO", () => {
  for (const change of ['daylight=[]', "daylight.forEach(row => row.sunrise='invalid')", "daylight.forEach(row => row.sunrise=row.day+'T10:30')"]) {
    const run = crabScenario();
    run(change);
    assert.equal(run('decide().verdict'), 'PENDING FORECAST');
  }
});

test("expired or irrelevant alerts do not veto the weekend", () => {
  const run = app();
  assert.equal(run("isRelevantWeekendAlert({event:'Gale Warning',effective:'2026-11-05T00:00:00-08:00',expires:'2026-11-06T00:00:00-08:00'})"), false);
  assert.equal(run("isRelevantWeekendAlert({event:'Air Quality Alert',effective:'2026-11-07T00:00:00-08:00',expires:'2026-11-09T00:00:00-08:00'})"), false);
  assert.equal(run("isRelevantWeekendAlert({event:'Gale Warning',effective:'2026-11-07T00:00:00-08:00',expires:'2026-11-09T00:00:00-08:00'})"), true);
  assert.equal(run("alertsForMorning([{onset:'2026-11-07T06:00:00-08:00',expires:'2026-11-07T12:00:00-08:00'}],new Date(2026,10,8)).length"), 0);
});

test("California time is independent of browser timezone", () => {
  const run = app();
  assert.equal(run("pacificWallTime('2026-11-08T15:00:00Z').getHours()"), 7);
  assert.equal(run("pacificWallTime('2026-10-10T15:00:00Z').getHours()"), 8);
});

test("clamming uses real sunrise/sunset rather than fixed 6am-8pm", () => {
  const run = app();
  run("var daylight = [{day:'2026-11-07',sunrise:'2026-11-07T06:45',sunset:'2026-11-07T17:05'}]");
  assert.equal(run("isClammingDaylight(new Date(2026,10,7,6),daylight)"), false);
  assert.equal(run("isClammingDaylight(new Date(2026,10,7,12),daylight)"), true);
  assert.equal(run("isClammingDaylight(new Date(2026,10,7,19),daylight)"), false);
  assert.equal(run("isClammingDaylight(new Date(2026,10,7,12),[])"), false);
});

test("chart positions use actual time instead of stretching partial forecasts", () => {
  assert.equal(app()("chartTimeX('2026-11-08T00:00',220)"), 146);
});
