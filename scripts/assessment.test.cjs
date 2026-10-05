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
  const run = app();
  run(`var wind = Array.from({length:6}, (_,i)=>({startTime:'2026-11-07T'+String(i+6).padStart(2,'0')+':00',windSpeed:8})); var waves = wind.map(row=>({...row,waveHeight:3,swellHeight:2,swellPeriod:10}));`);
  assert.equal(run("hasCompleteMorning(wind, waves)"), true);
  assert.equal(run("hasCompleteMorning(wind.slice(0,1), waves)"), false);
  assert.equal(run("buildCrabbingMorningWindows({weather:wind.slice(0,1),marine:waves,config:missionConfig.crabbing})[0].status"), "no-go");
  assert.equal(run("buildCrabbingMorningWindows({weather:wind,marine:waves,config:missionConfig.crabbing})[0].status"), "go");
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
