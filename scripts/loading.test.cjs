const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../script.js'), 'utf8').split('document.querySelector(".mode-tabs").addEventListener')[0];

function harness() {
  const context = vm.createContext({ console, URLSearchParams, Date, Intl });
  const run = code => vm.runInContext(code, context);
  run(source);
  run(`
    var calls = [], pending = [], saved = [];
    render = () => {};
    clampSpearfishingIndex = () => {};
    summarizeServerCacheStats = () => {};
    writeCachedData = (key, data) => saved.push({key, data});
    getCachedWeekendData = () => null;
    var defer = mode => { calls.push(mode); return new Promise((resolve,reject) => pending.push({mode,resolve,reject})); };
    loadCrabbingData = () => defer('crabbing');
    loadSpearfishingData = () => defer('spearfishing');
    loadClammingData = () => defer('clamming');
    appState.loadGeneration = 1;
    appState.data = makeEmptyWeekendData();
  `);
  return run;
}

test('crabbing becomes available before sequential background activities finish', async () => {
  const run = harness();
  const work = run('loadWeekendProgressively(1)');
  assert.equal(run('calls.join()'), 'crabbing');
  run("pending.shift().resolve({tag:'crab'})");
  await Promise.resolve();
  assert.equal(run('appState.data.crabbing.tag'), 'crab');
  assert.equal(run('appState.modeStatus.crabbing'), 'ready');
  assert.equal(run('calls.join()'), 'crabbing,spearfishing');
  run("pending.shift().resolve({tag:'spear'})");
  await Promise.resolve();
  assert.equal(run('calls.join()'), 'crabbing,spearfishing,clamming');
  run("pending.shift().resolve({tag:'clam'})");
  await work;
  assert.equal(run('appState.status'), 'ready');
  assert.equal(run('saved.length'), 1);
});

test('a failed activity does not strand later activities or cache a partial result', async () => {
  const run = harness();
  const work = run('loadWeekendProgressively(1)');
  run("pending.shift().reject(new Error('Network unavailable'))");
  await Promise.resolve();
  assert.equal(run('appState.modeStatus.crabbing'), 'error');
  assert.equal(run('calls.join()'), 'crabbing,spearfishing');
  run("pending.shift().resolve({tag:'spear'})");
  await Promise.resolve();
  run("pending.shift().resolve({tag:'clam'})");
  await work;
  assert.equal(run('appState.status'), 'partial');
  assert.equal(run('saved.length'), 0);
});

test('superseded success and error cannot overwrite the new weekend or start more loads', async () => {
  for (const result of ["resolve({tag:'old'})", "reject(new Error('old error'))"]) {
    const run = harness();
    const oldWork = run('loadWeekendProgressively(1)');
    run("appState.loadGeneration = 2; appState.data = {crabbing:{tag:'new'}}; appState.modeStatus.crabbing = 'ready'");
    run(`pending.shift().${result}`);
    await oldWork;
    assert.equal(run('appState.data.crabbing.tag'), 'new');
    assert.equal(run('appState.modeStatus.crabbing'), 'ready');
    assert.equal(run('calls.join()'), 'crabbing');
    assert.equal(run('saved.length'), 0);
  }
});

test('returning to a cached weekend invalidates outstanding live work', async () => {
  const run = harness();
  const oldWork = run('loadWeekendProgressively(1)');
  run("getCachedWeekendData = () => ({data:{crabbing:{tag:'cached'}},cache:{status:'browser-cached'}}); reloadSelectedWeekend()");
  assert.equal(run('appState.loadGeneration'), 2);
  assert.equal(run('appState.data.crabbing.tag'), 'cached');
  run("pending.shift().resolve({tag:'old'})");
  await oldWork;
  assert.equal(run('appState.data.crabbing.tag'), 'cached');
  assert.equal(run('calls.join()'), 'crabbing');
});

test('visible stale assessments refresh, hidden or recently loaded pages do not', () => {
  const run = harness();
  run("var refreshes=[]; reloadSelectedWeekend = options => refreshes.push(options); appState.lastLoadAt=Date.now()-6*60000");
  run('refreshAgedAssessment(false)');
  assert.equal(run('refreshes.length'),0);
  run('refreshAgedAssessment(true)');
  assert.equal(run('refreshes.length'),1);
  assert.equal(run('refreshes[0].forceRefresh'),true);
  run('appState.lastLoadAt=Date.now(); refreshAgedAssessment(true)');
  assert.equal(run('refreshes.length'),1);
});
